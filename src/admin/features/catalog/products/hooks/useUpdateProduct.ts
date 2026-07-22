import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ProductsService, type ProductWithRelations } from '../../../../../services/supabase/products.service';
import type { ProductFormData, ProductFormErrors } from '../types/product-form.types';
import { validateProductForm } from '../validation/productSchema';

export function useUpdateProduct(product: ProductWithRelations) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>({
    name: product.name,
    slug: product.slug,
    short_description: product.short_description || '',
    description: product.description || '',
    images: product.images?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(img => ({
      id: img.id,
      url: img.url,
      isThumbnail: img.is_thumbnail || false
    })) || [],
    regular_price: product.regular_price || 0,
    sale_price: product.sale_price,
    inventory: product.inventory || 0,
    track_inventory: true, // Assuming default since we removed DB column
    continue_selling: false, // Assuming default since we removed DB column
    category_id: product.category_id,
    collection_id: product.collection_id,
    tags: product.tags || [],
    is_featured: product.is_featured || false,
    status: product.status || 'draft',
    fragrance_family: product.fragrance_family || null,
    concentration: product.concentration || null,
    top_notes: product.top_notes || [],
    heart_notes: product.heart_notes || [],
    base_notes: product.base_notes || [],
    longevity: product.longevity || null,
    projection: product.projection || null,
    recommended_seasons: product.recommended_seasons || [],
    recommended_occasions: product.recommended_occasions || [],
    bottle_sizes: Array.isArray(product.bottle_sizes) ? product.bottle_sizes : [],
    seo_title: product.seo_title || '',
    seo_description: product.meta_description || ''
  });
  
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateField = useCallback(<K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      
      if (field === 'name') {
        const oldAutoSlug = prev.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        if (!prev.slug || prev.slug === oldAutoSlug) {
          next.slug = (value as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
      }
      
      return next;
    });
    setHasUnsavedChanges(true);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const addImages = useCallback(async (files: File[]) => {
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file,
      isUploading: true
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
    setHasUnsavedChanges(true);

    for (const img of newImages) {
      try {
        const publicUrl = await ProductsService.uploadImage(img.file!);
        setFormData(prev => ({
          ...prev,
          images: prev.images.map(i => i.id === img.id ? { ...i, url: publicUrl, isUploading: false, file: undefined } : i)
        }));
      } catch (error) {
        console.error('Upload failed:', error);
        setFormData(prev => ({
          ...prev,
          images: prev.images.filter(i => i.id !== img.id)
        }));
        alert('Failed to upload image. Please try again.');
      }
    }
  }, []);

  const removeImage = useCallback((id: string) => {
    setFormData(prev => {
      const remaining = prev.images.filter(img => img.id !== id);
      if (remaining.length > 0 && !remaining.some(img => img.isThumbnail)) {
        remaining[0].isThumbnail = true;
      }
      return { ...prev, images: remaining };
    });
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

  // Prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const submitForm = async (status: ProductFormData['status'] = 'draft') => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const finalData = { ...formData, status };
      
      const validationErrors = validateProductForm(finalData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error('Please fix the errors before saving.');
      }

      if (finalData.images.some(img => img.isUploading)) {
        throw new Error('Please wait for all images to finish uploading.');
      }

      // Structure data for service
      const productUpdate = {
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

      const imagesData = finalData.images.map((img, index) => ({
        id: img.id,
        url: img.url,
        alt_text: finalData.name,
        sort_order: index,
        is_thumbnail: img.isThumbnail || index === 0,
        product_id: product.id
      }));

      const variantData = {
        title: 'Default',
        sku: null,
        price: finalData.regular_price,
        inventory: finalData.inventory,
        product_id: product.id
      };

      await ProductsService.updateProduct(product.id, productUpdate, [variantData], imagesData);
      
      setHasUnsavedChanges(false);
      toast.success(`"${finalData.name}" saved successfully!`);
      return true;
    } catch (error: any) {
      console.error('Failed to update product:', error);
      toast.error(error.message || 'Failed to update product. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Leave without saving?')) {
        navigate('/admin/catalog/products');
      }
    } else {
      navigate('/admin/catalog/products');
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
    cancel: handleCancel
  };
}
