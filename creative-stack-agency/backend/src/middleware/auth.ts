import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { env } from '../config/env';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ success: false, message: 'No token, authorization denied' });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as any;
    
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }

    if (user.isLocked) {
      res.status(403).json({ success: false, message: 'Account is locked' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        success: false, 
        message: `User role ${req.user.role} is not authorized to access this route` 
      });
      return;
    }
    next();
  };
};

export const validateRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({ success: false, message: 'No refresh token provided' });
      return;
    }

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as any;
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }

    req.body.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
};
