import { Request, Response, NextFunction } from 'express';

export interface LogData {
  timestamp: Date;
  method: string;
  url: string;
  ip: string;
  userAgent: string;
  statusCode?: number;
  responseTime?: number;
  userId?: string;
  error?: string;
}

const logs: LogData[] = [];

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const logData: LogData = {
    timestamp: new Date(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress || 'unknown',
    userAgent: req.get('user-agent') || 'unknown',
  };

  if ((req as any).user) {
    logData.userId = (req as any).user._id.toString();
  }

  res.on('finish', () => {
    logData.statusCode = res.statusCode;
    logData.responseTime = Date.now() - startTime;
    
    if (res.statusCode >= 400) {
      console.error('Request Error:', logData);
    } else {
      console.log('Request:', logData);
    }

    logs.push(logData);

    if (logs.length > 1000) {
      logs.shift();
    }
  });

  next();
};

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const logData: LogData = {
    timestamp: new Date(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress || 'unknown',
    userAgent: req.get('user-agent') || 'unknown',
    statusCode: 500,
    error: err.message,
  };

  if ((req as any).user) {
    logData.userId = (req as any).user._id.toString();
  }

  console.error('Error:', logData);
  logs.push(logData);
  next(err);
};

export const getLogs = (): LogData[] => {
  return logs;
};

export const clearLogs = (): void => {
  logs.length = 0;
};
