import React from 'react';
import type { CMSNewsletter as CMSNewsletterType } from '../types/cms';

interface Props {
  data: CMSNewsletterType;
  onChange: (data: CMSNewsletterType) => void;
}

export const CMSNewsletter: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Newsletter Section</h3>
        <p className="text-sm text-neutral-500 mb-6">Manage the email subscription block.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-6 shadow-sm">
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
          <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Success Message</label>
          <input
            type="text"
            name="successMessage"
            value={data.successMessage}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
          <p className="mt-1 text-xs text-neutral-500">Shown after a user successfully subscribes.</p>
        </div>
      </div>
    </div>
  );
};
