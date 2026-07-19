# Creative Stack Agency Backend

Enterprise-grade backend API with security, performance, and high availability features.

## Features

### Security
- JWT Authentication with Refresh Tokens
- Role-Based Access Control (RBAC)
- Password Hashing with Bcrypt
- Rate Limiting
- Input Sanitization
- Security Headers (Helmet.js)
- CORS Configuration
- Account Lock After Failed Attempts
- Password Reset Functionality

### Performance
- Response Compression (Gzip)
- Database Connection Pooling
- Query Optimization
- Request Logging
- Error Handling

### High Availability
- PM2 Process Management
- Cluster Mode
- Automatic Restart
- Health Check Endpoint
- Graceful Shutdown

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env
```

## Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/creative_stack_agency
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=1h
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRE=7d
ALLOWED_ORIGINS=http://localhost:5173,https://creativestackagency.com
NODE_ENV=development
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Production Deployment

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js

# Monitor
pm2 monitor

# View logs
pm2 logs

# Restart
pm2 restart creative-stack-backend

# Stop
pm2 stop creative-stack-backend
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/refresh` - Refresh access token
- POST `/api/auth/forgot-password` - Request password reset
- POST `/api/auth/reset-password/:token` - Reset password
- GET `/api/auth/me` - Get current user

### Projects
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create project (Admin only)
- PUT `/api/projects/:id` - Update project (Admin only)
- DELETE `/api/projects/:id` - Delete project (Admin only)

### Services
- GET `/api/services` - Get all services
- POST `/api/services` - Create service (Admin only)

### Monitoring
- GET `/health` - Health check endpoint
- GET `/api/logs` - Get request logs
- DELETE `/api/logs` - Clear logs

## User Roles

- `super_admin` - Full access to all features
- `admin` - Manage projects, services, users
- `editor` - Content editing permissions
- `instructor` - Course management
- `student` - Course access
- `client` - Client portal access

## Security Features

### Password Requirements
- Minimum 8 characters
- Bcrypt hashing with 12 rounds
- Account lock after 5 failed attempts
- 15-minute lock duration

### Rate Limiting
- General API: 100 requests per 15 minutes
- Login endpoint: 5 attempts per 15 minutes

### File Upload Security
- Allowed types: JPG, PNG, WEBP, PDF
- Maximum size: 5MB
- Random filename generation
- MIME type validation

## Database

### MongoDB Configuration
- Connection pooling (max 10 connections)
- Automatic reconnection
- Graceful shutdown
- Index optimization

### Models
- User (with authentication fields)
- Project (for future implementation)
- Service (for future implementation)

## Logging

Request logging includes:
- Timestamp
- Method
- URL
- IP address
- User agent
- User ID (if authenticated)
- Status code
- Response time
- Error details

## Monitoring

### Health Check
```bash
curl http://localhost:3001/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "memory": {
    "rss": 12345678,
    "heapTotal": 12345678,
    "heapUsed": 12345678,
    "external": 12345678
  }
}
```

## Future Enhancements

- Redis caching
- Email notifications (SMTP)
- File upload to Cloudinary/S3
- Two-Factor Authentication (2FA)
- API versioning
- WebSocket support
- GraphQL API
- Microservices architecture

## License

MIT
