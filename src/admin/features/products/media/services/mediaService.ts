import { supabase } from '../../../../../lib/supabase';
import imageCompression from 'browser-image-compression';
import type { ProductImage } from '../../types/product';

export const getProductImages = async (productId: string): Promise<ProductImage[]> => {
  const { data, error } = await supabase
    .from('product_images')
    .select('*')
    .eq('product_id', productId)
    .order('sort_order', { ascending: true });

  if (error) {
    if (error.code === '42P01') {
      // Table doesn't exist, ignore or mock during development
      return [];
    }
    throw error;
  }
  return data as ProductImage[];
};

export const uploadImageToStorage = async (
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> => {
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    onProgress: (p: number) => {
      // Compression counts as first 40% of perceived progress
      onProgress?.(Math.round(p * 0.4));
    },
  };

  const compressedFile = await imageCompression(file, options);

  const fileExt = compressedFile.name.split('.').pop() || 'jpg';
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `product_images/${fileName}`;

  // Use XHR so we can track upload progress (Supabase JS doesn't expose this)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const publicUrl = await new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${supabaseUrl}/storage/v1/object/product-images/${filePath}`);
    xhr.setRequestHeader('Authorization', `Bearer ${supabaseKey}`);
    xhr.setRequestHeader('x-upsert', 'false');
    xhr.setRequestHeader('Cache-Control', '3600');

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        // Upload counts as remaining 60% of perceived progress
        const uploadPercent = Math.round((e.loaded / e.total) * 60);
        onProgress?.(40 + uploadPercent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100);
        const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
        resolve(data.publicUrl);
      } else {
        let msg = 'Upload failed';
        try {
          const res = JSON.parse(xhr.responseText);
          msg = res.message || res.error || msg;
        } catch {}
        reject(new Error(msg));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.ontimeout = () => reject(new Error('Upload timed out'));

    const formData = new FormData();
    formData.append('', compressedFile, fileName);
    xhr.send(formData);
  });

  return publicUrl;
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

export const updateImageOrder = async (updates: { id: string; sort_order: number }[]) => {
  try {
    // Supabase JS doesn't have bulk update easily out of the box using .update() for different rows
    // We can do it sequentially or use an RPC. For simplicity and since we have a small array:
    await Promise.all(
      updates.map(update => 
        supabase.from('product_images').update({ sort_order: update.sort_order }).eq('id', update.id)
      )
    );
  } catch (error: any) {
    if (error.code !== '42P01') throw error;
  }
};
