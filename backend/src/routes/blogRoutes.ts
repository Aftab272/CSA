import { Router, Request, Response } from 'express';
import { blogService } from '../services/blogService.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const publicBlogRouter = Router();
export const adminBlogRouter = Router();

/* ==========================================================================
   PUBLIC BLOG ROUTES
   ========================================================================== */

// GET /api/public/blogs: List all published posts, categories, authors, tags
publicBlogRouter.get('/', (_req: Request, res: Response): void => {
  try {
    const data = blogService.getPublicBlogs();
    res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Cannot fetch blogs' });
  }
});

// GET /api/public/blogs/:slug: Single post detail with author and related posts
publicBlogRouter.get('/:slug', (req: Request, res: Response): void => {
  try {
    const slug = String(req.params.slug);
    const result = blogService.getPostBySlug(slug);
    if (!result) {
      res.status(404).json({ success: false, error: 'Article not found' });
      return;
    }
    res.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Cannot fetch article' });
  }
});

/* ==========================================================================
   ADMIN BLOG ROUTES (Protected)
   ========================================================================== */

adminBlogRouter.use(requireAuth);

// GET /api/admin/blogs: All posts including drafts
adminBlogRouter.get('/', (_req: Request, res: Response): void => {
  try {
    const data = blogService.getAllAdminBlogs();
    res.json({
      success: true,
      ...data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/blogs: Create a new blog post
adminBlogRouter.post('/', (req: Request, res: Response): void => {
  try {
    const newPost = blogService.createPost(req.body);
    res.status(201).json({
      success: true,
      message: 'Article published successfully',
      post: newPost,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/admin/blogs/:id: Update an existing blog post
adminBlogRouter.put('/:id', (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const updated = blogService.updatePost(id, req.body);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Article not found' });
      return;
    }
    res.json({
      success: true,
      message: 'Article updated successfully',
      post: updated,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/admin/blogs/:id: Delete an article
adminBlogRouter.delete('/:id', (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const deleted = blogService.deletePost(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Article not found' });
      return;
    }
    res.json({
      success: true,
      message: 'Article deleted successfully',
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/blogs/categories: Add category
adminBlogRouter.post('/categories', (req: Request, res: Response): void => {
  try {
    const category = blogService.createCategory(req.body);
    res.status(201).json({
      success: true,
      category,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/admin/blogs/categories/:id: Delete category
adminBlogRouter.delete('/categories/:id', (req: Request, res: Response): void => {
  try {
    const id = String(req.params.id);
    const deleted = blogService.deleteCategory(id);
    res.json({
      success: deleted,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/blogs/seed: Seed / reset initial articles
adminBlogRouter.post('/seed', (_req: Request, res: Response): void => {
  try {
    const result = blogService.seedInitialData();
    res.json({
      success: true,
      message: 'Blog system seeded with initial articles',
      ...result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
