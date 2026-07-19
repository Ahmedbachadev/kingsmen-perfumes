import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../../../components/layout/PageHeader';
import { useCustomerProfile } from '../hooks/useCustomerProfile';
import { CustomerInfoCard } from '../components/CustomerInfoCard';
import { CustomerAddresses } from '../components/CustomerAddresses';
import { CustomerOrderHistory } from '../components/CustomerOrderHistory';
import { CustomerNotes } from '../components/CustomerNotes';

const CustomerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { customer, loading, error, updateNotes, savingNotes, updateStatus } = useCustomerProfile(id!);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto pb-12 flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="max-w-7xl mx-auto pb-12">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 mt-8">
          <h3 className="text-lg font-bold mb-2">Error loading customer</h3>
          <p>{error || 'Customer not found.'}</p>
          <Link to="/admin/customers" className="inline-block mt-4 text-red-700 underline">
            Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <PageHeader 
        title={`${customer.first_name} ${customer.last_name}`}
        breadcrumbs={[
          { label: 'Customers', path: '/admin/customers' },
          { label: 'Profile' }
        ]}
      />

      <div className="space-y-6">
        {/* Top Info Section */}
        <CustomerInfoCard customer={customer} onUpdateStatus={updateStatus} />

        {/* Middle Section: Notes & Addresses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="h-full">
            <CustomerNotes 
              notes={customer.notes} 
              onSave={updateNotes} 
              saving={savingNotes} 
            />
          </div>
          <CustomerAddresses addresses={customer.addresses} />
        </div>

        {/* Bottom Section: Order History */}
        <CustomerOrderHistory orders={customer.orders} />
      </div>
    </div>
  );
};

export default CustomerProfilePage;
