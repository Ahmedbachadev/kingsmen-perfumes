import React from 'react';
import { Link } from 'react-router-dom';
import type { OrderItem } from '../types/order';
import { PackageOpen } from 'lucide-react';

interface Props {
  items?: OrderItem[];
}

export const OrderItemsTable: React.FC<Props> = ({ items = [] }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 text-center">
        <PackageOpen className="mx-auto h-12 w-12 text-neutral-300" />
        <h3 className="mt-2 text-sm font-semibold text-neutral-900">No items</h3>
        <p className="text-sm text-neutral-500">This order has no products.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-200">
        <h2 className="text-base font-semibold text-neutral-900">Order Items</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Quantity</th>
              <th className="px-6 py-4 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  {item.product_id ? (
                    <Link 
                      to={`/admin/products/${item.product_id}`}
                      className="font-medium text-neutral-900 hover:text-neutral-600"
                    >
                      {item.product_name}
                    </Link>
                  ) : (
                    <span className="font-medium text-neutral-900">{item.product_name}</span>
                  )}
                  {item.sku && <p className="text-xs text-neutral-500 mt-1">SKU: {item.sku}</p>}
                </td>
                <td className="px-6 py-4 text-neutral-500">
                  {formatCurrency(item.price)}
                </td>
                <td className="px-6 py-4 text-neutral-500">
                  x{item.quantity}
                </td>
                <td className="px-6 py-4 font-medium text-neutral-900 text-right">
                  {formatCurrency(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
