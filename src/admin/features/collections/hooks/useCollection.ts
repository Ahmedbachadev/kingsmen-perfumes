import { useState, useEffect, useCallback } from 'react';
import * as collectionService from '../services/collectionService';
import type { CollectionFormData } from '../validation/collectionSchema';

export const useCollection = (id: string | undefined) => {
  const [collection, setCollection] = useState<CollectionFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollection = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await collectionService.getCollectionById(id);
      
      const formData: CollectionFormData = {
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        banner: data.banner || '',
        featured_image: data.featured_image || '',
        status: data.status || 'draft',
        sort_order: data.sort_order !== null ? data.sort_order.toString() : '0',
        featured: data.featured || false,
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
      };
      
      setCollection(formData);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching collection:', err);
      setError(err.message || 'Failed to fetch collection details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return { collection, loading, error, refresh: fetchCollection };
};
