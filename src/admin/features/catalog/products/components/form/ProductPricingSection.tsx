import React from 'react';
import type { ProductFormData, ProductFormErrors } from '../../types/product-form.types';

interface ProductPricingSectionProps {
  data: ProductFormData;
  errors: ProductFormErrors;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
}

export function ProductPricingSection({ data, errors, onChange }: ProductPricingSectionProps) {
  
  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mt-6">
      <h2 className="text-base font-semibold text-slate-900 mb-6">Pricing</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div id="field-regular_price">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Price <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">Rs</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={data.regular_price || ''}
              onChange={(e) => onChange('regular_price', parseFloat(e.target.value) || 0)}
              className={`w-full pl-8 pr-4 py-2.5 bg-slate-50 border ${errors.regular_price ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/60 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl focus:ring-2 transition-all duration-300 ease-out text-sm text-slate-900`}
            />
          </div>
          {errors.regular_price && <p className="mt-1.5 text-xs text-rose-500">{errors.regular_price}</p>}
        </div>

        <div id="field-sale_price">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Compare at price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">Rs</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={data.sale_price !== null ? data.sale_price : ''}
              onChange={(e) => onChange('sale_price', e.target.value ? parseFloat(e.target.value) : null)}
              className={`w-full pl-8 pr-4 py-2.5 bg-slate-50 border ${errors.sale_price ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/60 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl focus:ring-2 transition-all duration-300 ease-out text-sm text-slate-900`}
            />
          </div>
          {errors.sale_price && <p className="mt-1.5 text-xs text-rose-500">{errors.sale_price}</p>}
        </div>
      </div>
    </div>
  );
}
