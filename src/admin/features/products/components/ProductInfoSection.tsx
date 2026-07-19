import React from 'react';
import type { ProductFormData, ValidationErrors } from '../validation/productSchema';

interface Props {
  data: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
  errors: ValidationErrors;
}

export const ProductInfoSection: React.FC<Props> = ({ data, onChange, errors }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange('name', val);
    
    // Auto-generate slug if it hasn't been heavily customized, or simply always update if it matches
    // the previous auto-generated slug. For simplicity, let's just auto-generate if slug is empty 
    // or we are typing from scratch. 
    // A more robust way is to just generate it unless the user manually edits the slug field.
    if (!data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === data.slug) {
      const newSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      onChange('slug', newSlug);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-neutral-900">Product Information</h2>
        <p className="text-sm text-neutral-500 mt-1">Title, short description, and slug.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={handleNameChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow ${errors.name ? 'border-red-300' : 'border-neutral-300'}`}
            placeholder="e.g. Royal Oud Extrait"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-neutral-700 mb-1">
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            value={data.slug}
            onChange={(e) => onChange('slug', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow ${errors.slug ? 'border-red-300' : 'border-neutral-300'}`}
            placeholder="e.g. royal-oud-extrait"
          />
          {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
        </div>

        <div>
          <label htmlFor="short_description" className="block text-sm font-medium text-neutral-700 mb-1">
            Short Description
          </label>
          <textarea
            id="short_description"
            rows={2}
            value={data.short_description}
            onChange={(e) => onChange('short_description', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
            placeholder="Brief overview for product cards"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
            Rich Description
          </label>
          <textarea
            id="description"
            rows={6}
            value={data.description}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
            placeholder="Detailed description of the fragrance notes, ingredients, etc."
          />
        </div>
      </div>
    </div>
  );
};
