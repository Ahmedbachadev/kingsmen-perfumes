import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsInput } from '../ui/SettingsInput';
import { SettingsToggle } from '../ui/SettingsToggle';
import { useSettings } from '../../context/SettingsContext';

export const ShippingSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const { name, value, type } = e.target;
 updateSettings('shipping', { 
 ...settings.shipping, 
 [name]: type === 'number' ? Number(value) : value 
 });
 };

 const handleToggle = (checked: boolean) => {
 updateSettings('shipping', { ...settings.shipping, cashOnDelivery: checked });
 };

 const handleRegionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const regions = e.target.value.split(',').map(s => s.trim());
 updateSettings('shipping', { ...settings.shipping, shippingRegions: regions });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Shipping Rates" 
 description="Configure how much you charge for shipping."
 >
 <div className="space-y-4">
 <SettingsInput
 label="Standard Shipping Cost"
 type="number"
 name="shippingCost"
 value={settings.shipping.shippingCost}
 onChange={handleChange}
 placeholder="0.00"
 min="0"
 step="0.01"
 />
 <SettingsInput
 label="Free Shipping Threshold"
 type="number"
 name="freeShippingThreshold"
 value={settings.shipping.freeShippingThreshold}
 onChange={handleChange}
 placeholder="50.00"
 description="Orders over this amount will get free shipping"
 min="0"
 step="0.01"
 />
 </div>
 </SettingsCard>

 <SettingsCard 
 title="Delivery Preferences" 
 description="Set expectations for your customers."
 >
 <div className="space-y-4">
 <SettingsInput
 label="Estimated Delivery Time"
 name="estimatedDeliveryTime"
 value={settings.shipping.estimatedDeliveryTime}
 onChange={handleChange}
 placeholder="e.g. 3-5 Business Days"
 />
 <SettingsInput
 label="Shipping Regions"
 name="shippingRegions"
 value={settings.shipping.shippingRegions.join(', ')}
 onChange={handleRegionsChange}
 placeholder="e.g. US, CA, UK"
 description="Comma-separated country codes where you ship."
 />
 </div>
 </SettingsCard>

 <SettingsCard 
 title="Fulfillment Methods"
 >
 <SettingsToggle
 label="Enable Cash on Delivery (COD)"
 description="Allow customers to pay when the package is delivered."
 checked={settings.shipping.cashOnDelivery}
 onChange={handleToggle}
 />
 </SettingsCard>
 </SettingsSection>
 );
};
