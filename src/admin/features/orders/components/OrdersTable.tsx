import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Archive, ShoppingBag } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { PaymentBadge } from './PaymentBadge';
import { FulfillmentBadge } from './FulfillmentBadge';
import type { Order } from '../types/order';

interface Props {
  orders: Order[];
  onArchive: (id: string) => void;
}

export const OrdersTable: React.FC<Props> = ({ orders, onArchive }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-neutral-200">
        <ShoppingBag className="mx-auto h-12 w-12 text-neutral-300" />
        <h3 className="mt-2 text-sm font-semibold text-neutral-900">No orders found</h3>
        <p className="mt-1 text-sm text-neutral-500">Wait for customers to place orders.</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Fulfillment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors group">
                  <td className="px-6 py-4">
                    <Link 
                      to={`/admin/orders/${order.id}`}
                      className="font-medium text-neutral-900 hover:text-neutral-600"
                    >
                      {order.order_number}
                    </Link>
                    <p className="text-xs text-neutral-500 mt-1">{formatDate(order.created_at)}</p>
                  </td>
                  <td className="px-6 py-4">
                    {order.customer ? (
                      <div>
                        <p className="font-medium text-neutral-900">
                          {order.customer.first_name} {order.customer.last_name}
                        </p>
                        <p className="text-xs text-neutral-500">{order.customer.email}</p>
                      </div>
                    ) : (
                      <span className="text-neutral-400">Guest</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {order.items?.length || 0} items
                  </td>
                  <td className="px-6 py-4">
                    <PaymentBadge status={order.payment_status} />
                  </td>
                  <td className="px-6 py-4">
                    <FulfillmentBadge status={order.fulfillment_status} />
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      {order.status !== 'archived' && (
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to archive this order?')) {
                              onArchive(order.id);
                            }
                          }}
                          className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                          title="Archive"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <Link 
                to={`/admin/orders/${order.id}`}
                className="font-medium text-neutral-900 hover:text-neutral-600"
              >
                {order.order_number}
              </Link>
              <span className="font-medium text-neutral-900">{formatCurrency(order.total)}</span>
            </div>
            
            <div className="mb-3">
              {order.customer ? (
                <p className="text-sm text-neutral-900">{order.customer.first_name} {order.customer.last_name}</p>
              ) : (
                <p className="text-sm text-neutral-500">Guest</p>
              )}
              <p className="text-xs text-neutral-500">{formatDate(order.created_at)}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <OrderStatusBadge status={order.status} />
              <PaymentBadge status={order.payment_status} />
              <FulfillmentBadge status={order.fulfillment_status} />
            </div>
            
            <div className="pt-3 border-t border-neutral-100 flex justify-between items-center">
              <span className="text-sm text-neutral-500">{order.items?.length || 0} items</span>
              <div className="flex gap-2">
                <Link
                  to={`/admin/orders/${order.id}`}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-50 rounded hover:bg-neutral-100"
                >
                  <Eye className="w-4 h-4" /> View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
