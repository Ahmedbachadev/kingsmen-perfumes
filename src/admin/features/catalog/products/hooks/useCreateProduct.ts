import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsService } from '../../../../../services/supabase/products.service';
import { DEFAULT_FORM_DATA } from '../types/product-form.types';
import type { ProductFormData, ProductFormErrors } from '../types/product-form.types';
import { validateProductForm } from '../validation/productSchema';

export function useCreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateField = useCallback(<K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      
      // Auto-generate slug from name if user hasn't explicitly customized slug yet
      // A simple heuristic: if they type name and slug was empty, or slug matches the old name's slug, update it
      if (field === 'name') {
        const oldAutoSlug = prev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        if (!prev.slug || prev.slug === oldAutoSlug) {
          next.slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
      }
      
      return next;
    });
    setHasUnsavedChanges(true);
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const addImages = useCallback(async (files: File[]) => {
    // 1. Add to state immediately for optimistic UI
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file), // Local preview
      file,
      isUploading: true
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    setHasUnsavedChanges(true);

    // 2. Upload asynchronously
    for (const img of newImages) {
      try {
        const publicUrl = await ProductsService.uploadImage(img.file!);
        setFormData(prev => ({
          ...prev,
          images: prev.images.map(i => i.id === img.id ? { ...i, url: publicUrl, isUploading: false, file: undefined } : i)
        }));
      } catch (error) {
        console.error('Failed to upload image:', error);
        // Remove failed image
        setFormData(prev => ({
          ...prev,
          images: prev.images.filter(i => i.id !== img.id)
        }));
        alert('Failed to upload an image. Please try again.');
      }
    }
  }, []);

  const removeImage = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
    setHasUnsavedChanges(true);
  }, []);

  const setThumbnail = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map(img => ({
        ...img,
        isThumbnail: img.id === id
      }))
    }));
    setHasUnsavedChanges(true);
  }, []);

  const reorderImages = useCallback((startIndex: number, endIndex: number) => {
    setFormData(prev => {
      const result = Array.from(prev.images);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, images: result };
    });
    setHasUnsavedChanges(true);
  }, []);

  const submitForm = async (statusOverride?: 'active' | 'draft' | 'archived') => {
    const finalData = { ...formData };
    if (statusOverride) {
      finalData.status = statusOverride;
    }

    // Validation
    const { isValid, errors: validationErrors } = validateProductForm(finalData);
    if (!isValid) {
      setErrors(validationErrors);
      
      // Find first error key to scroll to
      const firstError = Object.keys(validationErrors)[0];
      const element = document.getElementById(`field-${firstError}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return false;
    }

    // Ensure all uploads are finished
    if (finalData.images.some(img => img.isUploading)) {
      alert("Please wait for all images to finish uploading.");
      return false;
    }

    setIsSubmitting(true);
    try {
      // Structure data for service
      const productInsert = {
        name: finalData.name,
        slug: finalData.slug,
        description: finalData.description,
        short_description: finalData.short_description,
        regular_price: finalData.regular_price,
        sale_price: finalData.sale_price,
        inventory: finalData.inventory,
        low_stock_threshold: 5,
        category_id: finalData.category_id,
        collection_id: finalData.collection_id,
        is_featured: finalData.is_featured,
        status: finalData.status,
        seo_title: finalData.seo_title,
        meta_description: finalData.seo_description,
        fragrance_family: finalData.fragrance_family,
        concentration: finalData.concentration,
        top_notes: finalData.top_notes,
        heart_notes: finalData.heart_notes,
        base_notes: finalData.base_notes,
        longevity: finalData.longevity,
        projection: finalData.projection,
        recommended_seasons: finalData.recommended_seasons,
        recommended_occasions: finalData.recommended_occasions,
        bottle_sizes: finalData.bottle_sizes as any,
      };

      const imagesInsert = finalData.images.map((img, index) => ({
        url: img.url,
        alt_text: finalData.name,
        sort_order: index,
        is_thumbnail: img.isThumbnail || index === 0
      }));

      // In this version, we aren't supporting full variants, but we will create one default variant
      const variantsInsert = [{
        title: 'Default',
        sku: null,
        price: finalData.regular_price,
        inventory: finalData.inventory
      }];

      await ProductsService.createProduct(productInsert, variantsInsert, imagesInsert);
      
      setHasUnsavedChanges(false);
      
      // Use native browser alert or replace with toast system
      alert(`Product "${finalData.name}" created successfully!`);
      navigate('/admin/catalog/products');
      return true;
    } catch (error: any) {
      console.error('Failed to create product:', error);
      alert(error.message || 'Failed to create product. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    hasUnsavedChanges,
    updateField,
    addImages,
    removeImage,
    setThumbnail,
    reorderImages,
    submitForm,
    cancel: () => navigate('/admin/catalog/products')
  };
}
