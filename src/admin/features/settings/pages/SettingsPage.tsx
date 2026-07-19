import React, { useState, useEffect } from 'react';
import { Settings, Info, Phone, Share2, Truck, CreditCard, Search, Layout, Bell, Users, Sliders, HardDrive, Save, RotateCcw } from 'lucide-react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { useSettingsContext, SettingsProvider } from '../contexts/SettingsContext';

// Import all setting section components (we will create these next)
import { GeneralSettings } from '../components/GeneralSettings';
import { StoreInfoSettings } from '../components/StoreInfoSettings';
import { ContactSettings } from '../components/ContactSettings';
import { SocialMediaSettings } from '../components/SocialMediaSettings';
import { ShippingSettings } from '../components/ShippingSettings';
import { PaymentSettings } from '../components/PaymentSettings';
import { SEOSettings } from '../components/SEOSettings';
import { HomepageSettings } from '../components/HomepageSettings';
import { NotificationSettings } from '../components/NotificationSettings';
import { UsersRolesSettings } from '../components/UsersRolesSettings';
import { PreferencesSettings } from '../components/PreferencesSettings';
import { BackupSettings } from '../components/BackupSettings';

const SETTINGS_TABS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'store_info', label: 'Store Information', icon: Info },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'social_media', label: 'Social Media', icon: Share2 },
  { id: 'shipping', label: 'Shipping', icon: Truck },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'homepage', label: 'Homepage', icon: Layout },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'users_roles', label: 'Users & Roles', icon: Users },
  { id: 'preferences', label: 'Preferences', icon: Sliders },
  { id: 'backup', label: 'Backup', icon: HardDrive },
];

export const SettingsPage: React.FC = () => {
  const { isLoading, error, isDirty, draftSettings, saveSettings, resetSettings } = useSettingsContext();
  const [activeTab, setActiveTab] = useState('general');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Prevent leaving if unsaved changes exist (simple implementation)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !draftSettings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <p className="text-red-500 font-medium mb-2">Failed to load settings</p>
        <p className="text-neutral-500 text-sm max-w-md">{error?.message || 'Unknown error occurred.'}</p>
      </div>
    );
  }

  const handleSave = async () => {
    // If the active tab maps to a section (most do), save that section.
    // Except users_roles and backup which might be handled differently or independently.
    try {
      if (activeTab !== 'users_roles' && activeTab !== 'backup') {
        await saveSettings(activeTab as keyof typeof draftSettings);
        setToast({ message: 'Settings saved successfully!', type: 'success' });
      }
    } catch (err) {
      setToast({ message: 'Failed to save settings.', type: 'error' });
    }
    setTimeout(() => setToast(null), 3000);
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />;
      case 'store_info': return <StoreInfoSettings />;
      case 'contact': return <ContactSettings />;
      case 'social_media': return <SocialMediaSettings />;
      case 'shipping': return <ShippingSettings />;
      case 'payments': return <PaymentSettings />;
      case 'seo': return <SEOSettings />;
      case 'homepage': return <HomepageSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'users_roles': return <UsersRolesSettings />;
      case 'preferences': return <PreferencesSettings />;
      case 'backup': return <BackupSettings />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6">
        <PageHeader 
          title="Settings" 
          description="Manage global store configurations and preferences."
          breadcrumbs={[{ label: 'Settings' }]}
        />
        
        {/* Save/Reset Controls */}
        <div className="flex items-center gap-3">
          {isDirty && (
            <button
              onClick={resetSettings}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          )}
          
          <button
            onClick={handleSave}
            disabled={!isDirty || activeTab === 'users_roles' || activeTab === 'backup'}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDirty && activeTab !== 'users_roles' && activeTab !== 'backup'
                ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
                : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-8 overflow-hidden relative">
        {/* Toast Notification */}
        {toast && (
          <div className={`absolute top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {toast.message}
          </div>
        )}

        {/* Sidebar Navigation */}
        <div className="w-64 shrink-0 bg-white rounded-xl border border-neutral-200 shadow-sm p-4 overflow-y-auto custom-scrollbar">
          <nav className="space-y-1">
            {SETTINGS_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (isDirty) {
                      if (!window.confirm('You have unsaved changes. Are you sure you want to switch tabs?')) return;
                      resetSettings();
                    }
                    setActiveTab(tab.id);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-neutral-900 text-white' 
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Editor Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 lg:p-8">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsPageWrapper = () => (
  <SettingsProvider>
    <SettingsPage />
  </SettingsProvider>
);

export default SettingsPageWrapper;
