import React from 'react';
import type { CMSHero as CMSHeroType } from '../types/cms';

interface Props {
  data: CMSHeroType;
  onChange: (data: CMSHeroType) => void;
}

export const CMSHero: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    onChange({
      ...data,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Hero Section</h3>
        <p className="text-sm text-neutral-500 mb-6">Manage the main landing area of the homepage.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-neutral-700">Visibility</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="isVisible"
              checked={data.isVisible} 
              onChange={handleChange}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-900"></div>
            <span className="ml-3 text-sm font-medium text-neutral-600">
              {data.isVisible ? 'Visible' : 'Hidden'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Subtitle</label>
            <textarea
              name="subtitle"
              value={data.subtitle}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-neutral-50 rounded-lg border border-neutral-100">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Primary Button Text</label>
              <input
                type="text"
                name="primaryButtonText"
                value={data.primaryButtonText}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Primary Button Link</label>
              <input
                type="text"
                name="primaryButtonLink"
                value={data.primaryButtonLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-neutral-50 rounded-lg border border-neutral-100">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Secondary Button Text</label>
              <input
                type="text"
                name="secondaryButtonText"
                value={data.secondaryButtonText}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Secondary Button Link</label>
              <input
                type="text"
                name="secondaryButtonLink"
                value={data.secondaryButtonLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
