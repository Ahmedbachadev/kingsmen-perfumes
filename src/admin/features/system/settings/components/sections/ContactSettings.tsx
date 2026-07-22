import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsInput } from '../ui/SettingsInput';
import { useSettings } from '../../context/SettingsContext';

export const ContactSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const { name, value } = e.target;
 updateSettings('contact', { ...settings.contact, [name]: value });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Customer Support" 
 description="Information shown to customers for support inquiries."
 >
 <div className="space-y-4">
 <SettingsInput
 label="Support Email"
 type="email"
 name="supportEmail"
 value={settings.contact.supportEmail}
 onChange={handleChange}
 placeholder="support@kingsmen.com"
 />
 <SettingsInput
 label="Support Phone"
 type="tel"
 name="supportPhone"
 value={settings.contact.supportPhone}
 onChange={handleChange}
 placeholder="e.g. 1-800-KINGSMEN"
 />
 <SettingsInput
 label="WhatsApp Number"
 type="tel"
 name="whatsappNumber"
 value={settings.contact.whatsappNumber}
 onChange={handleChange}
 placeholder="Include country code, e.g. +1234567890"
 description="Used for WhatsApp chat widget integration"
 />
 </div>
 </SettingsCard>

 <SettingsCard 
 title="Availability" 
 description="When are you open for business?"
 >
 <div className="space-y-4">
 <SettingsInput
 label="Business Hours"
 name="businessHours"
 value={settings.contact.businessHours}
 onChange={handleChange}
 placeholder="e.g. Mon-Fri 9AM-5PM EST"
 />
 <SettingsInput
 label="Google Maps Embed URL"
 name="googleMapsUrl"
 value={settings.contact.googleMapsUrl}
 onChange={handleChange}
 placeholder="https://www.google.com/maps/embed?..."
 />
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
