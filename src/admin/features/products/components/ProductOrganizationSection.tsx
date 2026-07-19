import React from 'react';
import type { ProductFormData, ValidationErrors } from '../validation/productSchema';

interface Props {
  data: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
  errors: ValidationErrors;
}

export const ProductOrganizationSection: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-neutral-900">Organization</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={data.status}
            onChange={(e) => onChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow bg-white"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={data.category}
            onChange={(e) => onChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
            placeholder="e.g. Perfumes"
          />
        </div>

        <div>
          <label htmlFor="collection_id" className="block text-sm font-medium text-neutral-700 mb-1">
            Collection ID
          </label>
          <input
            type="text"
            id="collection_id"
            value={data.collection_id}
            onChange={(e) => onChange('collection_id', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
            placeholder="Collection UUID"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={data.tags.join(', ')}
            onChange={(e) => {
              const tagsArray = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
              onChange('tags', tagsArray);
            }}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
            placeholder="e.g. sweet, floral, men"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox"
              checked={data.featured}
              onChange={(e) => onChange('featured', e.target.checked)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
            />
            <span className="text-sm font-medium text-neutral-700">Featured Product</span>
          </label>
        </div>
      </div>
    </div>
  );
};
