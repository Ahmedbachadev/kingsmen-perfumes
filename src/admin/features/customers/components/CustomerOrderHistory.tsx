import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import type { Order } from '../../orders/types/order';

interface Props {
  orders?: Order[];
}

export const CustomerOrderHistory: React.FC<Props> = ({ orders = [] }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Order History</h3>
        <p className="text-sm text-neutral-500">No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-neutral-400" />
          Order History
        </h3>
      </div>
      
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-neutral-50 z-10">
            <tr className="border-b border-neutral-200">
              <th className="py-3 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Order</th>
              <th className="py-3 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
              <th className="py-3 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider">Total</th>
              <th className="py-3 px-6 text-xs font-medium text-neutral-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-neutral-900">
                  {order.order_number}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-neutral-500">
                  {formatDate(order.created_at)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-neutral-900">
                  {formatCurrency(order.total)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-right">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900"
                  >
                    Details <ExternalLink className="w-3 h-3" />
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
