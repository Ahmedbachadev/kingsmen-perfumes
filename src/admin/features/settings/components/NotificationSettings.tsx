import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';

export const NotificationSettings: React.FC = () => {
  const { draftSettings, updateDraft } = useSettingsContext();

  if (!draftSettings) return null;

  const { notifications } = draftSettings;

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateDraft('notifications', { ...notifications, [name]: checked });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Email & System Notifications</h3>
        <p className="text-sm text-neutral-500">Configure what triggers an alert for store administrators.</p>
      </div>

      <div className="space-y-4">
        {[
          { name: 'emailNotifications', label: 'Enable Email Notifications', desc: 'Global toggle for all outbound administrative emails.' },
          { name: 'newOrderAlerts', label: 'New Order Alerts', desc: 'Receive an email whenever a new order is placed.' },
          { name: 'lowStockAlerts', label: 'Low Stock Alerts', desc: 'Get notified when a product drops below the stock threshold.' },
          { name: 'newsletterAlerts', label: 'Newsletter Signups', desc: 'Daily summary of new newsletter subscribers.' },
        ].map((toggle) => (
          <div key={toggle.name} className="flex items-start justify-between p-4 rounded-lg border border-neutral-200 bg-white">
            <div className="pr-4">
              <span className="block text-sm font-medium text-neutral-900 mb-1">{toggle.label}</span>
              <span className="block text-xs text-neutral-500">{toggle.desc}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input 
                type="checkbox" 
                name={toggle.name}
                checked={(notifications as any)[toggle.name]} 
                onChange={handleToggle}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-900"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
