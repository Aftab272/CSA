import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import { ENV } from './env.js';

if (typeof (globalThis as any).WebSocket === 'undefined') {
  (globalThis as any).WebSocket = WebSocket;
}

const key = ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY;

export const supabase = createClient(ENV.SUPABASE_URL, key, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    transport: WebSocket as any,
  },
});

export const getAuthSupabase = (token?: string) => {
  if (token) {
    return createClient(ENV.SUPABASE_URL, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }
  return supabase;
};
