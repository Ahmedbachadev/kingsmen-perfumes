import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsInput } from '../ui/SettingsInput';
import { useSettings } from '../../context/SettingsContext';

export const SEOSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
 const { name, value } = e.target;
 updateSettings('seo', { ...settings.seo, [name]: value });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Search Engine Optimization" 
 description="Improve how your store appears on Google and other search engines."
 >
 <div className="space-y-4">
 <SettingsInput
 label="Homepage Title"
 name="homepageTitle"
 value={settings.seo.homepageTitle}
 onChange={handleChange}
 placeholder="e.g. Kingsmen | Premium Men's Perfumes"
 />
 
 <div className="w-full">
 <label className="block text-sm font-medium text-neutral-900 mb-1">
 Meta Description
 </label>
 <p className="text-sm text-neutral-500 mb-2">
 A brief description of your store to display in search results.
 </p>
 <textarea
 name="metaDescription"
 value={settings.seo.metaDescription}
 onChange={handleChange}
 rows={3}
 className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black transition-shadow resize-none"
 placeholder="Discover the finest collection of premium perfumes..."
 />
 <div className="mt-1 text-xs text-right text-neutral-400">
 {settings.seo.metaDescription.length} / 160 characters
 </div>
 </div>

 <SettingsInput
 label="Keywords"
 name="keywords"
 value={settings.seo.keywords}
 onChange={handleChange}
 placeholder="perfume, cologne, luxury, men"
 description="Comma separated keywords."
 />
 </div>
 </SettingsCard>

 <SettingsCard 
 title="Social Sharing" 
 description="How your store looks when shared on social media."
 >
 <div className="space-y-4">
 <SettingsInput
 label="Open Graph Image URL"
 name="openGraphImage"
 value={settings.seo.openGraphImage}
 onChange={handleChange}
 placeholder="https://example.com/og-image.jpg"
 description="Displayed when your site is shared on Facebook, LinkedIn, etc. (Recommended: 1200x630)"
 />
 <SettingsInput
 label="Twitter Card Image URL"
 name="twitterCardImage"
 value={settings.seo.twitterCardImage}
 onChange={handleChange}
 placeholder="https://example.com/twitter-card.jpg"
 description="Displayed when your site is shared on X/Twitter."
 />
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
