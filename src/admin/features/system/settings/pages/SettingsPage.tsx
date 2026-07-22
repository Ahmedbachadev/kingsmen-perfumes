import React from 'react';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import { SettingsLayout } from '../SettingsLayout';
import { PageLoader } from '../../../../components/shared/PageLoader';

// Sections
import { GeneralSettings } from '../components/sections/GeneralSettings';
import { StoreInfoSettings } from '../components/sections/StoreInfoSettings';
import { ContactSettings } from '../components/sections/ContactSettings';
import { SocialMediaSettings } from '../components/sections/SocialMediaSettings';
import { ShippingSettings } from '../components/sections/ShippingSettings';
import { PaymentSettings } from '../components/sections/PaymentSettings';
import { SEOSettings } from '../components/sections/SEOSettings';
import { HomepageSettings } from '../components/sections/HomepageSettings';
import { NotificationSettings } from '../components/sections/NotificationSettings';
import { UsersAndRolesSettings } from '../components/sections/UsersAndRolesSettings';
import { PreferenceSettings } from '../components/sections/PreferenceSettings';
import { BackupSettings } from '../components/sections/BackupSettings';

const SettingsContent = () => {
 const { activeTab, loading } = useSettings();

 if (loading) {
 return <PageLoader />;
 }

 const renderTab = () => {
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
 case 'users': return <UsersAndRolesSettings />;
 case 'preferences': return <PreferenceSettings />;
 case 'backup': return <BackupSettings />;
 default: return <GeneralSettings />;
 }
 };

 return (
 <SettingsLayout>
 {renderTab()}
 </SettingsLayout>
 );
};

export default function SettingsPage() {
 return (
 <SettingsProvider>
 <SettingsContent />
 </SettingsProvider>
 );
}
