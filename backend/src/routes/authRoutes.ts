import { Router, Request, Response } from 'express';
import { supabase, getAuthSupabase } from '../config/supabase.js';
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

// POST /api/auth/change-password: Change admin password
authRouter.post('/change-password', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { newPassword, currentPassword } = req.body;

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      res.status(400).json({ success: false, error: 'New password must be at least 6 characters long' });
      return;
    }

    const token = req.headers.authorization?.split(' ')[1];

    // Verify current password if provided
    if (currentPassword && req.user?.email) {
      const { error: verifyErr } = await supabase.auth.signInWithPassword({
        email: req.user.email,
        password: currentPassword,
      });
      if (verifyErr) {
        res.status(400).json({ success: false, error: 'Current password is incorrect' });
        return;
      }
    }

    // Attempt password update via authenticated user client
    const authClient = getAuthSupabase(token);
    const { error } = await authClient.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      // Fallback: try via admin API if service role key is present
      if (supabase.auth.admin && req.user?.id) {
        const { error: adminErr } = await supabase.auth.admin.updateUserById(req.user.id, {
          password: newPassword,
        });
        if (adminErr) {
          res.status(400).json({ success: false, error: adminErr.message || error.message });
          return;
        }
      } else {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
    }

    res.json({ success: true, message: 'Password updated successfully. Please keep your new credentials secure.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed to update password' });
  }
});

// POST /api/auth/logout: Logout user
authRouter.post('/logout', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

