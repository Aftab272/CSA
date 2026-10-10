import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error('API Error:', err.message || err);

  // Friendly user-facing messages
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      error: 'File size exceeds maximum allowed limit (15MB). Please upload a smaller file.',
    });
  }

  if (err.message && err.message.includes('Unsupported file type')) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    error: 'Beemim AI encountered an unexpected issue. Please try again in a moment.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
}
