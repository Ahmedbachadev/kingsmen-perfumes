import React from 'react';
import type { CMSCollection } from '../types/cms';

interface Props {
  data: Record<string, CMSCollection>;
  onChange: (data: Record<string, CMSCollection>) => void;
}

export const CMSCollections: React.FC<Props> = ({ data, onChange }) => {
  const collections = Object.values(data);

  const handleCollectionChange = (id: string, field: string, value: string | boolean) => {
    onChange({
      ...data,
      [id]: {
        ...data[id],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Homepage Collections</h3>
        <p className="text-sm text-neutral-500 mb-6">Manage the collection blocks on the homepage.</p>
      </div>

      <div className="space-y-6">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
              <h4 className="text-base font-bold text-neutral-900 capitalize">{collection.id} Collection</h4>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={collection.isVisible} 
                  onChange={(e) => handleCollectionChange(collection.id, 'isVisible', e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-900"></div>
                <span className="ml-2 text-xs font-medium text-neutral-600">
                  {collection.isVisible ? 'Visible' : 'Hidden'}
                </span>
              </label>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity ${collection.isVisible ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={collection.title}
                    onChange={(e) => handleCollectionChange(collection.id, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                  <textarea
                    value={collection.description}
                    onChange={(e) => handleCollectionChange(collection.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={collection.buttonText}
                    onChange={(e) => handleCollectionChange(collection.id, 'buttonText', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={collection.buttonLink}
                    onChange={(e) => handleCollectionChange(collection.id, 'buttonLink', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
