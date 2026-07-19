import React from 'react';
import type { Customer, CustomerAddress } from '../types/order';
import { User, Mail, Phone, MapPin } from 'lucide-react';

interface Props {
  customer?: Customer;
  shippingAddress?: CustomerAddress;
  billingAddress?: CustomerAddress;
}

export const CustomerCard: React.FC<Props> = ({ customer, shippingAddress, billingAddress }) => {
  if (!customer) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 className="text-base font-semibold text-neutral-900 mb-6">Customer Details</h2>
        <div className="flex items-center gap-3 text-neutral-500">
          <User className="w-5 h-5" />
          <span className="text-sm">Guest Customer</span>
        </div>
      </div>
    );
  }

  const formatAddress = (addr?: CustomerAddress) => {
    if (!addr) return null;
    return (
      <div className="text-sm text-neutral-600 space-y-1 mt-2">
        <p>{addr.first_name} {addr.last_name}</p>
        {addr.company && <p>{addr.company}</p>}
        <p>{addr.address1}</p>
        {addr.address2 && <p>{addr.address2}</p>}
        <p>{addr.city}, {addr.province} {addr.postal_code}</p>
        <p>{addr.country}</p>
        {addr.phone && <p>{addr.phone}</p>}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-neutral-900">Customer Details</h2>
      </div>

      <div className="space-y-6">
        {/* Contact Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <User className="w-4 h-4 text-neutral-400" />
            <span className="text-sm font-medium text-neutral-900">
              {customer.first_name} {customer.last_name}
            </span>
          </div>
          {customer.email && (
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-4 h-4 text-neutral-400" />
              <a href={`mailto:${customer.email}`} className="text-sm text-blue-600 hover:underline">
                {customer.email}
              </a>
            </div>
          )}
          {customer.phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-neutral-400" />
              <a href={`tel:${customer.phone}`} className="text-sm text-neutral-600 hover:text-neutral-900">
                {customer.phone}
              </a>
            </div>
          )}
        </div>

        {/* Shipping Address */}
        {shippingAddress && (
          <div className="pt-6 border-t border-neutral-100">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-neutral-400" />
              <h3 className="text-sm font-medium text-neutral-900">Shipping Address</h3>
            </div>
            {formatAddress(shippingAddress)}
          </div>
        )}

        {/* Billing Address */}
        {billingAddress && (
          <div className="pt-6 border-t border-neutral-100">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-neutral-400" />
              <h3 className="text-sm font-medium text-neutral-900">Billing Address</h3>
            </div>
            {shippingAddress?.id === billingAddress?.id ? (
              <p className="text-sm text-neutral-500 mt-2">Same as shipping address</p>
            ) : (
              formatAddress(billingAddress)
            )}
          </div>
        )}
      </div>
    </div>
  );
};
