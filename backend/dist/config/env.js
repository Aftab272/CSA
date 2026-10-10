import dotenv from 'dotenv';
dotenv.config();
export const ENV = {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
    NODE_ENV: process.env.NODE_ENV || 'development',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
        : ['http://localhost:5173', 'https://creativestackagency.dev'],
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX, 10) : 100,
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) : 15 * 60 * 1000,
    MAX_FILE_SIZE_MB: process.env.MAX_FILE_SIZE_MB ? parseInt(process.env.MAX_FILE_SIZE_MB, 10) : 15,
    SUPABASE_URL: process.env.SUPABASE_URL || 'https://gfjyvagcwwyqgfhnckdb.supabase.co',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdmanl2YWdjd3d5cWdmaG5ja2RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NTYxODQsImV4cCI6MjEwMzEzMjE4NH0.Qlth_UCidwRTruTpjDr_PD4NsRTk5c3tRQp8lcgC3SI',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
};
