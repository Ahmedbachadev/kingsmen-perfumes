import type { ProductFormData, ProductFormErrors } from '../types/product-form.types';

export function validateProductForm(data: ProductFormData): { isValid: boolean; errors: ProductFormErrors } {
  const errors: ProductFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Product name is required';
  }
  
  if (!data.slug.trim()) {
    errors.slug = 'URL slug is required';
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    errors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
  }

  if (data.regular_price < 0) {
    errors.regular_price = 'Price cannot be negative';
  }

  if (data.sale_price !== null && data.sale_price < 0) {
    errors.sale_price = 'Sale price cannot be negative';
  }

  if (data.sale_price !== null && data.sale_price >= data.regular_price) {
    errors.sale_price = 'Sale price must be less than regular price';
  }

  if (data.inventory < 0) {
    errors.inventory = 'Inventory cannot be negative';
  }

  // SEO validations (soft limits)
  if (data.seo_title.length > 60) {
    errors.seo_title = 'SEO title should be under 60 characters';
  }

  if (data.seo_description.length > 160) {
    errors.seo_description = 'SEO description should be under 160 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
