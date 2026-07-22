import React from 'react';
import type { CollectionInsert, CollectionUpdate } from '../services/collectionService';
import { SettingsToggle } from '../../system/settings/components/ui/SettingsToggle';
import { CollectionImageUploader } from './CollectionImageUploader';
import { CollectionService } from '../services/collectionService';

interface CollectionFormProps {
  data: Partial<CollectionInsert | CollectionUpdate>;
  onChange: (updates: Partial<CollectionInsert | CollectionUpdate>) => void;
  errors?: Record<string, string>;
}

export function CollectionForm({ data, onChange, errors = {} }: CollectionFormProps) {
  const handleThumbnailUpload = async (file: File) => {
    const url = await CollectionService.uploadImage(file, 'collections/thumbnails');
    onChange({ image_url: url });
  };

  const handleBannerUpload = async (file: File) => {
    const url = await CollectionService.uploadImage(file, 'collections/banners');
    onChange({ banner_image_url: url });
  };

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="text-base font-semibold text-slate-900 mb-6">General Information</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Collection Name *
              </label>
              <input
                type="text"
                value={data.name || ''}
                onChange={(e) => {
                  const name = e.target.value;
                  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  onChange({ name, slug });
                }}
                className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.name ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/60 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl transition-all duration-300 ease-out text-sm text-slate-900`}
                placeholder="e.g. Signature Collection"
              />
              {errors.name && <p className="mt-1.5 text-sm text-rose-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                value={data.slug || ''}
                onChange={(e) => onChange({ slug: e.target.value })}
                className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.slug ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/60 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl transition-all duration-300 ease-out text-sm text-slate-900`}
                placeholder="e.g. signature-collection"
              />
              {errors.slug && <p className="mt-1.5 text-sm text-rose-500">{errors.slug}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Short Description
            </label>
            <input
              type="text"
              value={data.short_description || ''}
              onChange={(e) => onChange({ short_description: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out text-sm text-slate-900"
              placeholder="A brief summary for collection cards..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Description
            </label>
            <textarea
              value={data.description || ''}
              onChange={(e) => onChange({ description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out text-sm text-slate-900 resize-y"
              placeholder="Write a compelling story about this collection..."
            />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <h2 className="text-base font-semibold text-slate-900 mb-6">Media</h2>
        
        <div className="space-y-8">
          <CollectionImageUploader
            label="Banner Image"
            description="High-resolution wide image used at the top of the collection page."
            imageUrl={data.banner_image_url || null}
            aspectRatio="banner"
            onUpload={handleBannerUpload}
            onRemove={() => onChange({ banner_image_url: null })}
          />
          
          <div className="border-t border-slate-100"></div>

          <CollectionImageUploader
            label="Thumbnail Image"
            description="Square image used in collection grids and cards."
            imageUrl={data.image_url || null}
            aspectRatio="square"
            onUpload={handleThumbnailUpload}
            onRemove={() => onChange({ image_url: null })}
          />
        </div>
      </div>

      {/* Settings & SEO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] h-fit">
          <h2 className="text-base font-semibold text-slate-900 mb-6">Settings</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
              <select
                value={data.status || 'draft'}
                onChange={(e) => onChange({ status: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 text-sm appearance-none font-medium"
              >
                <option value="draft">Draft</option>
                <option value="active">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="border-t border-slate-100"></div>

            <SettingsToggle
              checked={data.is_featured || false}
              onChange={(checked) => onChange({ is_featured: checked })}
              label="Featured Collection"
              description="Show this collection in special sections like the homepage."
            />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <h2 className="text-base font-semibold text-slate-900 mb-6">Search Engine Optimization</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                SEO Title
              </label>
              <input
                type="text"
                value={data.seo_title || ''}
                onChange={(e) => onChange({ seo_title: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 text-sm"
                placeholder="Leave blank to use Collection Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                SEO Description
              </label>
              <textarea
                value={data.seo_description || ''}
                onChange={(e) => onChange({ seo_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 text-sm resize-y"
                placeholder="Leave blank to use Short Description"
              />
            </div>

            {/* SEO Preview */}
            <div className="mt-4 p-4 border border-slate-200/60 rounded-xl bg-slate-50">
              <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Search Engine Preview</p>
              <h3 className="text-lg text-blue-600 font-medium leading-tight truncate">
                {data.seo_title || data.name || 'Collection Title'}
              </h3>
              <p className="text-sm text-green-700 truncate mb-1">
                kingsmenperfumes.com/collections/{data.slug || 'collection-slug'}
              </p>
              <p className="text-sm text-slate-600 line-clamp-2">
                {data.seo_description || data.short_description || data.description || 'Provide a compelling description to improve click-through rates.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
