<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate, useBlocker } from 'react-router-dom';
import { Save, X, Plus } from 'lucide-react';
import type { CollectionFormData, ValidationErrors } from '../validation/collectionSchema';
import { CollectionBannerUploader } from './CollectionBannerUploader';
import { CollectionProductSorter } from './CollectionProductSorter';
import { CollectionProductSelector } from './CollectionProductSelector';

export const initialFormData: CollectionFormData = {
  name: '',
  slug: '',
  description: '',
  banner: '',
  featured_image: '',
  status: 'draft',
  sort_order: '0',
  featured: false,
  seo_title: '',
  seo_description: '',
};

interface Props {
  initialData?: CollectionFormData;
  collectionId?: string; // required for product assigning if editing
  onSubmit: (data: CollectionFormData) => Promise<boolean>;
  loading: boolean;
  errors: ValidationErrors;
  serverError: string | null;
}

export const CollectionForm: React.FC<Props> = ({
  initialData,
  collectionId,
  onSubmit,
  loading,
  errors,
  serverError,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CollectionFormData>(initialFormData);
  const [isDirty, setIsDirty] = useState(false);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [refreshSorter, setRefreshSorter] = useState(0);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsDirty(false);
    }
  }, [initialData]);

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  const handleChange = (field: keyof CollectionFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const success = await onSubmit(formData);
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
        navigate('/admin/collections');
      }
    } else {
      navigate('/admin/collections');
    }
  };

  return (
    <div className="pb-24 relative">
      {blocker.state === 'blocked' && (
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
      )}

      {serverError && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">General Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Collection Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    handleChange('name', e.target.value);
                    if (!initialData) {
                      handleChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
                    }
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 ${errors.name ? 'border-red-300' : 'border-neutral-300'}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 ${errors.slug ? 'border-red-300' : 'border-neutral-300'}`}
                />
                {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-y"
                />
              </div>
            </div>
          </div>

          {/* Products (Only when Editing) */}
          {collectionId && (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-neutral-900">Products</h2>
                  <p className="mt-1 text-sm text-neutral-500">Assign products and drag to reorder.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProductSelector(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Products
                </button>
              </div>

              <CollectionProductSorter 
                collectionId={collectionId} 
                refreshTrigger={refreshSorter} 
              />
            </div>
          )}

          {/* Media */}
          <CollectionBannerUploader 
            bannerUrl={formData.banner}
            thumbnailUrl={formData.featured_image}
            onChange={(field, url) => handleChange(field, url)}
          />

          {/* SEO */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Search Engine Optimization</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">SEO Title</label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={(e) => handleChange('seo_title', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">SEO Description</label>
                <textarea
                  rows={3}
                  value={formData.seo_description}
                  onChange={(e) => handleChange('seo_description', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-y"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Organization</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Display Order *</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => handleChange('sort_order', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 ${errors.sort_order ? 'border-red-300' : 'border-neutral-300'}`}
                />
                {errors.sort_order && <p className="mt-1 text-sm text-red-600">{errors.sort_order}</p>}
                <p className="mt-1 text-xs text-neutral-500">Lower numbers appear first.</p>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <div>
                    <span className="block text-sm font-medium text-neutral-900">Featured Collection</span>
                    <span className="block text-xs text-neutral-500">Show on the homepage</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

      </form>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-neutral-200 p-4 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          
          <button
            type="button"
            disabled={loading}
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 shadow-sm"
          >
            <Save className="w-4 h-4" /> 
            {loading ? 'Saving...' : 'Save Collection'}
          </button>
        </div>
      </div>

      {showProductSelector && collectionId && (
        <CollectionProductSelector
          collectionId={collectionId}
          onAssigned={() => setRefreshSorter(prev => prev + 1)}
          onClose={() => setShowProductSelector(false)}
        />
      )}
    </div>
  );
};
=======
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
>>>>>>> 3fef0dc (production ready version with admin panel)
