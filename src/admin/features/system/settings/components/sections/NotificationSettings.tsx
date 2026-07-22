import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsToggle } from '../ui/SettingsToggle';
import { useSettings } from '../../context/SettingsContext';

export const NotificationSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleToggle = (key: keyof typeof settings.notifications) => {
 updateSettings('notifications', { 
 ...settings.notifications, 
 [key]: !settings.notifications[key] 
 });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Admin Alerts" 
 description="Choose which events trigger an alert in your admin dashboard or email."
 >
 <div className="space-y-4">
 <SettingsToggle
 label="Email Notifications"
 description="Receive daily summaries of your store's performance via email."
 checked={settings.notifications.emailNotifications}
 onChange={() => handleToggle('emailNotifications')}
 />
 <SettingsToggle
 label="New Order Alerts"
 description="Get notified immediately when a new order is placed."
 checked={settings.notifications.newOrderAlerts}
 onChange={() => handleToggle('newOrderAlerts')}
 />
 <SettingsToggle
 label="Low Stock Alerts"
 description="Get notified when a product falls below the low stock threshold."
 checked={settings.notifications.lowStockAlerts}
 onChange={() => handleToggle('lowStockAlerts')}
 />
 <SettingsToggle
 label="Newsletter Subscriber Alerts"
 description="Get notified when someone signs up for your newsletter."
 checked={settings.notifications.newsletterAlerts}
 onChange={() => handleToggle('newsletterAlerts')}
 />
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
