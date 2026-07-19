import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';

export const ContactSettings: React.FC = () => {
  const { draftSettings, updateDraft } = useSettingsContext();

  if (!draftSettings) return null;

  const { contact } = draftSettings;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateDraft('contact', { ...contact, [name]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Contact Information</h3>
        <p className="text-sm text-neutral-500">How customers can reach out to your support team.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Support Email</label>
            <input
              type="email"
              name="supportEmail"
              value={contact.supportEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Support Phone</label>
            <input
              type="text"
              name="supportPhone"
              value={contact.supportPhone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">WhatsApp Number</label>
            <input
              type="text"
              name="whatsappNumber"
              value={contact.whatsappNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Business Hours</label>
            <input
              type="text"
              name="businessHours"
              value={contact.businessHours}
              onChange={handleChange}
              placeholder="e.g. Mon-Fri, 9am-6pm"
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Google Maps URL</label>
          <input
            type="url"
            name="googleMapsUrl"
            value={contact.googleMapsUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
        </div>
      </div>
    </div>
  );
};
