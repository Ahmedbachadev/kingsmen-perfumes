import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsInput } from '../ui/SettingsInput';
import { useSettings } from '../../context/SettingsContext';

export const GeneralSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
 const { name, value } = e.target;
 updateSettings('general', { ...settings.general, [name]: value });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Store Details" 
 description="Your store's basic information."
 >
 <div className="space-y-4">
 <SettingsInput
 label="Store Name"
 name="storeName"
 value={settings.general.storeName}
 onChange={handleChange}
 placeholder="e.g. Kingsmen Perfumes"
 />
 <SettingsInput
 label="Store Description"
 name="storeDescription"
 value={settings.general.storeDescription}
 onChange={handleChange}
 placeholder="Brief description of your store"
 />
 </div>
 </SettingsCard>

 <SettingsCard 
 title="Standards & Formats" 
 description="Used to calculate product prices, shipping weights, and order times."
 >
 <div className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-neutral-900 mb-1">
 Timezone
 </label>
 <select
 name="timezone"
 value={settings.general.timezone}
 onChange={handleChange}
 className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
 >
 <option value="UTC">UTC</option>
 <option value="America/New_York">Eastern Time (ET)</option>
 <option value="America/Chicago">Central Time (CT)</option>
 <option value="America/Denver">Mountain Time (MT)</option>
 <option value="America/Los_Angeles">Pacific Time (PT)</option>
 <option value="Europe/London">London (GMT/BST)</option>
 <option value="Europe/Paris">Central European Time (CET)</option>
 </select>
 </div>
 
 <div>
 <label className="block text-sm font-medium text-neutral-900 mb-1">
 Store Currency
 </label>
 <select
 name="currency"
 value={settings.general.currency}
 onChange={handleChange}
 className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
 >
 <option value="USD">US Dollar (USD)</option>
 <option value="EUR">Euro (EUR)</option>
 <option value="GBP">British Pound (GBP)</option>
 <option value="CAD">Canadian Dollar (CAD)</option>
 <option value="AUD">Australian Dollar (AUD)</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-neutral-900 mb-1">
 Default Language
 </label>
 <select
 name="language"
 value={settings.general.language}
 onChange={handleChange}
 className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
 >
 <option value="en">English</option>
 <option value="fr">French</option>
 <option value="es">Spanish</option>
 <option value="de">German</option>
 </select>
 </div>
 </div>
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
