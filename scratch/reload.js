const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function reload() {
  const { data, error } = await supabase.rpc('reload_schema');
  console.log(error || 'Schema reloaded!');
}
reload();
