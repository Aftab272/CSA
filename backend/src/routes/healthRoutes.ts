import { Router, Request, Response } from 'express';
import { ENV } from '../config/env.js';

export const healthRouter = Router();

healthRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    name: 'Beemim AI Backend',
    service: 'Creative Stack Agency',
    timestamp: new Date().toISOString(),
    environment: ENV.NODE_ENV,
    geminiConfigured: Boolean(ENV.GEMINI_API_KEY && ENV.GEMINI_API_KEY.length > 5),
  });
});
