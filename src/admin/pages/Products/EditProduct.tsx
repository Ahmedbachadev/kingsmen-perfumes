import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from '../../features/products/components/ProductForm';
import { PageHeader } from '../../components/layout/PageHeader';
import { useProduct } from '../../features/products/hooks/useProduct';
import { useUpdateProduct } from '../../features/products/hooks/useUpdateProduct';
import type { ProductFormData } from '../../features/products/validation/productSchema';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading: loadingProduct, error: productError } = useProduct(id);
  const { updateProduct, loading: savingProduct, errors, serverError } = useUpdateProduct();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (data: ProductFormData, status: 'active' | 'draft' | 'archived') => {
    if (!id) return false;
    
    setSuccessMessage(null);
    const success = await updateProduct(id, { ...data, status: status });
    if (success) {
      setSuccessMessage('Product updated successfully!');
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    }
    return success;
  };

  if (loadingProduct) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="mb-6 animate-pulse">
          <div className="h-4 w-32 bg-neutral-200 rounded mb-4"></div>
          <div className="h-8 w-64 bg-neutral-200 rounded mb-2"></div>
          <div className="h-4 w-96 bg-neutral-200 rounded"></div>
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-neutral-200 rounded-xl"></div>
            <div className="h-64 bg-neutral-200 rounded-xl"></div>
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-neutral-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Product Not Found</h2>
          <p className="text-neutral-500 mb-6">{productError || "The product you're trying to edit doesn't exist or has been deleted."}</p>
          <button 
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-full flex flex-col relative">
      {/* Success Toast */}
      {successMessage && (
        <div className="absolute top-4 right-4 z-50 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm shadow-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          {successMessage}
        </div>
      )}

      <div className="mb-6">
        <button 
          onClick={() => navigate('/admin/products')}
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1 mb-4"
        >
          &larr; Back to Products
        </button>
        <PageHeader 
          title={`Edit Product: ${product.name}`} 
          description="Update product details, pricing, and inventory."
        />
      </div>

      <div className="flex-1">
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          loading={savingProduct}
          errors={errors}
          serverError={serverError}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
};

export default EditProduct;
