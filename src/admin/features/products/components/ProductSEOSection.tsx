import React from 'react';
import type { ProductFormData, ValidationErrors } from '../validation/productSchema';

interface Props {
  data: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
  errors: ValidationErrors;
}

export const ProductSEOSection: React.FC<Props> = ({ data, onChange }) => {
  const defaultTitle = data.name || 'Product Name';
  const defaultDesc = data.short_description || data.description.substring(0, 160) || 'Product description will appear here...';
  
  const seoTitle = data.seo_title || defaultTitle;
  const seoDesc = data.seo_description || defaultDesc;
  const seoUrl = `https://kingsmen-perfumes.com/products/${data.slug || 'product-slug'}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-neutral-900">Search Engine Optimization</h2>
        <p className="text-sm text-neutral-500 mt-1">Configure how this product appears in search engine results.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="seo_title" className="block text-sm font-medium text-neutral-700 mb-1">
            SEO Title
          </label>
          <input
            type="text"
            id="seo_title"
            value={data.seo_title}
            onChange={(e) => onChange('seo_title', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
            placeholder={defaultTitle}
            maxLength={70}
          />
          <p className="mt-1 text-xs text-neutral-500 text-right">{data.seo_title.length}/70</p>
        </div>

        <div>
          <label htmlFor="seo_description" className="block text-sm font-medium text-neutral-700 mb-1">
            SEO Description
          </label>
          <textarea
            id="seo_description"
            rows={3}
            value={data.seo_description}
            onChange={(e) => onChange('seo_description', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
            placeholder={defaultDesc.substring(0, 160)}
            maxLength={320}
          />
          <p className="mt-1 text-xs text-neutral-500 text-right">{data.seo_description.length}/320</p>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-200">
          <p className="text-sm font-medium text-neutral-900 mb-3">Search Engine Preview</p>
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="text-sm text-green-700 truncate mb-1">{seoUrl}</div>
            <div className="text-lg text-blue-600 hover:underline cursor-pointer truncate mb-1">{seoTitle}</div>
            <div className="text-sm text-neutral-600 line-clamp-2">{seoDesc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
