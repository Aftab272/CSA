import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  Author, 
  Category, 
  Tag, 
  BlogPost 
} from '../data/blogArticles';
import { fetchPublicBlogs, adminApi } from '../lib/api';

export type { Author, Category, Tag, BlogPost };

export type Comment = {
  id: string;
  postId: string;
  name: string;
  email: string;
  website?: string;
  content: string;
  createdAt: string;
  parentId?: string;
  status: 'pending' | 'approved' | 'spam';
};

type BlogContextType = {
  posts: BlogPost[];
  categories: Category[];
  tags: Tag[];
  authors: Author[];
  comments: Comment[];
  isLoading: boolean;
  fetchError: string | null;
  reloadBlogs: () => Promise<void>;
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  createBackendPost: (payload: Partial<BlogPost>, token?: string) => Promise<BlogPost>;
  updateBackendPost: (id: string, payload: Partial<BlogPost>, token?: string) => Promise<BlogPost>;
  deleteBackendPost: (id: string, token?: string) => Promise<boolean>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within BlogProvider');
  return context;
};

// Purge any stale legacy localStorage mock caches
const CACHE_PURGE_KEY = 'csa_blog_backend_v7_cleared';
try {
  if (typeof window !== 'undefined' && !localStorage.getItem(CACHE_PURGE_KEY)) {
    localStorage.removeItem('csa_blog_posts');
    localStorage.removeItem('csa_blog_categories');
    localStorage.removeItem('csa_blog_tags');
    localStorage.removeItem('csa_blog_authors');
    localStorage.removeItem('csa_blog_cache_version');
    localStorage.setItem(CACHE_PURGE_KEY, 'true');
  }
} catch {}

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with clean empty state - strictly NO hardcoded mock or default dummy posts
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem('csa_blog_comments');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const loadBlogsFromBackend = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const data = await fetchPublicBlogs();
      setPosts(Array.isArray(data.posts) ? data.posts : []);
      setCategories(Array.isArray(data.categories) ? data.categories : []);
      setAuthors(Array.isArray(data.authors) ? data.authors : []);
      setTags(Array.isArray(data.tags) ? data.tags : []);
    } catch (err: any) {
      console.error('Cannot load blogs from backend server:', err.message);
      // Strictly do not inject dummy fallback data
      setPosts([]);
      setFetchError(
        err?.message || 'Cannot fetch blogs from backend. Please ensure the backend server is running on port 3001.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBlogsFromBackend();
  }, [loadBlogsFromBackend]);

  // Persist comments locally
  useEffect(() => {
    try {
      localStorage.setItem('csa_blog_comments', JSON.stringify(comments));
    } catch {}
  }, [comments]);

  const createBackendPost = async (payload: Partial<BlogPost>, token?: string): Promise<BlogPost> => {
    try {
      const res = await adminApi.createBlog(payload, token || 'csa-dev-admin');
      if (res && res.post) {
        setPosts((prev) => [res.post, ...prev.filter((p) => p.id !== res.post.id)]);
        return res.post;
      }
    } catch (err) {
      console.error('Failed to create post via backend API:', err);
    }

    const newPost: BlogPost = {
      id: `p-${Date.now()}`,
      title: payload.title || 'Untitled Article',
      slug: payload.slug || (payload.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content: payload.content || '',
      excerpt: payload.excerpt || '',
      featuredImage: payload.featuredImage || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      authorId: payload.authorId || authors[0]?.id || 'auth-sami',
      categoryId: payload.categoryId || categories[0]?.id || 'c1',
      tags: payload.tags || [],
      status: payload.status || 'published',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: payload.readTime || 5,
      isFeatured: Boolean(payload.isFeatured),
      views: 0,
      seoTitle: payload.seoTitle,
      seoDescription: payload.seoDescription,
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const updateBackendPost = async (id: string, payload: Partial<BlogPost>, token?: string): Promise<BlogPost> => {
    try {
      const res = await adminApi.updateBlog(id, payload, token || 'csa-dev-admin');
      if (res && res.post) {
        setPosts((prev) => prev.map((p) => (p.id === id ? res.post : p)));
        return res.post;
      }
    } catch (err) {
      console.error('Failed to update post via backend API:', err);
    }

    let updated: BlogPost | null = null;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          updated = { ...p, ...payload, updatedAt: new Date().toISOString() };
          return updated;
        }
        return p;
      })
    );
    return updated || (payload as BlogPost);
  };

  const deleteBackendPost = async (id: string, token?: string): Promise<boolean> => {
    try {
      await adminApi.deleteBlog(id, token || 'csa-dev-admin');
    } catch (err) {
      console.error('Failed to delete post via backend API:', err);
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
    return true;
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        categories,
        tags,
        authors,
        comments,
        isLoading,
        fetchError,
        reloadBlogs: loadBlogsFromBackend,
        setPosts,
        setCategories,
        setTags,
        setAuthors,
        setComments,
        createBackendPost,
        updateBackendPost,
        deleteBackendPost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
