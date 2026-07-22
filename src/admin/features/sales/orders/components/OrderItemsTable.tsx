import React from 'react';
import { Package } from 'lucide-react';
import type { OrderWithItems } from '../services/orderService';
import { formatCurrency } from '../../../../../utils/format';

interface OrderItemsTableProps {
  order: OrderWithItems;
}

export function OrderItemsTable({ order }: OrderItemsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-200/60 bg-slate-50/50 flex items-center gap-2">
        <Package className="w-4 h-4 text-slate-500" />
        <h3 className="font-semibold text-slate-900">Order Items</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white border-b border-slate-100 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">SKU</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-right">Quantity</th>
              <th className="px-6 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{item.product_name}</span>
                    {item.variant_name && (
                      <span className="text-slate-500 text-xs">{item.variant_name}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                  {item.sku || '-'}
                </td>
                <td className="px-6 py-4 text-right text-slate-600">
                  {formatCurrency(item.unit_price)}
                </td>
                <td className="px-6 py-4 text-right text-slate-600">
                  × {item.quantity}
                </td>
                <td className="px-6 py-4 text-right font-medium text-slate-900">
                  {formatCurrency(item.total_price)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 border-t border-slate-200/60">
            <tr>
              <td colSpan={4} className="px-6 py-3 text-right text-slate-500">Subtotal</td>
              <td className="px-6 py-3 text-right font-medium text-slate-900">{formatCurrency(order.subtotal)}</td>
            </tr>
            {Number(order.discount) > 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-3 text-right text-red-500">Discount</td>
                <td className="px-6 py-3 text-right font-medium text-red-500">-{formatCurrency(order.discount)}</td>
              </tr>
            )}
            <tr>
              <td colSpan={4} className="px-6 py-3 text-right text-slate-500">Shipping</td>
              <td className="px-6 py-3 text-right font-medium text-slate-900">{formatCurrency(order.shipping_cost)}</td>
            </tr>
            {Number(order.tax) > 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-3 text-right text-slate-500">Tax</td>
                <td className="px-6 py-3 text-right font-medium text-slate-900">{formatCurrency(order.tax)}</td>
              </tr>
            )}
            <tr className="border-t border-slate-200/60 font-semibold text-lg">
              <td colSpan={4} className="px-6 py-4 text-right text-slate-900">Total</td>
              <td className="px-6 py-4 text-right text-indigo-600">{formatCurrency(order.total_amount)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
