import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsInput } from '../ui/SettingsInput';
import { SettingsToggle } from '../ui/SettingsToggle';
import { useSettings } from '../../context/SettingsContext';

const PLATFORMS = [
 { id: 'instagram', label: 'Instagram' },
 { id: 'facebook', label: 'Facebook' },
 { id: 'tiktok', label: 'TikTok' },
 { id: 'youtube', label: 'YouTube' },
 { id: 'linkedin', label: 'LinkedIn' },
 { id: 'twitter', label: 'X (Twitter)' },
] as const;

export const SocialMediaSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleUrlChange = (platform: keyof typeof settings.social_media, url: string) => {
 updateSettings('social_media', {
 ...settings.social_media,
 [platform]: { ...settings.social_media[platform], url }
 });
 };

 const handleVisibleChange = (platform: keyof typeof settings.social_media, visible: boolean) => {
 updateSettings('social_media', {
 ...settings.social_media,
 [platform]: { ...settings.social_media[platform], visible }
 });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Social Profiles" 
 description="Connect your social media accounts to display links in your store's footer."
 >
 <div className="space-y-6">
 {PLATFORMS.map(({ id, label }) => {
 const platformData = settings.social_media[id];
 return (
 <div key={id} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50/50 ">
 <SettingsToggle
 label={`Show ${label} Link`}
 checked={platformData.visible}
 onChange={(checked) => handleVisibleChange(id, checked)}
 />
 
 {platformData.visible && (
 <div className="mt-4 pt-4 border-t border-neutral-200 ">
 <SettingsInput
 label={`${label} URL`}
 name={`${id}-url`}
 value={platformData.url}
 onChange={(e) => handleUrlChange(id, e.target.value)}
 placeholder={`https://${id}.com/yourhandle`}
 />
 </div>
 )}
 </div>
 );
 })}
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
