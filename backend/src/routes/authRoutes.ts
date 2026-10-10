import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/authMiddleware.js';

export const authRouter = Router();

// POST /api/auth/login: Authenticate admin via backend
authRouter.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password are required' });
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error || !data.session) {
      res.status(401).json({
        success: false,
        error: error?.message || 'Invalid login credentials',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Login successful',
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Login failed' });
  }
});

// GET /api/auth/session: Check current user session using token
authRouter.get('/session', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

// POST /api/auth/logout: Logout user
authRouter.post('/logout', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully' });
});
