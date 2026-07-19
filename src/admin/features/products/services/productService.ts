import { supabase } from '../../../../lib/supabase';
import type { Product, ProductStats, ProductStatus } from '../types/product';

export const getProducts = async (
  page = 1,
  limit = 10,
  search = '',
  status?: ProductStatus | 'all',
  collectionId?: string | 'all',
  sortBy = 'created_at',
  sortOrder: 'asc' | 'desc' = 'desc'
) => {
  let query = supabase
    .from('products')
    .select('*, collection:collections!products_collection_id_fkey(name)', { count: 'exact' });

  // Filters
  if (search) {
    query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
  }
  
  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (collectionId && collectionId !== 'all') {
    query = query.eq('collection_id', collectionId);
  }

  // Sorting
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });

  // Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    products: data as Product[],
    count: count || 0,
  };
};

export const getProductStats = async (): Promise<ProductStats> => {
  const [
    { count: totalCount },
    { count: activeCount },
    { count: outOfStockCount },
    { count: featuredCount }
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('products').select('*', { count: 'exact', head: true }).lte('stock', 0),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('featured', true),
  ]);

  return {
    total: totalCount || 0,
    active: activeCount || 0,
    outOfStock: outOfStockCount || 0,
    featured: featuredCount || 0,
  };
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
};

export const createProduct = async (productData: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) throw error;
  return data as Product;
};

export const checkSlugExists = async (slug: string, excludeId?: string): Promise<boolean> => {
  let query = supabase
    .from('products')
    .select('id')
    .eq('slug', slug);
    
  if (excludeId) {
    query = query.neq('id', excludeId);
  }
    
  const { data, error } = await query.maybeSingle();
    
  if (error) throw error;
  
  return !!data;
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  
  // Sort images by display_order
  if (data && data.images) {
    data.images.sort((a: any, b: any) => a.display_order - b.display_order);
  }
  
  return data;
};

export const updateProduct = async (id: string, productData: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
};

export const uploadProductImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('products')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('products').getPublicUrl(filePath);
  return data.publicUrl;
};
