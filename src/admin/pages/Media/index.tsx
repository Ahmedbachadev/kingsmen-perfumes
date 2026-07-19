import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { EmptyStateCard } from '../../components/layout/EmptyStateCard';

const Media: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Media" 
        description="Manage your product images, videos, and other assets."
        breadcrumbs={[{ label: 'Media' }]}
        action={
          <button className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
            Upload Assets
          </button>
        }
      />
      <EmptyStateCard />
    </div>
  );
};

export default Media;
