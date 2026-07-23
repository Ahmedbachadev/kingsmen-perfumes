import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pinhalsztfhxnihnvhfx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbmhhbHN6dGZoeG5paG52aGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NjU2MzAsImV4cCI6MjA5NzM0MTYzMH0.7HkQ4j3WxCQseWku0CjGVXpSC9U-d9tWbf-ewb3VIbI';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  try {
    const { data, error } = await supabase.from('product_images').select('*');
    if (error) throw error;
    console.log('Images:', JSON.stringify(data, null, 2));

    const { data: pData } = await supabase.from('products').select('*, images:product_images(*)').limit(1);
    console.log('Products:', JSON.stringify(pData, null, 2));
  } catch (e) {
    console.error(e);
  }
}

test();
