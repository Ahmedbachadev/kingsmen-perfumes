import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { EmptyStateCard } from '../../components/layout/EmptyStateCard';

const Profile: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="My Profile" 
        description="Manage your personal information and security settings."
        breadcrumbs={[{ label: 'Profile' }]}
      />
      <EmptyStateCard />
    </div>
  );
};

export default Profile;
