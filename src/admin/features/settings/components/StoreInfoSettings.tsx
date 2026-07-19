import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';

export const StoreInfoSettings: React.FC = () => {
  const { draftSettings, updateDraft } = useSettingsContext();

  if (!draftSettings) return null;

  const { store_info } = draftSettings;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateDraft('store_info', { ...store_info, [name]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Store Information</h3>
        <p className="text-sm text-neutral-500">Official business details and legal information.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={store_info.businessName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={store_info.ownerName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Business Email</label>
            <input
              type="email"
              name="businessEmail"
              value={store_info.businessEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={store_info.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Business Address</label>
          <textarea
            name="businessAddress"
            value={store_info.businessAddress}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
