import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { EmptyStateCard } from '../../components/layout/EmptyStateCard';

const Collections: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Collections" 
        description="Group products into categories and curated collections."
        breadcrumbs={[{ label: 'Collections' }]}
        action={
          <button className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
            Create Collection
          </button>
        }
      />
      <EmptyStateCard />
    </div>
  );
};

export default Collections;
