import React from 'react';
import { cn } from '../../../utils/cn';
import { 
 Settings, 
 Store, 
 Phone, 
 Share2, 
 Truck, 
 CreditCard, 
 Search, 
 Layout, 
 Bell, 
 Users, 
 Sliders, 
 HardDrive 
} from 'lucide-react';
import { useSettings } from './context/SettingsContext';
import { UnsavedChangesBar } from './components/ui/UnsavedChangesBar';

const TABS = [
 { id: 'general', label: 'General', icon: Settings },
 { id: 'store_info', label: 'Store Information', icon: Store },
 { id: 'contact', label: 'Contact', icon: Phone },
 { id: 'social_media', label: 'Social Media', icon: Share2 },
 { id: 'shipping', label: 'Shipping', icon: Truck },
 { id: 'payments', label: 'Payments', icon: CreditCard },
 { id: 'seo', label: 'SEO', icon: Search },
 { id: 'homepage', label: 'Homepage', icon: Layout },
 { id: 'notifications', label: 'Notifications', icon: Bell },
 { id: 'users', label: 'Users & Roles', icon: Users },
 { id: 'preferences', label: 'Preferences', icon: Sliders },
 { id: 'backup', label: 'Backup', icon: HardDrive },
];

export const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const { activeTab, setActiveTab } = useSettings();

 return (
 <div className="min-h-screen bg-neutral-50 ">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 
 <div className="mb-8">
 <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
 <Settings className="w-6 h-6 text-neutral-500" />
 Store Settings
 </h1>
 <p className="text-sm text-neutral-500 mt-1">
 Global control center for your ecommerce platform.
 </p>
 </div>

 <div className="flex flex-col md:flex-row gap-8">
 {/* Left Navigation */}
 <nav className="w-full md:w-64 flex-shrink-0">
 <div className="space-y-1">
 {TABS.map(tab => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={cn(
 "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left",
 activeTab === tab.id
 ? "bg-neutral-200/50 text-neutral-900 "
 : "text-neutral-600 hover:bg-neutral-100"
 )}
 >
 <tab.icon className="w-4 h-4" />
 {tab.label}
 </button>
 ))}
 </div>
 </nav>

 {/* Main Content Area */}
 <main className="flex-1 min-w-0 pb-24">
 {children}
 </main>
 </div>
 </div>
 
 <UnsavedChangesBar />
 </div>
 );
};
