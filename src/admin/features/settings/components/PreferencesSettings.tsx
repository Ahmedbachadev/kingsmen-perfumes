import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';

export const PreferencesSettings: React.FC = () => {
  const { draftSettings, updateDraft } = useSettingsContext();

  if (!draftSettings) return null;

  const { preferences } = draftSettings;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;
    if (type === 'number') parsedValue = Number(value);
    
    updateDraft('preferences', { ...preferences, [name]: parsedValue });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Store Preferences</h3>
        <p className="text-sm text-neutral-500">Global defaults for the storefront and admin panel.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Low Stock Threshold</label>
            <input
              type="number"
              name="lowStockThreshold"
              value={preferences.lowStockThreshold}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Default Product Status</label>
            <select
              name="defaultProductStatus"
              value={preferences.defaultProductStatus}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            >
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Products Per Page (Pagination)</label>
            <input
              type="number"
              name="productsPerPage"
              value={preferences.productsPerPage}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Default Sort Order</label>
            <select
              name="defaultSortOrder"
              value={preferences.defaultSortOrder}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Admin Theme Preference</label>
          <select
            name="themePreference"
            value={preferences.themePreference}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          >
            <option value="System">System Default</option>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
};
