import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsInput } from '../ui/SettingsInput';
import { useSettings } from '../../context/SettingsContext';
import { Moon, Sun, Laptop } from 'lucide-react';
import { cn } from '../../../../../utils/cn';

export const PreferenceSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
 const { name, value, type } = e.target;
 updateSettings('preferences', { 
 ...settings.preferences, 
 [name]: type === 'number' ? Number(value) : value 
 });
 };

 const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
 updateSettings('preferences', { ...settings.preferences, themePreference: theme });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Admin Interface" 
 description="Customize how the admin dashboard looks and feels."
 >
 <div>
 <label className="block text-sm font-medium text-neutral-900 mb-3">
 Theme Preference
 </label>
 <div className="grid grid-cols-3 gap-4">
 {[
 { id: 'light', label: 'Light', icon: Sun },
 { id: 'dark', label: 'Dark', icon: Moon },
 { id: 'system', label: 'System', icon: Laptop },
 ].map(theme => (
 <button
 key={theme.id}
 onClick={() => handleThemeChange(theme.id as any)}
 className={cn(
 "flex flex-col items-center justify-center p-4 border rounded-xl transition-all",
 settings.preferences.themePreference === theme.id
 ? "border-black bg-neutral-50 "
 : "border-neutral-200 hover:border-neutral-300"
 )}
 >
 <theme.icon className={cn(
 "w-6 h-6 mb-2",
 settings.preferences.themePreference === theme.id
 ? "text-neutral-900 "
 : "text-neutral-500"
 )} />
 <span className={cn(
 "text-sm font-medium",
 settings.preferences.themePreference === theme.id
 ? "text-neutral-900 "
 : "text-neutral-500"
 )}>{theme.label}</span>
 </button>
 ))}
 </div>
 </div>
 </SettingsCard>

 <SettingsCard 
 title="Store Operations" 
 description="Default behaviors for products and inventory."
 >
 <div className="space-y-6">
 <SettingsInput
 label="Low Stock Threshold"
 type="number"
 name="lowStockThreshold"
 value={settings.preferences.lowStockThreshold}
 onChange={handleChange}
 min="0"
 description="Trigger an alert when a product's inventory falls below this number."
 />
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-neutral-900 mb-1">
 Default Product Status
 </label>
 <select
 name="defaultProductStatus"
 value={settings.preferences.defaultProductStatus}
 onChange={handleChange}
 className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
 >
 <option value="draft">Draft (Hidden)</option>
 <option value="active">Active (Visible)</option>
 </select>
 </div>
 
 <div>
 <label className="block text-sm font-medium text-neutral-900 mb-1">
 Products Per Page
 </label>
 <select
 name="productsPerPage"
 value={settings.preferences.productsPerPage}
 onChange={handleChange}
 className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
 >
 <option value="12">12 Items</option>
 <option value="24">24 Items</option>
 <option value="48">48 Items</option>
 </select>
 </div>
 </div>
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
