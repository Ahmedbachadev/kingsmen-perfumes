import React, { useState, useEffect } from 'react';
import type { ProductFormData } from '../../types/product-form.types';
import { supabase } from '../../../../../../lib/supabase';
import { SettingsToggle } from '../../../../system/settings/components/ui/SettingsToggle';

interface ProductOrganizationSectionProps {
  data: ProductFormData;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
}

export function ProductOrganizationSection({ data, onChange }: ProductOrganizationSectionProps) {
  const [categories, setCategories] = useState<{id: string; name: string}[]>([]);
  const [collections, setCollections] = useState<{id: string; name: string}[]>([]);
  
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    // Load categories and collections
    supabase.from('categories').select('id, name').order('name')
      .then(({ data }) => setCategories(data || []));
      
    supabase.from('collections').select('id, name').order('name')
      .then(({ data }) => setCollections(data || []));
  }, []);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!data.tags.includes(newTag)) {
        onChange('tags', [...data.tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange('tags', data.tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mt-6">
      <h2 className="text-base font-semibold text-slate-900 mb-6">Organization</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Category
          </label>
          <select
            value={data.category_id || ''}
            onChange={(e) => onChange('category_id', e.target.value || null)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out text-sm text-slate-900 appearance-none"
          >
            <option value="">Select a category...</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Collection
          </label>
          <select
            value={data.collection_id || ''}
            onChange={(e) => onChange('collection_id', e.target.value || null)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out text-sm text-slate-900 appearance-none"
          >
            <option value="">Select a collection...</option>
            {collections.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Tags
          </label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type a tag and press Enter..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out text-sm text-slate-900"
          />
          {data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/60 text-xs font-medium text-slate-700">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 hover:text-slate-600">
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-100">
          <SettingsToggle
            checked={data.is_featured}
            onChange={(checked) => onChange('is_featured', checked)}
            label="Featured Product"
            description="Highlight this product on the homepage"
          />
        </div>
      </div>
    </div>
  );
}
