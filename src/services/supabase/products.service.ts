import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/database.types';

type ProductRow = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

type VariantRow = Database['public']['Tables']['product_variants']['Row'];
type VariantInsert = Database['public']['Tables']['product_variants']['Insert'];

type ImageRow = Database['public']['Tables']['product_images']['Row'];
type ImageInsert = Database['public']['Tables']['product_images']['Insert'];

export interface ProductWithRelations extends ProductRow {
  variants: VariantRow[];
  images: ImageRow[];
  category?: { name: string } | null;
  collection?: { name: string } | null;
}

export const ProductsService = {
  /**
   * Fetch a paginated list of products with optional filtering
   */
  async getProducts(options?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: ProductRow['status'];
    categoryId?: string;
  }) {
    let query = supabase
      .from('products')
      .select('*, variants:product_variants(*), images:product_images(*), category:categories(name)', { count: 'exact' });

    if (options?.search) {
      query = query.ilike('name', `%${options.search}%`);
    }

    if (options?.status) {
      query = query.eq('status', options.status);
    }

    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }

    // Pagination
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;
    
    return {
      products: data as ProductWithRelations[],
      count: count || 0,
      page,
      limit
    };
  },

  /**
   * Get a single product by ID or Slug
   */
  async getProduct(identifier: string, by: 'id' | 'slug' = 'id') {
    const { data, error } = await supabase
      .from('products')
      .select('*, variants:product_variants(*), images:product_images(*), category:categories(name), collection:collections(name)')
      .eq(by, identifier)
      .single();

    if (error) throw error;
    return data as ProductWithRelations;
  },

  /**
   * Create a new product with variants and images
   */
  async createProduct(
    product: ProductInsert,
    variants: Omit<VariantInsert, 'product_id'>[],
    images: Omit<ImageInsert, 'product_id'>[]
  ) {
    // 1. Create Product
    const { data: newProduct, error: productError } = await supabase
      .from('products')
      .insert(product as any)
      .select('id')
      .single();

    if (productError) throw productError;

    // 2. Create Variants
    if (variants.length > 0) {
      const variantsToInsert = variants.map(v => ({ ...v, product_id: newProduct.id }));
      const { error: variantError } = await supabase
        .from('product_variants')
        .insert(variantsToInsert as any);
      
      if (variantError) throw variantError;
    }

    // 3. Create Images
    if (images.length > 0) {
      const imagesToInsert = images.map(i => ({ ...i, product_id: newProduct.id }));
      const { error: imageError } = await supabase
        .from('product_images')
        .insert(imagesToInsert as any);
      
      if (imageError) throw imageError;
    }

    return newProduct;
  },

  /**
   * Update an existing product
   */
  async updateProduct(
    id: string,
    updates: ProductUpdate,
    variants?: VariantInsert[],
    images?: ImageInsert[]
  ) {
    const { data, error } = await supabase
      .from('products')
      .update(updates as any)
      .eq('id', id)
      .select('id')
      .single();

    if (error) throw error;

    // Sync variants (Assuming one default variant for now)
    if (variants && variants.length > 0) {
      const variant = variants[0];
      const { data: existingVariant } = await supabase
        .from('product_variants')
        .select('id')
        .eq('product_id', id)
        .single();
        
      if (existingVariant) {
        await supabase
          .from('product_variants')
          .update(variant as any)
          .eq('id', existingVariant.id);
      } else {
        await supabase
          .from('product_variants')
          .insert(variant as any);
      }
    }

    // Sync images
    if (images) {
      // 1. Get current images
      const { data: existingImages } = await supabase
        .from('product_images')
        .select('id, url')
        .eq('product_id', id);

      const existingIds = existingImages?.map(i => i.id) || [];
      const newImages = images.filter(i => !i.id || !existingIds.includes(i.id));
      const imagesToUpdate = images.filter(i => i.id && existingIds.includes(i.id));
      const imagesToDelete = existingIds.filter(id => !images.find(i => i.id === id));

      // 2. Delete removed images
      if (imagesToDelete.length > 0) {
        await supabase
          .from('product_images')
          .delete()
          .in('id', imagesToDelete);
      }

      // 3. Update existing images (display_order, is_thumbnail)
      if (imagesToUpdate.length > 0) {
        for (const img of imagesToUpdate) {
          await supabase
            .from('product_images')
            .update(img as any)
            .eq('id', img.id);
        }
      }

      // 4. Insert new images
      if (newImages.length > 0) {
        const imagesToInsert = newImages.map(i => {
          const { id: _id, ...rest } = i as any;
          return { ...rest, product_id: id };
        });
        await supabase
          .from('product_images')
          .insert(imagesToInsert as any);
      }
    }

    return data;
  },

  /**
   * Delete a product
   */
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  /**
   * Upload Image to Supabase Storage
   */
  async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  /**
   * Fetch aggregate KPI stats for the Products Dashboard
   */
  async getProductStats() {
    // We use head: true to avoid fetching the actual rows, only the count
    const [
      { count: totalCount, error: totalErr },
      { count: activeCount, error: activeErr },
      { count: outOfStockCount, error: oosErr },
      { count: featuredCount, error: featuredErr }
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('products').select('*', { count: 'exact', head: true }).lte('inventory', 0),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_featured', true)
    ]);

    if (totalErr) throw totalErr;
    if (activeErr) throw activeErr;
    if (oosErr) throw oosErr;
    if (featuredErr) throw featuredErr;

    return {
      total: totalCount || 0,
      active: activeCount || 0,
      outOfStock: outOfStockCount || 0,
      featured: featuredCount || 0
    };
  }
};
