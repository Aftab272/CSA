import { createClient } from '@supabase/supabase-js';
import { ENV } from './env.js';
const key = ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY;
export const supabase = createClient(ENV.SUPABASE_URL, key, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
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
