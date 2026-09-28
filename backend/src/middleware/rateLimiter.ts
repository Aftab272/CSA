import rateLimit from 'express-rate-limit';
import { ENV } from '../config/env.js';

export const apiRateLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT_WINDOW_MS,
  max: ENV.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Rate limit exceeded. Please try again in a few minutes or contact Creative Stack Agency support.',
  },
});
