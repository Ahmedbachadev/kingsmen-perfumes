import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm, initialFormData } from '../../features/products/components/ProductForm';
import { PageHeader } from '../../components/layout/PageHeader';
import { useCreateProduct } from '../../features/products/hooks/useCreateProduct';
import type { ProductFormData } from '../../features/products/validation/productSchema';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct, loading, errors, serverError } = useCreateProduct();

  const handleSubmit = async (data: ProductFormData, status: 'active' | 'draft' | 'archived') => {
    const success = await createProduct({ ...data, status: status as 'active' | 'draft' });
    if (success) {
      navigate('/admin/products');
    }
    return success;
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-full flex flex-col">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/admin/products')}
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1 mb-4"
        >
          &larr; Back to Products
        </button>
        <PageHeader 
          title="Add Product" 
          description="Create a new product, configure pricing, and manage inventory."
        />
      </div>

      <div className="flex-1">
        <ProductForm
          initialData={initialFormData}
          onSubmit={handleSubmit}
          loading={loading}
          errors={errors}
          serverError={serverError}
          submitLabel="Save Product"
        />
      </div>
    </div>
  );
};

export default AddProduct;
