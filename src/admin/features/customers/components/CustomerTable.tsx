import React from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, ExternalLink } from 'lucide-react';
import type { Customer } from '../types/customer';

interface Props {
  customers: Customer[];
  loading: boolean;
}

export const CustomerTable: React.FC<Props> = ({ customers, loading }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">No customers found</h3>
        <p className="text-neutral-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="py-4 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Customer</th>
              <th className="py-4 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Contact</th>
              <th className="py-4 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Orders</th>
              <th className="py-4 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Total Spent</th>
              <th className="py-4 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Last Order</th>
              <th className="py-4 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-neutral-50 transition-colors group">
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium shrink-0">
                      {getInitials(customer.first_name, customer.last_name)}
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">
                        {customer.first_name} {customer.last_name}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {/* Assuming City might be stored or we just show "Customer" */}
                        ID: {customer.id.substring(0, 8)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">{customer.email}</div>
                  <div className="text-sm text-neutral-500">{customer.phone || 'No phone'}</div>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-neutral-900">
                  {customer.total_orders || 0}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-neutral-900">
                  {formatCurrency(customer.total_spent || 0)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-neutral-500">
                  {formatDate(customer.last_order_date)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    customer.status === 'active' ? 'bg-green-100 text-green-800' :
                    customer.status === 'vip' ? 'bg-purple-100 text-purple-800' :
                    'bg-neutral-100 text-neutral-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/admin/customers/${customer.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-900"
                  >
                    View <ExternalLink className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
