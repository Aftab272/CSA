import express, { Request, Response } from 'express';
import crypto from 'crypto';
import User from '../models/User';
import { authenticate, validateRefreshToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'User already exists' });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
    });

    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to register user' });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    if (user.isLocked && user.lockUntil && user.lockUntil > new Date()) {
      res.status(403).json({ 
        success: false, 
        message: 'Account is locked. Try again later.' 
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      user.failedLoginAttempts += 1;
      
      if (user.failedLoginAttempts >= 5) {
        user.isLocked = true;
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }
      
      await user.save();
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    user.failedLoginAttempts = 0;
    user.isLocked = false;
    user.lockUntil = undefined;
    user.lastLogin = new Date();
    
    await user.save();

    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to login' });
  }
});

router.post('/refresh', validateRefreshToken, async (req: any, res: Response): Promise<void> => {
  try {
    const user = req.body.user;
    const token = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    res.json({
      success: true,
      token,
      refreshToken,
    });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to refresh token' });
  }
});

router.post('/forgot-password', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    res.json({
      success: true,
      message: 'Password reset token sent',
      resetToken,
    });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to process request' });
  }
});

router.post('/reset-password/:token', async (req: Request, res: Response): Promise<void> => {
  try {
    const { password } = req.body;
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ success: false, message: 'Invalid or expired token' });
      return;
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successful' });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to reset password' });
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: req.user.avatar,
        isVerified: req.user.isVerified,
      },
    });
  } catch {
    res.status(500).json({ success: false, message: 'Unable to fetch profile' });
  }
});

export default router;
