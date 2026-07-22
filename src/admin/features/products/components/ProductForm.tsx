import React, { useState, useEffect } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import type { ProductFormData, ValidationErrors } from '../validation/productSchema';

import { ProductInfoSection } from './ProductInfoSection';
import { ProductMediaSection } from './ProductMediaSection';
import { ProductPricingSection } from './ProductPricingSection';
import { ProductInventorySection } from './ProductInventorySection';
import { ProductOrganizationSection } from './ProductOrganizationSection';
import { ProductFragranceSection } from './fragrance/ProductFragranceSection';
import { ProductSEOSection } from './ProductSEOSection';

export const initialFormData: ProductFormData = {
  name: '',
  slug: '',
  short_description: '',
  description: '',
  price: '',
  compare_price: '',
  cost_price: '',
  sku: '',
  barcode: '',
  stock: '',
  track_inventory: true,
  continue_selling: false,
  featured: false,
  status: 'draft',
  category: '',
  collection_id: '',
  tags: [],
  seo_title: '',
  seo_description: '',
  images: [],
  fragrance_family: '',
  top_notes: [],
  heart_notes: [],
  base_notes: [],
  concentration: '',
  longevity: '',
  projection: '',
  recommended_seasons: [],
  recommended_occasions: [],
  gender: '',
  bottle_sizes: [],
};

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData, status: 'active' | 'draft' | 'archived') => Promise<boolean>;
  loading: boolean;
  errors: ValidationErrors;
  serverError: string | null;
  submitLabel?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  loading,
  errors,
  serverError,
  submitLabel = 'Save Product'
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsDirty(false); // Reset dirty state when initial data is loaded
    }
  }, [initialData]);

  // Block navigation if there are unsaved changes
  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async (status: 'active' | 'draft' | 'archived') => {
    const dataToSave = { ...formData, status };
    const success = await onSubmit(dataToSave, status);
    
    if (success) {
      setIsDirty(false);
      if (blocker.state === 'blocked') {
        blocker.proceed();
      }
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm("You have unsaved changes. Leave without saving?")) {
        setIsDirty(false);
        navigate('/admin/catalog/products');
      }
    } else {
      navigate('/admin/catalog/products');
    }
  };

  return (
    <div className="pb-24 relative">
      {/* Navigation Blocker Modal */}
      {blocker.state === 'blocked' ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Unsaved Changes</h3>
            <p className="text-neutral-500 mb-6">You have unsaved changes. Leave without saving?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => blocker.reset()}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={() => blocker.proceed()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {serverError && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main) */}
        <div className="lg:col-span-2 space-y-6">
          <ProductInfoSection data={formData} onChange={handleChange} errors={errors} />
          <ProductFragranceSection data={formData} onChange={handleChange} errors={errors} />
          <ProductMediaSection data={formData} onChange={handleChange} errors={errors} />
          <ProductPricingSection data={formData} onChange={handleChange} errors={errors} />
          <ProductInventorySection data={formData} onChange={handleChange} errors={errors} />
          <ProductSEOSection data={formData} onChange={handleChange} errors={errors} />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6">
          <ProductOrganizationSection data={formData} onChange={handleChange} errors={errors} />
        </div>
        
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-neutral-200 p-4 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          
          <div className="flex gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSave(formData.status === 'active' ? 'draft' : 'draft')} // Usually save as draft means explicitly changing to draft, but let's keep the user's explicit choices
              className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors disabled:opacity-50 hidden md:block"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSave(formData.status)}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 shadow-sm"
            >
              <Save className="w-4 h-4" /> 
              {loading ? 'Saving...' : submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
