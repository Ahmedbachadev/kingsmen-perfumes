import { supabase } from '../../../../../lib/supabase';
import type { ProductImage } from '../../types/product';

export const getProductImages = async (productId: string): Promise<ProductImage[]> => {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('display_order', { ascending: true });

  if (error) {
    if (error.code === '42P01') {
      // Table doesn't exist, ignore or mock during development
      return [];
    }
    throw error;
  }
  return data as ProductImage[];
};

export const uploadImageToStorage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `product_images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
  return data.publicUrl;
};

export const deleteImageFromStorage = async (url: string) => {
  // Extract path from public URL. This assumes the format .../storage/v1/object/public/products/<path>
  const pathParts = url.split('/public/product-images/');
  if (pathParts.length === 2) {
    const path = pathParts[1];
    const { error } = await supabase.storage.from('product-images').remove([path]);
    if (error) throw error;
  }
};

export const saveImageMetadata = async (metadata: Partial<ProductImage>): Promise<ProductImage> => {
  // For UI development/demo purposes where table might not exist
  // We'll wrap in a try-catch to allow graceful failure if needed
  try {
    const { data, error } = await supabase
      .from('product_images')
      .insert([metadata])
      .select()
      .single();

    if (error) throw error;
    return data as ProductImage;
  } catch (error: any) {
    if (error.code === '42P01') {
      // Return a fake object so UI still works without DB
      return {
        ...metadata,
        id: `temp-${Date.now()}`,
        created_at: new Date().toISOString(),
      } as ProductImage;
    }
    throw error;
  }
};

export const deleteImageMetadata = async (id: string) => {
  try {
    const { error } = await supabase.from('product_images').delete().eq('id', id);
    if (error) throw error;
  } catch (error: any) {
    if (error.code !== '42P01') throw error;
  }
};

export const updateImageMetadata = async (id: string, updates: Partial<ProductImage>) => {
  try {
    const { error } = await supabase.from('product_images').update(updates).eq('id', id);
    if (error) throw error;
  } catch (error: any) {
    if (error.code !== '42P01') throw error;
  }
};

export const updateImageOrder = async (updates: { id: string; display_order: number }[]) => {
  try {
    // Supabase JS doesn't have bulk update easily out of the box using .update() for different rows
    // We can do it sequentially or use an RPC. For simplicity and since we have a small array:
    await Promise.all(
      updates.map(update => 
        supabase.from('product_images').update({ display_order: update.display_order }).eq('id', update.id)
      )
    );
  } catch (error: any) {
    if (error.code !== '42P01') throw error;
  }
};
