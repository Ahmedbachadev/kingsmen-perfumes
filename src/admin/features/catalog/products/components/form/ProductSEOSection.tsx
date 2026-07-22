import React from 'react';
import type { ProductFormData, ProductFormErrors } from '../../types/product-form.types';

interface ProductSEOSectionProps {
  data: ProductFormData;
  errors: ProductFormErrors;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
}

export function ProductSEOSection({ data, errors, onChange }: ProductSEOSectionProps) {
  
  const seoTitle = data.seo_title || data.name || 'Product Name';
  const seoDesc = data.seo_description || data.short_description || 'Product description will appear here in search engine results.';
  const seoUrl = `https://kingsmen.com/products/${data.slug || 'product-slug'}`;

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mt-6">
      <h2 className="text-base font-semibold text-slate-900 mb-2">Search engine listing</h2>
      <p className="text-sm text-slate-500 mb-6">Add a title and description to see how this product might appear in a search engine listing.</p>
      
      {/* Live Preview */}
      <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
        <span className="text-[13px] text-slate-800 tracking-wide font-medium truncate block">{seoUrl}</span>
        <h3 className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer truncate mt-0.5">{seoTitle}</h3>
        <p className="text-[14px] text-slate-600 mt-1 line-clamp-2">{seoDesc}</p>
      </div>

      <div className="space-y-5 pt-4 border-t border-slate-100">
        <div id="field-seo_title">
          <div className="flex justify-between mb-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Page title
            </label>
            <span className={`text-xs ${data.seo_title.length > 60 ? 'text-rose-500 font-medium' : 'text-slate-400'}`}>
              {data.seo_title.length}/60
            </span>
          </div>
          <input
            type="text"
            value={data.seo_title}
            onChange={(e) => onChange('seo_title', e.target.value)}
            className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.seo_title ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/60 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl focus:ring-2 transition-all duration-300 ease-out text-sm text-slate-900`}
          />
          {errors.seo_title && <p className="mt-1.5 text-xs text-rose-500">{errors.seo_title}</p>}
        </div>

        <div id="field-seo_description">
          <div className="flex justify-between mb-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Meta description
            </label>
            <span className={`text-xs ${data.seo_description.length > 160 ? 'text-rose-500 font-medium' : 'text-slate-400'}`}>
              {data.seo_description.length}/160
            </span>
          </div>
          <textarea
            value={data.seo_description}
            onChange={(e) => onChange('seo_description', e.target.value)}
            rows={3}
            className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.seo_description ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/60 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl focus:ring-2 transition-all duration-300 ease-out text-sm text-slate-900 resize-none`}
          />
          {errors.seo_description && <p className="mt-1.5 text-xs text-rose-500">{errors.seo_description}</p>}
        </div>
      </div>
    </div>
  );
}
