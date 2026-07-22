import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Clock } from 'lucide-react';
import { OrderStatusBadge } from './OrderStatusBadge';
import { PaymentBadge } from './PaymentBadge';
import { FulfillmentBadge } from './FulfillmentBadge';
import { formatCurrency, formatDate } from '../../../../../utils/format';

interface OrdersTableProps {
  orders: any[];
  isLoading: boolean;
}

export function OrdersTable({ orders, isLoading }: OrdersTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="p-12 flex flex-col items-center justify-center text-slate-400">
          <Clock className="w-8 h-8 mb-4 animate-spin" />
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col items-center justify-center p-12 text-slate-500">
        <p className="text-lg font-medium text-slate-900 mb-1">No orders found</p>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200/60 text-slate-600 font-medium">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Fulfillment</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="font-medium text-slate-900">{order.order_number}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {formatDate(order.created_at)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{order.customer_name}</span>
                    <span className="text-slate-500 text-xs">{order.customer_email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <OrderStatusBadge status={order.order_status} />
                </td>
                <td className="px-6 py-4">
                  <PaymentBadge status={order.payment_status} />
                </td>
                <td className="px-6 py-4">
                  <FulfillmentBadge status={order.fulfillment_status} />
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {order.items_count} items
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {formatCurrency(order.total_amount)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => navigate(`/admin/sales/orders/${order.id}`)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
