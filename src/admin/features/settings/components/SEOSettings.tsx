import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';

export const SEOSettings: React.FC = () => {
  const { draftSettings, updateDraft } = useSettingsContext();

  if (!draftSettings) return null;

  const { seo } = draftSettings;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateDraft('seo', { ...seo, [name]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Search Engine Optimization</h3>
        <p className="text-sm text-neutral-500">Manage global SEO meta tags to improve your store's visibility.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Global Homepage Title</label>
          <input
            type="text"
            name="homepageTitle"
            value={seo.homepageTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Global Meta Description</label>
          <textarea
            name="metaDescription"
            value={seo.metaDescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Keywords</label>
          <input
            type="text"
            name="keywords"
            value={seo.keywords}
            onChange={handleChange}
            placeholder="e.g. perfume, fragrance, kingsmen"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
        </div>
      </div>
    </div>
  );
};
