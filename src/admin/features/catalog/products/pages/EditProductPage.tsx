import React from 'react';
import { ProductForm } from '../components/form/ProductForm';
import { useProduct } from '../hooks/useProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditProductPageProps {
  id: string;
}

export function EditProductPage({ id }: EditProductPageProps) {
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <div className="relative pb-24 max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
          <div className="h-8 bg-slate-200 rounded-md w-1/4"></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <div className="h-64 bg-slate-200 rounded-2xl"></div>
            <div className="h-48 bg-slate-200 rounded-2xl"></div>
          </div>
          <div className="w-full lg:w-[380px] space-y-8">
            <div className="h-40 bg-slate-200 rounded-2xl"></div>
            <div className="h-40 bg-slate-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-12 text-center max-w-lg mx-auto">
        <div className="bg-red-50 text-red-500 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Failed to load product</h2>
        <p className="text-slate-500 mb-6">The product you are trying to edit could not be found or has been deleted.</p>
        <button 
          onClick={() => navigate('/admin/catalog/products')}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          Return to Products
        </button>
      </div>
    );
  }

  return <EditProductFormWrapper product={product} />;
}

// We extract this so the hook initializes only when `product` is loaded
function EditProductFormWrapper({ product }: { product: any }) {
  const updateProps = useUpdateProduct(product);
  
  return <ProductForm {...updateProps} isEditMode={true} />;
}
