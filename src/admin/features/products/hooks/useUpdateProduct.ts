import { useState } from 'react';
import { validateProduct } from '../validation/productSchema';
import type { ProductFormData, ValidationErrors } from '../validation/productSchema';
import * as productService from '../services/productService';
import type { Product } from '../types/product';
import toast from 'react-hot-toast';

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const updateProduct = async (id: string, data: ProductFormData) => {
    setLoading(true);
    setErrors({});
    setServerError(null);

    // 1. Validation
    const validationErrors = validateProduct(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the validation errors before saving.');
      setLoading(false);
      return false;
    }

    try {
      // 2. Check for duplicate slug, excluding current product ID
      const slugExists = await productService.checkSlugExists(data.slug, id);
      if (slugExists) {
        setErrors({ slug: 'This slug is already in use.' });
        toast.error('This slug is already in use.');
        setLoading(false);
        return false;
      }

      // 3. Extract Thumbnail (from featured image or first image)
      let thumbnailUrl = '';
      if (data.images.length > 0) {
        const featuredImage = data.images.find(img => img.is_thumbnail);
        thumbnailUrl = featuredImage ? featuredImage.url : data.images[0].url;
      }

      // 4. Prepare Payload for DB
      const payload: Partial<Product> = {
        name: data.name,
        slug: data.slug,
        short_description: data.short_description || null,
        description: data.description || null,
        regular_price: Number(data.price),
        sale_price: data.compare_price ? Number(data.compare_price) : null,
        inventory: Number(data.stock),
        is_featured: data.featured,
        status: data.status,
        category_id: data.category || null,
        collection_id: data.collection_id || null,
        seo_title: data.seo_title || null,
        meta_description: data.seo_description || null,
        fragrance_family: data.fragrance_family || null,
        top_notes: data.top_notes.length > 0 ? data.top_notes : null,
        heart_notes: data.heart_notes.length > 0 ? data.heart_notes : null,
        base_notes: data.base_notes.length > 0 ? data.base_notes : null,
        concentration: data.concentration || null,
        longevity: data.longevity || null,
        projection: data.projection || null,
        recommended_seasons: data.recommended_seasons.length > 0 ? data.recommended_seasons : null,
        recommended_occasions: data.recommended_occasions.length > 0 ? data.recommended_occasions : null,
        gender: data.gender || null,
        bottle_sizes: data.bottle_sizes.length > 0 ? data.bottle_sizes : null,
        updated_at: new Date().toISOString(),
      };

      // 5. Update in DB
      await productService.updateProduct(id, payload);

      // 6. Link temporary/new images to the product
      if (data.images.length > 0) {
        const { updateImageMetadata } = await import('../media/services/mediaService');
        await Promise.all(
          data.images.map(img => 
            updateImageMetadata(img.id, { product_id: id })
          )
        );
      }

      toast.success('Product updated successfully!');
      return true;
    } catch (err: any) {
      console.error('Error updating product:', err);
      const errorMessage = err.message || 'An unexpected error occurred while saving the product.';
      setServerError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProduct,
    loading,
    errors,
    serverError,
  };
};
