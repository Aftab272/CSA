import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Author, 
  Category, 
  Tag, 
  BlogPost, 
  defaultAuthors, 
  defaultCategories, 
  defaultTags, 
  defaultPosts 
} from '../data/blogArticles';

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
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error('useBlog must be used within BlogProvider');
  return context;
};

const CACHE_VERSION = 'csa_blog_v4_real_authors';

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check version and clear old placeholder cache if needed
  const isUpToDate = (() => {
    try {
      return localStorage.getItem('csa_blog_cache_version') === CACHE_VERSION;
    } catch {
      return false;
    }
  })();

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    if (!isUpToDate) return defaultPosts;
    const saved = localStorage.getItem('csa_blog_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return defaultPosts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    if (!isUpToDate) return defaultCategories;
    const saved = localStorage.getItem('csa_blog_categories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    return defaultCategories;
  });

  const [tags, setTags] = useState<Tag[]>(() => {
    if (!isUpToDate) return defaultTags;
    const saved = localStorage.getItem('csa_blog_tags');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return defaultTags;
  });

  const [authors, setAuthors] = useState<Author[]>(() => {
    if (!isUpToDate) return defaultAuthors;
    const saved = localStorage.getItem('csa_blog_authors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some(a => a.name !== 'Admin')) return parsed;
      } catch {}
    }
    return defaultAuthors;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('csa_blog_comments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('csa_blog_cache_version', CACHE_VERSION);
      localStorage.setItem('csa_blog_posts', JSON.stringify(posts));
      localStorage.setItem('csa_blog_categories', JSON.stringify(categories));
      localStorage.setItem('csa_blog_tags', JSON.stringify(tags));
      localStorage.setItem('csa_blog_authors', JSON.stringify(authors));
      localStorage.setItem('csa_blog_comments', JSON.stringify(comments));
    } catch {}
  }, [posts, categories, tags, authors, comments]);

  return (
    <BlogContext.Provider value={{ posts, categories, tags, authors, comments, setPosts, setCategories, setTags, setAuthors, setComments }}>
      {children}
    </BlogContext.Provider>
  );
};
