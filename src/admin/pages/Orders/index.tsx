import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { EmptyStateCard } from '../../components/layout/EmptyStateCard';

const Orders: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Orders" 
        description="View and fulfill customer orders, manage returns and refunds."
        breadcrumbs={[{ label: 'Orders' }]}
      />
      <EmptyStateCard />
    </div>
  );
};

export default Orders;
