import React from 'react';
import { Mail, Phone, MapPin, Calendar, CreditCard, ShoppingBag } from 'lucide-react';
import type { Customer, CustomerStatus } from '../types/customer';

interface Props {
  customer: Customer;
  onUpdateStatus: (status: CustomerStatus) => Promise<void>;
}

export const CustomerInfoCard: React.FC<Props> = ({ customer, onUpdateStatus }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const aov = customer.total_orders && customer.total_orders > 0 
    ? (customer.total_spent || 0) / customer.total_orders 
    : 0;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xl font-medium shrink-0">
            {getInitials(customer.first_name, customer.last_name)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              {customer.first_name} {customer.last_name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-neutral-500 mt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> {customer.email}
              </span>
              {customer.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" /> {customer.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-500 mb-1 md:text-right">Customer Status</label>
          <select
            value={customer.status}
            onChange={(e) => onUpdateStatus(e.target.value as CustomerStatus)}
            className="border-neutral-300 rounded-lg text-sm focus:ring-neutral-900 focus:border-neutral-900 bg-neutral-50"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-neutral-500 mb-1 text-sm">
            <ShoppingBag className="w-4 h-4" /> Total Orders
          </div>
          <div className="text-xl font-bold text-neutral-900">
            {customer.total_orders || 0}
          </div>
        </div>
        
        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-neutral-500 mb-1 text-sm">
            <CreditCard className="w-4 h-4" /> Total Spent
          </div>
          <div className="text-xl font-bold text-neutral-900">
            {formatCurrency(customer.total_spent || 0)}
          </div>
        </div>

        <div className="bg-neutral-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-neutral-500 mb-1 text-sm">
            <Calendar className="w-4 h-4" /> Average Order Value
          </div>
          <div className="text-xl font-bold text-neutral-900">
            {formatCurrency(aov)}
          </div>
        </div>
      </div>
    </div>
  );
};
