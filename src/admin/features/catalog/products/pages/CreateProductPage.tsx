import React from 'react';
import { ProductForm } from '../components/form/ProductForm';
import { useCreateProduct } from '../hooks/useCreateProduct';

export function CreateProductPage() {
  const productFormProps = useCreateProduct();
  
  return <ProductForm {...productFormProps} isEditMode={false} />;
}
