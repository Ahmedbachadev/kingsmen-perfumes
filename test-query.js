import { supabase } from './src/lib/supabase.js';

async function testQuery() {
  const { data, error } = await supabase
      .from('products')
      .select('*, product_variants(*), product_images(*), categories(name)')
      .limit(5);
  
  if (error) {
    console.error('Test 1 error:', error);
  } else {
    console.log('Test 1 Success:', data.length);
  }

  const { data: data2, error: error2 } = await supabase
      .from('products')
      .select('*, variants:product_variants(*), images:product_images(*), category:categories(name)')
      .limit(5);

  if (error2) {
    console.error('Test 2 error:', error2);
  } else {
    console.log('Test 2 Success:', data2.length);
  }

  const { data: data3, error: error3 } = await supabase
      .from('products')
      .select('*, variants(*), images(*), category:categories(name)')
      .limit(5);

  if (error3) {
    console.error('Test 3 error:', error3);
  } else {
    console.log('Test 3 Success:', data3.length);
  }
}

testQuery();
