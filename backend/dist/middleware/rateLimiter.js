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
// Stricter rate limiter for contact form inquiries (prevents bot spam & flooding)
export const inquiryLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // max 10 submissions per 15 mins per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too many inquiries submitted from this IP. Please wait 15 minutes before submitting again.',
    },
});
// Stricter rate limiter for review submissions
export const reviewLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too many reviews submitted. Please wait a few minutes.',
    },
});
// Stricter rate limiter for newsletter subscription
export const newsletterLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: 'Too many newsletter subscription attempts. Please try again later.',
    },
});
