import { useState, useCallback, useEffect } from 'react';
import type { ProductImage } from '../../types/product';
import * as mediaService from '../services/mediaService';
import { validateImage } from '../validation/imageValidation';

export const useProductImages = (productId?: string) => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      loadImages(productId);
    }
  }, [productId]);

  const loadImages = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await mediaService.getProductImages(id);
      setImages(data);
    } catch (err: any) {
      console.error('Failed to load images', err);
      setError('Failed to load product images');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImages = async (files: File[]) => {
    setIsUploading(true);
    setError(null);
    
    // Preliminary validation
    const validFiles = files.filter(file => {
      const err = validateImage(file);
      if (err) {
        setError(err); // Just surface the last error or collect them
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      setIsUploading(false);
      return;
    }

    try {
      const newImages: ProductImage[] = [];
      const startingOrder = images.length;

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        
        // 1. Upload to storage
        const url = await mediaService.uploadImageToStorage(file);
        
        // 2. Determine if it should be featured
        const isFeatured = images.length === 0 && i === 0;

        // 3. Save metadata to DB only if we have a real product ID
        let meta: ProductImage;
        if (productId) {
          meta = await mediaService.saveImageMetadata({
            product_id: productId,
            url: url,
            sort_order: startingOrder + i,
            alt_text: file.name,
            is_thumbnail: isFeatured
          });
        } else {
          // No product yet — keep a local-only record so the UI shows the image
          // The actual DB insert happens when the product form is submitted
          meta = {
            id: `local-${Date.now()}-${i}`,
            product_id: '',
            url: url,
            sort_order: startingOrder + i,
            alt_text: file.name,
            is_thumbnail: isFeatured,
            created_at: new Date().toISOString(),
          };
        }

        newImages.push(meta);
      }

      setImages(prev => [...prev, ...newImages]);
    } catch (err: any) {
      console.error('Upload failed', err);
      setError(err.message || 'Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = async (imageId: string) => {
    // Optimistic UI
    const targetImage = images.find(img => img.id === imageId);
    if (!targetImage) return;

    setImages(prev => prev.filter(img => img.id !== imageId));

    try {
      // 1. Delete from storage
      await mediaService.deleteImageFromStorage(targetImage.url);
      // 2. Delete metadata
      await mediaService.deleteImageMetadata(imageId);
      
      // If the deleted image was featured and we have others, make the first one featured
      if (targetImage.is_thumbnail && images.length > 1) {
        const newFeatured = images.find(img => img.id !== imageId);
        if (newFeatured) {
          setFeatured(newFeatured.id);
        }
      }
    } catch (err: any) {
      console.error('Failed to delete', err);
      // Revert optimistic update on failure
      setImages(prev => [...prev, targetImage]);
      setError('Failed to delete image');
    }
  };

  const reorderImages = async (newOrder: ProductImage[]) => {
    // Optimistic UI
    const updatedImages = newOrder.map((img, idx) => ({ ...img, sort_order: idx }));
    setImages(updatedImages);

    try {
      const updates = updatedImages.map(img => ({ id: img.id, sort_order: img.sort_order }));
      await mediaService.updateImageOrder(updates);
    } catch (err: any) {
      console.error('Failed to reorder', err);
      setError('Failed to save new order');
    }
  };

  const setFeatured = async (imageId: string) => {
    // Optimistic UI
    setImages(prev => prev.map(img => ({
      ...img,
      is_thumbnail: img.id === imageId
    })));

    try {
      // Find old featured
      const oldFeatured = images.find(img => img.is_thumbnail);
      if (oldFeatured && oldFeatured.id !== imageId) {
        await mediaService.updateImageMetadata(oldFeatured.id, { is_thumbnail: false });
      }
      await mediaService.updateImageMetadata(imageId, { is_thumbnail: true });
    } catch (err: any) {
      console.error('Failed to update featured', err);
      setError('Failed to set featured image');
    }
  };

  const updateAltText = async (imageId: string, altText: string) => {
    setImages(prev => prev.map(img => img.id === imageId ? { ...img, alt_text: altText } : img));
    try {
      await mediaService.updateImageMetadata(imageId, { alt_text: altText });
    } catch (err) {
      console.error('Failed to update alt text', err);
      setError('Failed to save alt text');
    }
  };

  return {
    images,
    isLoading,
    isUploading,
    error,
    uploadImages,
    removeImage,
    reorderImages,
    setFeatured,
    updateAltText,
    setImages // For directly updating state if needed (like initial Add Product)
  };
};
