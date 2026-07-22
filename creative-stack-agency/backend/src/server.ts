import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { connectDB } from './config/database';
import { env } from './config/env';
import { securityHeaders, rateLimiter, authRateLimiter, inquiryRateLimiter, corsConfig, sanitizeInput } from './middleware/security';
import { errorHandler, notFound } from './middleware/errorHandler';
import { requestLogger, errorLogger } from './middleware/logger';
import authRoutes from './routes/auth';
import projectsRoutes from './routes/projects';
import servicesRoutes from './routes/services';
import inquiriesRoutes from './routes/inquiries';
import contentRoutes from './routes/content';
import teamRoutes from './routes/team';
import coursesRoutes from './routes/courses';
import { authenticate, authorize } from './middleware/auth';

const app = express();

app.use(cors(corsConfig));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(securityHeaders);
app.use(sanitizeInput);
app.use(requestLogger);
app.use('/api/', rateLimiter);
app.use('/api/auth/login', authRateLimiter);
app.use('/api/inquiries', inquiryRateLimiter);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

app.get('/api/logs', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  const { getLogs } = require('./middleware/logger');
  res.json({ success: true, logs: getLogs() });
});

app.delete('/api/logs', authenticate, authorize('admin', 'super_admin'), (req, res) => {
  const { clearLogs } = require('./middleware/logger');
  clearLogs();
  res.json({ success: true, message: 'Logs cleared' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/courses', coursesRoutes);

app.use(notFound);
app.use(errorLogger);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
    console.log(`Allowed origins: ${env.ALLOWED_ORIGINS.join(', ')}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
