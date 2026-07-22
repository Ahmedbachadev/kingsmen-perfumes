import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsToggle } from '../ui/SettingsToggle';
import { SettingsInput } from '../ui/SettingsInput';
import { useSettings } from '../../context/SettingsContext';

export const HomepageSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleToggle = (key: keyof typeof settings.homepage) => {
 updateSettings('homepage', { 
 ...settings.homepage, 
 [key]: !settings.homepage[key] 
 });
 };

 const handleCollectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 updateSettings('homepage', { ...settings.homepage, featuredCollectionId: e.target.value });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Featured Content" 
 description="Select what gets showcased on your storefront's homepage."
 >
 <div className="space-y-6">
 <SettingsInput
 label="Featured Collection ID"
 name="featuredCollectionId"
 value={settings.homepage.featuredCollectionId}
 onChange={handleCollectionChange}
 placeholder="e.g. signature-collection-uuid"
 description="The collection to feature on the homepage."
 />
 
 <div className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 ">
 <h4 className="text-sm font-medium text-neutral-900 mb-2">Featured Products</h4>
 <p className="text-sm text-neutral-500 mb-4">You can feature up to 4 products on the homepage. Edit product settings to mark them as featured.</p>
 {/* Real implementation would have a multi-select or drag/drop of products here */}
 <p className="text-xs text-neutral-400 italic">Select featured products directly from the Products page.</p>
 </div>
 </div>
 </SettingsCard>

 <SettingsCard 
 title="Section Visibility" 
 description="Toggle which sections appear on your homepage."
 >
 <div className="space-y-4">
 <SettingsToggle
 label="Show Featured Collection"
 checked={settings.homepage.showFeaturedCollection}
 onChange={() => handleToggle('showFeaturedCollection')}
 />
 <SettingsToggle
 label="Show Featured Products"
 checked={settings.homepage.showFeaturedProducts}
 onChange={() => handleToggle('showFeaturedProducts')}
 />
 <SettingsToggle
 label="Show Newsletter Signup"
 checked={settings.homepage.showNewsletter}
 onChange={() => handleToggle('showNewsletter')}
 />
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
