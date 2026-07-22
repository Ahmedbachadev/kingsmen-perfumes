import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { ProductInfoSection } from './ProductInfoSection';
import { ProductFragranceSection } from './ProductFragranceSection';
import { ProductMediaSection } from './ProductMediaSection';
import { ProductPricingSection } from './ProductPricingSection';
import { ProductInventorySection } from './ProductInventorySection';
import { ProductStatusCard } from './ProductStatusCard';
import { ProductOrganizationSection } from './ProductOrganizationSection';
import { ProductSEOSection } from './ProductSEOSection';
import type { ProductFormProps } from '../../types/product-form.types';

export function ProductForm({
  formData,
  errors,
  isSubmitting,
  hasUnsavedChanges,
  updateField,
  addImages,
  removeImage,
  setThumbnail,
  reorderImages,
  submitForm,
  cancel,
  isEditMode
}: ProductFormProps) {

  return (
    <div className="relative pb-24 max-w-[1400px] mx-auto">
      {/* Sticky Header */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 p-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300">
        <div className="flex items-center gap-3">
          <button 
            onClick={cancel}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {isEditMode ? 'Edit Product' : 'Add Product'}
            </h1>
            {hasUnsavedChanges && (
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 mt-1 inline-block">
                Unsaved changes
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={cancel}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-all duration-300 ease-out shadow-sm disabled:opacity-50"
          >
            Discard
          </button>
          <button 
            onClick={() => submitForm('draft')}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-300 ease-out shadow-sm disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button 
            onClick={() => submitForm('active')}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all duration-300 ease-out shadow-[0_4px_14px_0_rgba(99,102,241,0.39)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Product
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Column (Left) */}
          <div className="flex-1 w-full flex flex-col gap-8 min-w-0">
            <ProductInfoSection data={formData} errors={errors} onChange={updateField} />
            <ProductFragranceSection data={formData} onChange={updateField} />
            <ProductMediaSection 
              images={formData.images}
              onUpload={addImages}
              onRemove={removeImage}
              onSetThumbnail={setThumbnail}
              onReorder={reorderImages}
            />
            <ProductPricingSection data={formData} errors={errors} onChange={updateField} />
            <ProductInventorySection data={formData} errors={errors} onChange={updateField} />
          </div>

          {/* Sidebar Column (Right) */}
          <div className="w-full lg:w-[380px] flex flex-col gap-8 shrink-0">
            <ProductStatusCard data={formData} onChange={updateField} />
            <ProductOrganizationSection data={formData} onChange={updateField} />
            <ProductSEOSection data={formData} errors={errors} onChange={updateField} />
          </div>
          
        </div>
      </div>
    </div>
  );
}
