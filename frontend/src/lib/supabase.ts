import { createClient } from '@supabase/supabase-js';

// Aapka Supabase URL
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gfjyvagcwwyqgfhnckdb.supabase.co';
// Aapki Public Key (sb_publishable...)
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_8hErrYdk3LA2p8eU47U0hQ_BmFYMXzv';

export const supabase = createClient(supabaseUrl, supabaseKey);
