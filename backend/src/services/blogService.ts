import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase } from '../config/supabase.js';
import { 
  BlogPost, 
  Category, 
  Author, 
  Tag, 
  initialPosts, 
  initialCategories, 
  initialAuthors, 
  initialTags 
} from '../data/initialBlogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const AUTHORS_FILE = path.join(DATA_DIR, 'authors.json');
const TAGS_FILE = path.join(DATA_DIR, 'tags.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create data directory:', err);
  }
}

class BlogService {
  private posts: BlogPost[] = [];
  private categories: Category[] = [];
  private authors: Author[] = [];
  private tags: Tag[] = [];

  constructor() {
    this.init();
  }

  private init() {
    // Load posts
    if (fs.existsSync(BLOGS_FILE)) {
      try {
        const raw = fs.readFileSync(BLOGS_FILE, 'utf-8');
        this.posts = JSON.parse(raw);
      } catch {
        this.posts = [...initialPosts];
        this.persistPosts();
      }
    } else {
      this.posts = [...initialPosts];
      this.persistPosts();
    }

    // Load categories
    if (fs.existsSync(CATEGORIES_FILE)) {
      try {
        const raw = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
        this.categories = JSON.parse(raw);
      } catch {
        this.categories = [...initialCategories];
        this.persistCategories();
      }
    } else {
      this.categories = [...initialCategories];
      this.persistCategories();
    }

    // Load authors
    if (fs.existsSync(AUTHORS_FILE)) {
      try {
        const raw = fs.readFileSync(AUTHORS_FILE, 'utf-8');
        this.authors = JSON.parse(raw);
      } catch {
        this.authors = [...initialAuthors];
        this.persistAuthors();
      }
    } else {
      this.authors = [...initialAuthors];
      this.persistAuthors();
    }

    // Load tags
    if (fs.existsSync(TAGS_FILE)) {
      try {
        const raw = fs.readFileSync(TAGS_FILE, 'utf-8');
        this.tags = JSON.parse(raw);
      } catch {
        this.tags = [...initialTags];
        this.persistTags();
      }
    } else {
      this.tags = [...initialTags];
      this.persistTags();
    }

    // Attempt to sync to Supabase table if blogs table exists
    this.syncWithSupabaseAsync();
  }

  private persistPosts() {
    try {
      fs.writeFileSync(BLOGS_FILE, JSON.stringify(this.posts, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist blogs file:', err);
    }
  }

  private persistCategories() {
    try {
      fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(this.categories, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist categories file:', err);
    }
  }

  private persistAuthors() {
    try {
      fs.writeFileSync(AUTHORS_FILE, JSON.stringify(this.authors, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist authors file:', err);
    }
  }

  private persistTags() {
    try {
      fs.writeFileSync(TAGS_FILE, JSON.stringify(this.tags, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist tags file:', err);
    }
  }

  private async syncWithSupabaseAsync() {
    try {
      const { data, error } = await supabase.from('blogs').select('id').limit(1);
      if (!error && data && data.length > 0) {
        // If Supabase table exists and has rows, load from it
        const { data: allBlogs } = await supabase.from('blogs').select('*');
        if (allBlogs && allBlogs.length > 0) {
          this.posts = allBlogs;
          this.persistPosts();
        }
      }
    } catch {
      // Supabase table does not exist or network unavailable; backend JSON file operates reliably
    }
  }

  public getPublicBlogs() {
    const published = this.posts.filter((p) => p.status === 'published');
    return {
      posts: published,
      categories: this.categories.filter((c) => !c.isHidden),
      authors: this.authors,
      tags: this.tags,
    };
  }

  public getPostBySlug(slug: string) {
    const post = this.posts.find((p) => p.slug === slug);
    if (!post) return null;

    const author = this.authors.find((a) => a.id === post.authorId);
    const category = this.categories.find((c) => c.id === post.categoryId);
    const relatedPosts = this.posts
      .filter((p) => p.id !== post.id && p.categoryId === post.categoryId && p.status === 'published')
      .slice(0, 3);

    // Increment view count
    post.views = (post.views || 0) + 1;
    this.persistPosts();

    return {
      post,
      author,
      category,
      relatedPosts,
    };
  }

  public getAllAdminBlogs() {
    return {
      posts: this.posts,
      categories: this.categories,
      authors: this.authors,
      tags: this.tags,
    };
  }

  public createPost(data: Partial<BlogPost>): BlogPost {
    const newPost: BlogPost = {
      id: `p-${Date.now()}`,
      title: data.title || 'Untitled Article',
      slug: data.slug || (data.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      content: data.content || '',
      excerpt: data.excerpt || '',
      featuredImage: data.featuredImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      authorId: data.authorId || this.authors[0]?.id || 'auth-sami',
      categoryId: data.categoryId || this.categories[0]?.id || 'c1',
      tags: data.tags || [],
      status: data.status || 'published',
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: data.readTime || 5,
      isFeatured: Boolean(data.isFeatured),
      views: 0,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      focusKeyword: data.focusKeyword,
    };

    this.posts.unshift(newPost);
    this.persistPosts();

    // Async sync to Supabase if available
    void Promise.resolve(supabase.from('blogs').insert([newPost])).catch(() => {});

    return newPost;
  }

  public updatePost(id: string, data: Partial<BlogPost>): BlogPost | null {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    this.posts[idx] = {
      ...this.posts[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.persistPosts();

    // Async sync to Supabase if available
    void Promise.resolve(supabase.from('blogs').update(this.posts[idx]).eq('id', id)).catch(() => {});

    return this.posts[idx];
  }

  public deletePost(id: string): boolean {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx === -1) return false;

    this.posts.splice(idx, 1);
    this.persistPosts();

    // Async sync to Supabase if available
    void Promise.resolve(supabase.from('blogs').delete().eq('id', id)).catch(() => {});

    return true;
  }

  public createCategory(data: Partial<Category>): Category {
    const newCategory: Category = {
      id: `c-${Date.now()}`,
      name: data.name || 'New Category',
      slug: data.slug || (data.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      order: data.order || this.categories.length + 1,
      isHidden: Boolean(data.isHidden),
    };

    this.categories.push(newCategory);
    this.persistCategories();
    return newCategory;
  }

  public deleteCategory(id: string): boolean {
    const idx = this.categories.findIndex((c) => c.id === id);
    if (idx === -1) return false;

    this.categories.splice(idx, 1);
    this.persistCategories();
    return true;
  }

  public seedInitialData() {
    this.posts = [...initialPosts];
    this.categories = [...initialCategories];
    this.authors = [...initialAuthors];
    this.tags = [...initialTags];

    this.persistPosts();
    this.persistCategories();
    this.persistAuthors();
    this.persistTags();

    return {
      postsCount: this.posts.length,
      categoriesCount: this.categories.length,
      authorsCount: this.authors.length,
    };
  }
}

export const blogService = new BlogService();
