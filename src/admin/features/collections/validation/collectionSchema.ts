import type { CollectionStatus } from '../types/collection';

export interface CollectionFormData {
  name: string;
  slug: string;
  description: string;
  banner: string;
  featured_image: string; // Thumbnail
  status: CollectionStatus;
  sort_order: string | number;
  featured: boolean;
  seo_title: string;
  seo_description: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateCollection = (data: CollectionFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Collection name is required';
  }
  
  if (!data.slug.trim()) {
    errors.slug = 'Slug is required';
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    errors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
  }

  const sortOrderNum = Number(data.sort_order);
  if (data.sort_order === '' || isNaN(sortOrderNum)) {
    errors.sort_order = 'Valid display order is required';
  }

  return errors;
};
