import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { CMSAbout as CMSAboutType } from '../types/cms';

interface Props {
  data: CMSAboutType;
  onChange: (data: CMSAboutType) => void;
}

export const CMSAbout: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const addFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      title: 'New Feature',
      description: 'Feature description'
    };
    onChange({
      ...data,
      features: [...data.features, newFeature]
    });
  };

  const removeFeature = (id: string) => {
    onChange({
      ...data,
      features: data.features.filter(f => f.id !== id)
    });
  };

  const handleFeatureChange = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      features: data.features.map(f => f.id === id ? { ...f, [field]: value } : f)
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">About Section</h3>
        <p className="text-sm text-neutral-500 mb-6">Manage the "Kingsmen Difference" section.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Section Title</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 resize-none"
          />
        </div>

        <div className="pt-4 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-neutral-700">Feature Cards</label>
            <button
              type="button"
              onClick={addFeature}
              className="text-xs flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Feature
            </button>
          </div>
          
          <div className="space-y-4">
            {data.features.map((feature, index) => (
              <div key={feature.id} className="p-4 bg-neutral-50 rounded-lg border border-neutral-100 relative group">
                <button
                  type="button"
                  onClick={() => removeFeature(feature.id)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="space-y-4 pr-8">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1">Feature {index + 1} Title</label>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(feature.id, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-neutral-300 rounded focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1">Description</label>
                    <input
                      type="text"
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(feature.id, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-neutral-300 rounded focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={data.buttonText}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Button Link</label>
            <input
              type="text"
              name="buttonLink"
              value={data.buttonLink}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
