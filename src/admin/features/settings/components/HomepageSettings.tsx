import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';

export const HomepageSettings: React.FC = () => {
  const { draftSettings, updateDraft } = useSettingsContext();

  if (!draftSettings) return null;

  const { homepage } = draftSettings;

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateDraft('homepage', { ...homepage, [name]: checked });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateDraft('homepage', { ...homepage, [name]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Homepage Structure</h3>
        <p className="text-sm text-neutral-500">Manage what sections are visible on the store homepage.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Featured Collection</label>
          <select
            name="featuredCollectionId"
            value={homepage.featuredCollectionId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          >
            <option value="">Select a Collection (Coming Soon)</option>
            {/* Populate with actual collections if integrated */}
          </select>
        </div>

        <div className="pt-4 border-t border-neutral-200">
          <h4 className="text-sm font-medium text-neutral-900 mb-3">Section Visibility Toggles</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {[
              { name: 'showHero', label: 'Hero Banner' },
              { name: 'showSignature', label: 'Signature Collection' },
              { name: 'showGentlemen', label: 'Gentlemen Collection' },
              { name: 'showLadies', label: 'Ladies Collection' },
              { name: 'showUnisex', label: 'Unisex Collection' },
              { name: 'showFAQ', label: 'FAQ Section' },
              { name: 'showNewsletter', label: 'Newsletter Signup' },
            ].map((toggle) => (
              <label key={toggle.name} className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">{toggle.label}</span>
                <div className="relative inline-flex items-center">
                  <input 
                    type="checkbox" 
                    name={toggle.name}
                    checked={(homepage as any)[toggle.name]} 
                    onChange={handleToggle}
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-900"></div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
