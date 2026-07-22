import React from 'react';
import { SettingsSection, SettingsCard } from '../ui/SettingsCard';
import { SettingsToggle } from '../ui/SettingsToggle';
import { useSettings } from '../../context/SettingsContext';
import { CreditCard, Banknote } from 'lucide-react';

export const PaymentSettings: React.FC = () => {
 const { settings, updateSettings } = useSettings();

 if (!settings) return null;

 const handleToggle = (checked: boolean) => {
 updateSettings('payments', { ...settings.payments, cashOnDelivery: checked });
 };

 return (
 <SettingsSection>
 <SettingsCard 
 title="Payment Providers" 
 description="Configure how customers can pay for their orders."
 >
 <div className="space-y-6">
 <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl">
 <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center flex-shrink-0">
 <Banknote className="w-6 h-6 text-neutral-600 " />
 </div>
 <div className="flex-1 min-w-0">
 <h4 className="text-sm font-medium text-neutral-900 ">Cash on Delivery (COD)</h4>
 <p className="text-sm text-neutral-500 truncate">Customers pay when the order arrives.</p>
 </div>
 <div className="flex-shrink-0 pl-4">
 <SettingsToggle
 label=""
 checked={settings.payments.cashOnDelivery}
 onChange={handleToggle}
 />
 </div>
 </div>

 <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl opacity-60">
 <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
 <CreditCard className="w-6 h-6 text-blue-600 " />
 </div>
 <div className="flex-1 min-w-0">
 <h4 className="text-sm font-medium text-neutral-900 flex items-center gap-2">
 Stripe
 <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-neutral-200 rounded-full">Coming Soon</span>
 </h4>
 <p className="text-sm text-neutral-500 truncate">Accept credit cards securely.</p>
 </div>
 <div className="flex-shrink-0 pl-4">
 <button disabled className="px-4 py-2 text-sm font-medium text-neutral-500 bg-neutral-100 rounded-lg cursor-not-allowed">
 Setup
 </button>
 </div>
 </div>
 
 <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-xl opacity-60">
 <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M19.1678 5.75336C18.0673 5.48512 16.8906 5.40578 15.6575 5.5147C14.4244 5.62361 13.1256 5.92209 11.761 6.40924C10.5962 6.82297 9.55928 7.35039 8.65038 7.99127L7.68962 7.03051L6.72886 7.99127L9.61114 10.8735C9.61114 10.8735 9.17066 11.2335 8.78913 11.5367C8.4076 11.8398 7.94589 12.1645 7.40428 12.5106L8.36504 13.4714C8.94828 13.1296 9.47055 12.8093 9.93206 12.5106C10.3936 12.2119 10.8358 11.9054 11.2586 11.591L12.2194 12.5518L11.2586 13.5125C10.963 13.7844 10.6067 14.103 10.1895 14.468C9.77232 14.833 9.27857 15.2289 8.7083 15.6558C8.13803 16.0827 7.55169 16.4952 6.94931 16.8931C6.34693 17.2911 5.71765 17.6599 5.06148 17.9995L6.02224 18.9602C6.91136 18.4984 7.77124 18.0051 8.60193 17.4801C9.43261 16.9551 10.2307 16.403 10.9961 15.8236C11.7615 15.2442 12.5087 14.6548 13.2376 14.0553C13.9665 13.4558 14.658 12.8443 15.312 12.221L16.2728 13.1818C15.932 13.4982 15.6171 13.8052 15.3283 14.103C15.0396 14.4008 14.7706 14.6938 14.5212 14.9818H16.4428L17.4036 14.021C17.6433 13.7813 17.8937 13.5358 18.1546 13.2847C18.4155 13.0336 18.6791 12.7846 18.9452 12.5376C19.2113 12.2906 19.4754 12.0526 19.7375 11.8236C19.9997 11.5946 20.2458 11.3828 20.4759 11.188L21.4367 12.1488C21.0543 12.5029 20.6728 12.8687 20.2921 13.2464C19.9115 13.6241 19.5398 14.0049 19.177 14.3888H21.0986L22.0594 13.428L23.0202 14.3888V13.0304C23.0202 12.4419 22.9038 11.8841 22.671 11.357C22.4382 10.8299 22.1065 10.3547 21.6761 9.93153C21.2457 9.50836 20.7348 9.1627 20.1433 8.89456C19.5518 8.62642 18.9048 8.49235 18.2023 8.49235L19.1678 5.75336Z" fill="#F6C652"/>
 </svg>
 </div>
 <div className="flex-1 min-w-0">
 <h4 className="text-sm font-medium text-neutral-900 flex items-center gap-2">
 PayPal
 <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-neutral-200 rounded-full">Coming Soon</span>
 </h4>
 <p className="text-sm text-neutral-500 truncate">Accept PayPal payments globally.</p>
 </div>
 <div className="flex-shrink-0 pl-4">
 <button disabled className="px-4 py-2 text-sm font-medium text-neutral-500 bg-neutral-100 rounded-lg cursor-not-allowed">
 Setup
 </button>
 </div>
 </div>
 </div>
 </SettingsCard>
 </SettingsSection>
 );
};
