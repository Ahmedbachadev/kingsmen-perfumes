import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { EmptyStateCard } from '../../components/layout/EmptyStateCard';

const Newsletter: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Newsletter" 
        description="Manage email subscribers and marketing campaigns."
        breadcrumbs={[{ label: 'Newsletter' }]}
      />
      <EmptyStateCard />
    </div>
  );
};

export default Newsletter;
