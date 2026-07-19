import { useState } from 'react';
import { validateCollection } from '../validation/collectionSchema';
import type { CollectionFormData, ValidationErrors } from '../validation/collectionSchema';
import * as collectionService from '../services/collectionService';
import type { Collection } from '../types/collection';

export const useUpdateCollection = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const updateCollection = async (id: string, data: CollectionFormData) => {
    setLoading(true);
    setErrors({});
    setServerError(null);

    const validationErrors = validateCollection(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return false;
    }

    try {
      const slugExists = await collectionService.checkSlugExists(data.slug, id);
      if (slugExists) {
        setErrors({ slug: 'This slug is already in use.' });
        setLoading(false);
        return false;
      }

      const payload: Partial<Collection> = {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        banner: data.banner || null,
        featured_image: data.featured_image || null,
        status: data.status,
        sort_order: Number(data.sort_order) || 0,
        featured: data.featured,
        seo_title: data.seo_title || null,
        seo_description: data.seo_description || null,
        updated_at: new Date().toISOString(),
      };

      await collectionService.updateCollection(id, payload);
      return true;
    } catch (err: any) {
      console.error('Error updating collection:', err);
      setServerError(err.message || 'An unexpected error occurred while saving the collection.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateCollection,
    loading,
    errors,
    serverError,
  };
};
