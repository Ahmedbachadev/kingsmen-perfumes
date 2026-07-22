import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsInput } from '../ui/SettingsInput';
import { useSettings } from '../../context/SettingsContext';

export const StoreInfoSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const { name, value } = e.target;
 updateSettings('store_info', { ...settings.store_info, [name]: value });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Business Profile" 
 description="Public information about your company."
 >
 <div className="space-y-4">
 <SettingsInput
 label="Business Name"
 name="businessName"
 value={settings.store_info.businessName}
 onChange={handleChange}
 placeholder="Official company name"
 />
 <SettingsInput
 label="Owner Name"
 name="ownerName"
 value={settings.store_info.ownerName}
 onChange={handleChange}
 placeholder="Name of the primary contact"
 />
 </div>
 </SettingsCard>

 <SettingsCard 
 title="Contact Details" 
 description="How customers and partners can reach the business officially."
 >
 <div className="space-y-4">
 <SettingsInput
 label="Business Email"
 type="email"
 name="businessEmail"
 value={settings.store_info.businessEmail}
 onChange={handleChange}
 placeholder="business@example.com"
 />
 <SettingsInput
 label="Phone Number"
 type="tel"
 name="phoneNumber"
 value={settings.store_info.phoneNumber}
 onChange={handleChange}
 placeholder="+1 (555) 000-0000"
 />
 <SettingsInput
 label="Business Address"
 name="businessAddress"
 value={settings.store_info.businessAddress}
 onChange={handleChange}
 placeholder="123 Commerce St, City, Country"
 />
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
