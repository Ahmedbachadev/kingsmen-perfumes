import type { Product, ProductStatus, ProductImage, BottleSize } from '../types/product';

export interface ProductFormData {
  name: string;
  slug: string;
  short_description: string;
  description: string;
  price: string | number;
  compare_price: string | number;
  cost_price: string | number;
  sku: string;
  barcode: string;
  stock: string | number;
  track_inventory: boolean;
  continue_selling: boolean;
  featured: boolean;
  status: ProductStatus;
  category: string;
  collection_id: string;
  tags: string[];
  seo_title: string;
  seo_description: string;
  images: ProductImage[];
  // Fragrance extension
  fragrance_family: string;
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  concentration: string;
  longevity: string;
  projection: string;
  recommended_seasons: string[];
  recommended_occasions: string[];
  gender: string;
  bottle_sizes: BottleSize[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateProduct = (data: ProductFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Product name is required';
  }
  
  if (!data.slug.trim()) {
    errors.slug = 'Slug is required';
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    errors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
  }

  const priceNum = Number(data.price);
  if (data.price === '' || isNaN(priceNum) || priceNum < 0) {
    errors.price = 'Valid price is required';
  }

  if (data.compare_price !== '') {
    const compareNum = Number(data.compare_price);
    if (isNaN(compareNum) || compareNum < 0) {
      errors.compare_price = 'Compare price cannot be negative';
    }
  }

  const stockNum = Number(data.stock);
  if (data.stock === '' || isNaN(stockNum) || stockNum < 0) {
    errors.stock = 'Valid stock quantity is required';
  }

  if (data.images.length === 0) {
    errors.images = 'At least one product image is required';
  }

  const checkDuplicates = (arr: string[], fieldName: string) => {
    if (!arr) return;
    const unique = new Set(arr.map(a => a.toLowerCase().trim()));
    if (unique.size !== arr.length) {
      errors[fieldName] = `Duplicate values found`;
    }
  };
  
  checkDuplicates(data.top_notes, 'top_notes');
  checkDuplicates(data.heart_notes, 'heart_notes');
  checkDuplicates(data.base_notes, 'base_notes');

  return errors;
};
