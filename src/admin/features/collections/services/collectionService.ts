import { supabase } from '../../../../lib/supabase';
<<<<<<< HEAD
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
=======
import type { Database } from '../../../../types/database.types';

export type Collection = Database['public']['Tables']['collections']['Row'];
export type CollectionInsert = Database['public']['Tables']['collections']['Insert'];
export type CollectionUpdate = Database['public']['Tables']['collections']['Update'];

export interface CollectionFilters {
  search?: string;
  status?: 'active' | 'draft' | 'archived' | 'all';
  is_featured?: boolean | 'all';
}

export interface CollectionPagination {
  page: number;
  limit: number;
}

export interface CollectionWithCounts extends Collection {
  products_count: number;
}

export interface CollectionStats {
  total: number;
  published: number;
  draft: number;
  featured: number;
}

export class CollectionService {
  /**
   * Get all collections with filters and pagination
   */
  static async getCollections(
    filters: CollectionFilters = {},
    pagination: CollectionPagination = { page: 1, limit: 10 }
  ): Promise<{ data: CollectionWithCounts[]; count: number; stats: CollectionStats }> {
    // Start queries
    let query = supabase
      .from('collections')
      .select('*, products(count)', { count: 'exact' })
      .is('deleted_at', null)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,slug.ilike.%${filters.search}%`);
    }
    
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    
    if (filters.is_featured !== undefined && filters.is_featured !== 'all') {
      query = query.eq('is_featured', filters.is_featured);
    }

    // Apply pagination
    const from = (pagination.page - 1) * pagination.limit;
    const to = from + pagination.limit - 1;
    query = query.range(from, to);

    // Get stats in parallel
    const [result, statsResult] = await Promise.all([
      query,
      this.getCollectionStats()
    ]);

    if (result.error) throw result.error;

    // Map the count from the nested select
    const data = (result.data || []).map(collection => {
      const { products, ...rest } = collection;
      return {
        ...rest,
        products_count: Array.isArray(products) ? products[0]?.count || 0 : 0
      };
    });

    return {
      data: data as unknown as CollectionWithCounts[],
      count: result.count || 0,
      stats: statsResult
    };
  }

  /**
   * Get global collection statistics
   */
  static async getCollectionStats(): Promise<CollectionStats> {
    const { data, error } = await supabase
      .from('collections')
      .select('status, is_featured')
      .is('deleted_at', null);
      
    if (error) throw error;
    
    return data.reduce((acc, curr) => {
      acc.total += 1;
      if (curr.status === 'active') acc.published += 1;
      if (curr.status === 'draft') acc.draft += 1;
      if (curr.is_featured) acc.featured += 1;
      return acc;
    }, { total: 0, published: 0, draft: 0, featured: 0 });
  }

  /**
   * Get a single collection by ID
   */
  static async getCollection(id: string): Promise<Collection> {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single();
      
    if (error) throw error;
    return data;
  }

  /**
   * Create a new collection
   */
  static async createCollection(collection: CollectionInsert): Promise<Collection> {
    const { data, error } = await supabase
      .from('collections')
      .insert([collection])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }

  /**
   * Update a collection
   */
  static async updateCollection(id: string, updates: CollectionUpdate): Promise<Collection> {
    const { data, error } = await supabase
      .from('collections')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }

  /**
   * Soft delete a collection
   */
  static async deleteCollection(id: string): Promise<void> {
    const { error } = await supabase
      .from('collections')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
      
    if (error) throw error;
  }

  /**
   * Upload banner or thumbnail image
   */
  static async uploadImage(file: File, pathPrefix: string = 'collections'): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${pathPrefix}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images') // Reusing existing bucket or we can assume it's valid
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  /**
   * Get products assigned to a collection, ordered by collection_display_order
   */
  static async getCollectionProducts(collectionId: string) {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, slug, image_url, status, inventory, regular_price, collection_display_order')
      .eq('collection_id', collectionId)
      .order('collection_display_order', { ascending: true })
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  }

  /**
   * Update the order of products within a collection
   */
  static async updateCollectionProductsOrder(productIds: string[]) {
    // Supabase JS doesn't have a bulk update for multiple different values easily.
    // We can do it by mapping over them and firing promises.
    // Alternatively, an RPC would be best, but for now we'll do parallel promises for simplicity.
    const updates = productIds.map((id, index) => {
      return supabase
        .from('products')
        .update({ collection_display_order: index })
        .eq('id', id);
    });

    const results = await Promise.all(updates);
    
    // Check for errors
    const error = results.find(r => r.error)?.error;
    if (error) throw error;
  }

  /**
   * Assign products to a collection
   * Since this is a 1-to-many, assigning them here overrides any previous collection.
   */
  static async assignProductsToCollection(collectionId: string, productIds: string[]) {
    const { error } = await supabase
      .from('products')
      .update({ collection_id: collectionId })
      .in('id', productIds);
      
    if (error) throw error;
  }

  /**
   * Remove products from a collection
   */
  static async removeProductsFromCollection(productIds: string[]) {
    const { error } = await supabase
      .from('products')
      .update({ collection_id: null, collection_display_order: 0 })
      .in('id', productIds);
      
    if (error) throw error;
  }
}
>>>>>>> 3fef0dc (production ready version with admin panel)
