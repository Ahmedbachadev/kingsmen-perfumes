import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { EmptyStateCard } from '../../components/layout/EmptyStateCard';

const Dashboard: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Overview of your store's performance and recent activity."
        breadcrumbs={[{ label: 'Dashboard' }]}
      />
      <EmptyStateCard />
    </div>
  );
};

export default Dashboard;
