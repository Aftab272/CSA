import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { aiRouter } from './routes/aiRoutes.js';
import { pdfToolsRouter } from './routes/pdfToolsRoutes.js';
import { healthRouter } from './routes/healthRoutes.js';
import { inquiryRouter } from './routes/inquiryRoutes.js';
import { reviewRouter } from './routes/reviewRoutes.js';
import { newsletterRouter } from './routes/newsletterRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { publicDataRouter } from './routes/publicDataRoutes.js';
const app = express();
// Security Headers
app.use(helmet());
// CORS configuration (Allows frontend from localhost and production domains)
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin)
            return callback(null, true);
        if (ENV.ALLOWED_ORIGINS.includes('*') ||
            ENV.ALLOWED_ORIGINS.includes(origin) ||
            origin.endsWith('.creativestackagency.dev') ||
            origin.endsWith('.vercel.app') ||
            origin.includes('localhost')) {
            return callback(null, true);
        }
        return callback(null, true); // Permissive in development
    },
    credentials: true,
}));
// Body parsers
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
// Apply rate limiter to all /api routes
app.use('/api', apiRateLimiter);
// API Routes
app.use('/api', healthRouter);
app.use('/api/ai', aiRouter);
app.use('/api/pdf-tools', pdfToolsRouter);
app.use('/api/inquiries', inquiryRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);
app.use('/api/public', publicDataRouter);
// Global Error Handler
app.use(errorHandler);
// Start server (only in standalone Node environment, not in Vercel serverless)
if (!process.env.VERCEL) {
    app.listen(ENV.PORT, () => {
        console.log(`=========================================`);
        console.log(`🚀 Beemim AI Backend is running!`);
        console.log(`📍 Port: http://localhost:${ENV.PORT}`);
        console.log(`🛡️  Service: Creative Stack Agency`);
        console.log(`🤖 AI Engine: Google Gemini & Free Image Gen`);
        console.log(`=========================================`);
    });
}
export default app;
