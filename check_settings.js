const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './frontend/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://gfjyvagcwwyqgfhnckdb.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_8hErrYdk3LA2p8eU47U0hQ_BmFYMXzv';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  const { data, error } = await supabase.from('site_settings').select('*').limit(1);
  console.log('site_settings:', { data, error });
  
  const { data: d2, error: e2 } = await supabase.from('settings').select('*').limit(1);
  console.log('settings:', { data: d2, error: e2 });
}

checkTables();
