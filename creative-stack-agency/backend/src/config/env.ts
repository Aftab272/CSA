type RequiredEnvKey = 'JWT_SECRET' | 'JWT_REFRESH_SECRET';

const requiredKeys: RequiredEnvKey[] = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
];

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

for (const key of requiredKeys) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const resolveMongoUri = (): string => {
  if (process.env.MONGODB_URI && process.env.MONGODB_URI.trim() !== '') {
    return process.env.MONGODB_URI.trim();
  }

  const user = process.env.MONGODB_USER?.trim();
  const password = process.env.MONGODB_PASSWORD?.trim();
  const cluster = process.env.MONGODB_CLUSTER?.trim();
  const dbName = process.env.MONGODB_DB_NAME?.trim() || 'creative_stack_agency';

  if (!user || !password || !cluster) {
    throw new Error(
      'Provide MONGODB_URI or set MONGODB_USER, MONGODB_PASSWORD, and MONGODB_CLUSTER'
    );
  }

  return `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${cluster}/${dbName}?retryWrites=true&w=majority`;
};

const allowedOriginsValue = getEnv('ALLOWED_ORIGINS', 'http://localhost:5173');
const allowedOrigins = allowedOriginsValue
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const env = {
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  PORT: Number(getEnv('PORT', '3001')),
  MONGODB_URI: resolveMongoUri(),
  JWT_SECRET: getEnv('JWT_SECRET'),
  JWT_EXPIRE: getEnv('JWT_EXPIRE', '1h'),
  JWT_REFRESH_SECRET: getEnv('JWT_REFRESH_SECRET'),
  JWT_REFRESH_EXPIRE: getEnv('JWT_REFRESH_EXPIRE', '7d'),
  ALLOWED_ORIGINS: allowedOrigins.length > 0 ? allowedOrigins : ['http://localhost:5173'],
};

if (Number.isNaN(env.PORT) || env.PORT < 1 || env.PORT > 65535) {
  throw new Error('PORT must be a valid number between 1 and 65535');
}
