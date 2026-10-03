import { Router, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware.js';

export const adminRouter = Router();

// Apply requireAuth to all admin routes
adminRouter.use(requireAuth);

// Verify admin session and return current user
adminRouter.get('/verify-session', (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

/* ==========================================================================
   SERVICES MANAGEMENT
   ========================================================================== */

adminRouter.post('/services', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const payload = req.body;
    const { data, error } = await supabase.from('services').insert([payload]).select();
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.status(201).json({ success: true, service: data?.[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

adminRouter.put('/services/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { data, error } = await supabase.from('services').update(payload).eq('id', id).select();
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.json({ success: true, service: data?.[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

adminRouter.delete('/services/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ==========================================================================
   PROJECTS MANAGEMENT
   ========================================================================== */

adminRouter.post('/projects', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const payload = req.body;
    const { data, error } = await supabase.from('projects').insert([payload]).select();
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.status(201).json({ success: true, project: data?.[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

adminRouter.put('/projects/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { data, error } = await supabase.from('projects').update(payload).eq('id', id).select();
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.json({ success: true, project: data?.[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

adminRouter.delete('/projects/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ==========================================================================
   TEAM MEMBERS MANAGEMENT
   ========================================================================== */

adminRouter.post('/team', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const payload = req.body;
    const { data, error } = await supabase.from('team_members').insert([payload]).select();
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.status(201).json({ success: true, member: data?.[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

adminRouter.put('/team/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { data, error } = await supabase.from('team_members').update(payload).eq('id', id).select();
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.json({ success: true, member: data?.[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

adminRouter.delete('/team/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ==========================================================================
   COURSES MANAGEMENT
   ========================================================================== */

adminRouter.post('/courses', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const payload = req.body;
    const { data, error } = await supabase.from('courses').insert([payload]).select();
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.status(201).json({ success: true, course: data?.[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

adminRouter.put('/courses/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { data, error } = await supabase.from('courses').update(payload).eq('id', id).select();
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.json({ success: true, course: data?.[0] });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

adminRouter.delete('/courses/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) {
      res.status(500).json({ success: false, error: error.message });
      return;
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
