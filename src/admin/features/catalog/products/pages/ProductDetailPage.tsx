import React from 'react';
import { useParams } from 'react-router-dom';
import { CreateProductPage } from './CreateProductPage';
import { EditProductPage } from './EditProductPage';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  if (id === 'new' || !id) {
    return <CreateProductPage />;
  }
  
  return <EditProductPage id={id} />;
}
