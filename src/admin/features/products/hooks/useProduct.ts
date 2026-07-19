import { useState, useEffect } from 'react';
import * as productService from '../services/productService';
import type { ProductFormData } from '../validation/productSchema';

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        
        // Map Product to ProductFormData
        const formData: ProductFormData = {
          name: data.name || '',
          slug: data.slug || '',
          short_description: data.short_description || '',
          description: data.description || '',
          price: data.price !== null && data.price !== undefined ? data.price.toString() : '',
          compare_price: data.compare_price !== null && data.compare_price !== undefined ? data.compare_price.toString() : '',
          cost_price: '',
          sku: data.sku || '',
          barcode: '',
          stock: data.stock !== null && data.stock !== undefined ? data.stock.toString() : '0',
          track_inventory: true,
          continue_selling: false,
          featured: data.featured || false,
          status: data.status || 'draft',
          category: data.category || '',
          collection_id: data.collection_id || '',
          tags: [],
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          images: data.images || [],
          fragrance_family: data.fragrance_family || '',
          top_notes: data.top_notes || [],
          heart_notes: data.heart_notes || [],
          base_notes: data.base_notes || [],
          concentration: data.concentration || '',
          longevity: data.longevity || '',
          projection: data.projection || '',
          recommended_seasons: data.recommended_seasons || [],
          recommended_occasions: data.recommended_occasions || [],
          gender: data.gender || '',
          bottle_sizes: data.bottle_sizes || [],
        };
        
        setProduct(formData);
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
