import React from 'react';
import type { CMSFooter as CMSFooterType } from '../types/cms';

interface Props {
  data: CMSFooterType;
  onChange: (data: CMSFooterType) => void;
}

export const CMSFooter: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      socialLinks: {
        ...data.socialLinks,
        [name]: value
      }
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Footer Section</h3>
        <p className="text-sm text-neutral-500 mb-6">Manage company contact info and social links.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-6 shadow-sm">
        <h4 className="font-medium text-neutral-900 border-b border-neutral-100 pb-2">Contact Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={data.companyName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Copyright Text</label>
            <input
              type="text"
              name="copyright"
              value={data.copyright}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Physical Address</label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
            />
          </div>
        </div>

        <h4 className="font-medium text-neutral-900 border-b border-neutral-100 pb-2 mt-8">Social Links</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(data.socialLinks).map(([platform, url]) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-neutral-700 mb-2 capitalize">{platform}</label>
              <input
                type="url"
                name={platform}
                value={url}
                onChange={handleSocialChange}
                placeholder={`https://${platform}.com/...`}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
