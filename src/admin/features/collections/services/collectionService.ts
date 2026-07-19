import { supabase } from '../../../../lib/supabase';
import type { Collection, CollectionStats, CollectionStatus } from '../types/collection';

export const getCollections = async (
  page = 1,
  limit = 10,
  search = '',
  status?: CollectionStatus | 'all',
  sortBy = 'sort_order',
  sortOrder: 'asc' | 'desc' = 'asc'
) => {
  let query = supabase
    .from('collections')
    .select('*, products(count)', { count: 'exact' });

  // Filters
  if (search) {
    query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);
  }
  
  if (status && status !== 'all') {
    query = query.eq('status', status);
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
    collections: data.map(col => ({
      ...col,
      products_count: col.products[0]?.count || 0,
    })) as Collection[],
    count: count || 0,
  };
};

export const getCollectionStats = async (): Promise<CollectionStats> => {
  const [
    { count: totalCount },
    { count: publishedCount },
    { count: draftCount },
    { count: featuredCount }
  ] = await Promise.all([
    supabase.from('collections').select('*', { count: 'exact', head: true }).neq('status', 'archived'),
    supabase.from('collections').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('collections').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('collections').select('*', { count: 'exact', head: true }).eq('featured', true).neq('status', 'archived'),
  ]);

  return {
    total: totalCount || 0,
    published: publishedCount || 0,
    draft: draftCount || 0,
    featured: featuredCount || 0,
  };
};

export const getCollectionById = async (id: string) => {
  const { data, error } = await supabase
    .from('collections')
    .select(`*`)
    .eq('id', id)
    .single();

  if (error) throw error;
  
  return data;
};

export const checkSlugExists = async (slug: string, excludeId?: string): Promise<boolean> => {
  let query = supabase
    .from('collections')
    .select('id')
    .eq('slug', slug);
    
  if (excludeId) {
    query = query.neq('id', excludeId);
  }
    
  const { data, error } = await query.maybeSingle();
    
  if (error) throw error;
  
  return !!data;
};

export const createCollection = async (collectionData: Partial<Collection>) => {
  const { data, error } = await supabase
    .from('collections')
    .insert([collectionData])
    .select()
    .single();

  if (error) throw error;
  return data as Collection;
};

export const updateCollection = async (id: string, collectionData: Partial<Collection>) => {
  const { data, error } = await supabase
    .from('collections')
    .update(collectionData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Collection;
};

export const deleteCollection = async (id: string) => {
  // Soft delete by archiving
  const { error } = await supabase.from('collections').update({ status: 'archived' }).eq('id', id);
  if (error) throw error;
};

// Returns paginated products in the collection ordered by `collection_sort_order`
export const getCollectionProducts = async (collectionId: string, page = 1, limit = 10, search = '') => {
  let query = supabase
    .from('products')
    .select('id, name, sku, stock, status, thumbnail, collection_sort_order', { count: 'exact' })
    .eq('collection_id', collectionId);

  if (search) {
    query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
  }

  // Use the specific collection sort order
  query = query.order('collection_sort_order', { ascending: true });

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) throw error;

  return {
    products: data,
    count: count || 0,
  };
};

export const assignProductsToCollection = async (collectionId: string, productIds: string[]) => {
  if (productIds.length === 0) return;

  // Find max sort order currently in the collection
  const { data: maxOrderData, error: maxError } = await supabase
    .from('products')
    .select('collection_sort_order')
    .eq('collection_id', collectionId)
    .order('collection_sort_order', { ascending: false })
    .limit(1);

  if (maxError) throw maxError;

  let startOrder = (maxOrderData && maxOrderData.length > 0) ? (maxOrderData[0].collection_sort_order || 0) + 1 : 0;

  // We have to update each product one by one or via a stored proc if we want to increment sequentially.
  // For simplicity via supabase-js, we can do parallel updates.
  const promises = productIds.map((pid, idx) => 
    supabase.from('products').update({ 
      collection_id: collectionId, 
      collection_sort_order: startOrder + idx 
    }).eq('id', pid)
  );

  await Promise.all(promises);
};

export const unassignProductFromCollection = async (productId: string) => {
  const { error } = await supabase
    .from('products')
    .update({ collection_id: null, collection_sort_order: 0 })
    .eq('id', productId);

  if (error) throw error;
};

export const updateCollectionProductOrder = async (updates: { id: string, collection_sort_order: number }[]) => {
  if (updates.length === 0) return;
  
  const promises = updates.map(update => 
    supabase.from('products').update({ collection_sort_order: update.collection_sort_order }).eq('id', update.id)
  );

  await Promise.all(promises);
};

export const searchUnassignedProducts = async (collectionId: string, search: string) => {
  let query = supabase
    .from('products')
    .select('id, name, sku, stock, thumbnail')
    .or(`collection_id.is.null,collection_id.neq.${collectionId}`)
    .order('name');
    
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  
  const { data, error } = await query.limit(20);
  if (error) throw error;
  
  return data;
};
