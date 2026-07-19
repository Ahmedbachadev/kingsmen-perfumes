import React from 'react';
import type { CMSSeo as CMSSeoType } from '../types/cms';

interface Props {
  data: CMSSeoType;
  onChange: (data: CMSSeoType) => void;
}

export const CMSSeo: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Search Engine Optimization</h3>
        <p className="text-sm text-neutral-500 mb-6">Manage global SEO settings for the homepage.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Homepage Title</label>
          <input
            type="text"
            name="homepageTitle"
            value={data.homepageTitle}
            onChange={handleChange}
            placeholder="Kingsmen Perfumes | True Luxury"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
          <p className="mt-1 text-xs text-neutral-500">The title tag shown in search engine results and browser tabs.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Meta Description</label>
          <textarea
            name="metaDescription"
            value={data.metaDescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 resize-none"
          />
          <p className="mt-1 text-xs text-neutral-500">Ideal length is 150-160 characters.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Keywords</label>
          <input
            type="text"
            name="keywords"
            value={data.keywords}
            onChange={handleChange}
            placeholder="luxury perfumes, extrait de parfum..."
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
          <p className="mt-1 text-xs text-neutral-500">Comma-separated list of relevant keywords.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">OG Image URL</label>
          <input
            type="text"
            name="ogImage"
            value={data.ogImage}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
          <p className="mt-1 text-xs text-neutral-500">Image shown when sharing the link on social media (Facebook, Twitter, LinkedIn).</p>
        </div>
      </div>
    </div>
  );
};
