import React from 'react';
import type { ProductFormData, ProductFormErrors } from '../../types/product-form.types';

interface ProductInfoSectionProps {
  data: ProductFormData;
  errors: ProductFormErrors;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
}

export function ProductInfoSection({ data, errors, onChange }: ProductInfoSectionProps) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <h2 className="text-base font-semibold text-slate-900 mb-6">Product Information</h2>
      
      <div className="space-y-6">
        <div id="field-name">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Product Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="e.g. Royal Oud Extrait"
            className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.name ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/60 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl focus:ring-2 transition-all duration-300 ease-out text-sm text-slate-900`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-rose-500">{errors.name}</p>}
        </div>

        <div id="field-slug">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Slug <span className="text-rose-500">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200/60 bg-slate-100 text-slate-500 text-sm">
              kingsmen.com/products/
            </span>
            <input
              type="text"
              value={data.slug}
              onChange={(e) => onChange('slug', e.target.value)}
              placeholder="royal-oud-extrait"
              className={`flex-1 px-4 py-2.5 bg-slate-50 border ${errors.slug ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/60 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-r-xl focus:ring-2 transition-all duration-300 ease-out text-sm text-slate-900`}
            />
          </div>
          {errors.slug && <p className="mt-1.5 text-xs text-rose-500">{errors.slug}</p>}
        </div>

        <div id="field-short_description">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Short Description
          </label>
          <textarea
            value={data.short_description}
            onChange={(e) => onChange('short_description', e.target.value)}
            rows={2}
            placeholder="A brief summary of the fragrance..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 ease-out text-sm text-slate-900 resize-none"
          />
          <p className="mt-1.5 text-xs text-slate-500">Appears on product cards and collection pages.</p>
        </div>

        <div id="field-description">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Rich Description
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            rows={8}
            placeholder="Detailed description of the fragrance notes, inspiration, and ingredients..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 ease-out text-sm text-slate-900 resize-y"
          />
        </div>
      </div>
    </div>
  );
}
