import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import type { Order } from '../services/orderService';

interface CustomerCardProps {
  order: Order;
}

export function CustomerCard({ order }: CustomerCardProps) {
  // Safe parsing for addresses
  const shippingAddress = order.shipping_address as any || {};
  const billingAddress = order.billing_address as any || {};

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-200/60 bg-slate-50/50">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <User className="w-4 h-4 text-slate-500" />
          Customer Information
        </h3>
      </div>
      
      <div className="p-4 flex-1 flex flex-col gap-6 text-sm">
        {/* Contact Info */}
        <div>
          <div className="font-medium text-slate-900 mb-2">{order.customer_name}</div>
          <div className="flex flex-col gap-2 text-slate-600">
            <a href={`mailto:${order.customer_email}`} className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
              <Mail className="w-4 h-4 text-slate-400" />
              {order.customer_email}
            </a>
            {order.customer_phone && (
              <a href={`tel:${order.customer_phone}`} className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <Phone className="w-4 h-4 text-slate-400" />
                {order.customer_phone}
              </a>
            )}
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
            <MapPin className="w-3.5 h-3.5" /> Shipping Address
          </h4>
          <div className="text-slate-600 pl-5.5 leading-relaxed">
            {shippingAddress.line1} <br />
            {shippingAddress.line2 && <>{shippingAddress.line2} <br /></>}
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code} <br />
            {shippingAddress.country}
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
            <MapPin className="w-3.5 h-3.5" /> Billing Address
          </h4>
          <div className="text-slate-600 pl-5.5 leading-relaxed">
            {billingAddress.line1} <br />
            {billingAddress.line2 && <>{billingAddress.line2} <br /></>}
            {billingAddress.city}, {billingAddress.state} {billingAddress.postal_code} <br />
            {billingAddress.country}
          </div>
        </div>
      </div>
    </div>
  );
}
