import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';

export const SocialMediaSettings: React.FC = () => {
  const { draftSettings, updateDraft } = useSettingsContext();

  if (!draftSettings) return null;

  const { social_media } = draftSettings;

  const handleChange = (index: number, field: string, value: string | boolean) => {
    const updated = [...social_media];
    updated[index] = { ...updated[index], [field]: value };
    updateDraft('social_media', updated);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Social Media Profiles</h3>
        <p className="text-sm text-neutral-500">Manage links to your social media accounts and their visibility on the storefront.</p>
      </div>

      <div className="space-y-4">
        {social_media.map((platform, index) => (
          <div key={platform.platform} className="flex items-center gap-4 bg-neutral-50 p-4 rounded-lg border border-neutral-200">
            <div className="w-32 shrink-0 font-medium text-sm text-neutral-700">
              {platform.platform}
            </div>
            <div className="flex-1">
              <input
                type="url"
                value={platform.url}
                onChange={(e) => handleChange(index, 'url', e.target.value)}
                placeholder={`https://${platform.platform.toLowerCase().replace(' ', '')}.com/yourhandle`}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 text-sm"
              />
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={platform.isVisible} 
                  onChange={(e) => handleChange(index, 'isVisible', e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-900"></div>
              </label>
              <span className="text-xs text-neutral-500 w-12">{platform.isVisible ? 'Visible' : 'Hidden'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
