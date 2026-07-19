import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { EmptyStateCard } from '../../components/layout/EmptyStateCard';

const Settings: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Settings" 
        description="Configure your store, payments, shipping, and more."
        breadcrumbs={[{ label: 'Settings' }]}
      />
      <EmptyStateCard />
    </div>
  );
};

export default Settings;
