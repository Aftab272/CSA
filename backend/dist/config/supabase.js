import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import { ENV } from './env.js';
if (typeof globalThis.WebSocket === 'undefined') {
    globalThis.WebSocket = WebSocket;
}
const key = ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY;
export const supabase = createClient(ENV.SUPABASE_URL, key, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
    realtime: {
        transport: WebSocket,
    },
});
export const getAuthSupabase = (token) => {
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
