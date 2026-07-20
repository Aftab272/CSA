import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { connectDB } from './config/database';
import { securityHeaders, rateLimiter, authRateLimiter, inquiryRateLimiter, corsConfig, sanitizeInput } from './middleware/security';
import { errorHandler, notFound } from './middleware/errorHandler';
import { requestLogger, errorLogger } from './middleware/logger';
import authRoutes from './routes/auth';
import projectsRoutes from './routes/projects';
import servicesRoutes from './routes/services';
import inquiriesRoutes from './routes/inquiries';
import { authenticate, authorize } from './middleware/auth';

const app = express();

connectDB();

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

app.use(notFound);
app.use(errorLogger);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
