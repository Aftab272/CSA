import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback): void => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    callback(new Error('Invalid file type. Only JPG, PNG, WEBP, and PDF are allowed.'));
    return;
  }
  callback(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

export const sanitizeFileName = (req: Request, res: Response, next: NextFunction): void => {
  if (req.file) {
    const ext = path.extname(req.file.originalname);
    const randomName = crypto.randomBytes(16).toString('hex');
    req.file.filename = `${randomName}${ext}`;
  }
  next();
};

export const validateFileUpload = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }

  if (req.file.size > MAX_FILE_SIZE) {
    res.status(400).json({ 
      success: false, 
      message: `File size exceeds limit of ${MAX_FILE_SIZE / 1024 / 1024}MB` 
    });
    return;
  }

  next();
};
