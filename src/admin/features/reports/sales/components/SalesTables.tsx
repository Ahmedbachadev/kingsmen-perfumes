import React, { useState } from 'react';
import type { SalesTableOrder, BestRevenueDay, SalesByCollection, SalesByProduct } from '../types';
import { cn } from '../../../../utils/cn';

interface SalesTablesProps {
 tables: {
 orders: SalesTableOrder[];
 bestDays: BestRevenueDay[];
 collections: SalesByCollection[];
 products: SalesByProduct[];
 };
 isLoading: boolean;
}

type TableTab = 'orders' | 'days' | 'collections' | 'products';

export const SalesTables: React.FC<SalesTablesProps> = ({ tables, isLoading }) => {
 const [activeTab, setActiveTab] = useState<TableTab>('orders');

 if (isLoading) {
 return <div className="h-[400px] w-full bg-neutral-100 rounded-xl animate-pulse" />;
 }

 const tabs: { id: TableTab; label: string }[] = [
 { id: 'orders', label: 'Top Orders' },
 { id: 'days', label: 'Highest Revenue Days' },
 { id: 'collections', label: 'By Collection' },
 { id: 'products', label: 'By Product' }
 ];

 const renderTable = () => {
 switch (activeTab) {
 case 'orders':
 return (
 <table className="w-full text-left text-sm">
 <thead className="text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="pb-3 font-medium">Order ID</th>
 <th className="pb-3 font-medium">Date</th>
 <th className="pb-3 font-medium">Customer</th>
 <th className="pb-3 font-medium">Status</th>
 <th className="pb-3 font-medium text-right">Total</th>
 </tr>
 </thead>
 <tbody>
 {tables.orders.slice(0, 10).map((order) => (
 <tr key={order.id} className="border-b border-neutral-100 last:border-0">
 <td className="py-3 text-neutral-900 font-medium">#{order.id}</td>
 <td className="py-3 text-neutral-600 ">{order.date}</td>
 <td className="py-3 text-neutral-600 ">{order.customer}</td>
 <td className="py-3">
 <span className={cn(
 "px-2 py-1 rounded-md text-xs font-medium capitalize",
 order.status === 'completed' ? "bg-emerald-100 text-emerald-700 " :
 order.status === 'pending' ? "bg-amber-100 text-amber-700 " :
 "bg-red-100 text-red-700 "
 )}>
 {order.status}
 </span>
 </td>
 <td className="py-3 text-right font-medium text-neutral-900 ">${order.total.toFixed(2)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 );
 case 'days':
 return (
 <table className="w-full text-left text-sm">
 <thead className="text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="pb-3 font-medium">Date</th>
 <th className="pb-3 font-medium">Orders Count</th>
 <th className="pb-3 font-medium text-right">Revenue</th>
 </tr>
 </thead>
 <tbody>
 {tables.bestDays.map((day) => (
 <tr key={day.date} className="border-b border-neutral-100 last:border-0">
 <td className="py-3 text-neutral-900 font-medium">{day.date}</td>
 <td className="py-3 text-neutral-600 ">{day.orders}</td>
 <td className="py-3 text-right font-medium text-neutral-900 ">${day.revenue.toFixed(2)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 );
 case 'collections':
 return (
 <table className="w-full text-left text-sm">
 <thead className="text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="pb-3 font-medium">Collection</th>
 <th className="pb-3 font-medium">Orders Count</th>
 <th className="pb-3 font-medium text-right">Revenue</th>
 </tr>
 </thead>
 <tbody>
 {tables.collections.map((col) => (
 <tr key={col.collection} className="border-b border-neutral-100 last:border-0">
 <td className="py-3 text-neutral-900 font-medium">{col.collection}</td>
 <td className="py-3 text-neutral-600 ">{col.orders}</td>
 <td className="py-3 text-right font-medium text-neutral-900 ">${col.revenue.toFixed(2)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 );
 case 'products':
 return (
 <table className="w-full text-left text-sm">
 <thead className="text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="pb-3 font-medium">Product</th>
 <th className="pb-3 font-medium">Quantity Sold</th>
 <th className="pb-3 font-medium text-right">Revenue</th>
 </tr>
 </thead>
 <tbody>
 {tables.products.map((prod) => (
 <tr key={prod.product} className="border-b border-neutral-100 last:border-0">
 <td className="py-3 text-neutral-900 font-medium">{prod.product}</td>
 <td className="py-3 text-neutral-600 ">{prod.sold}</td>
 <td className="py-3 text-right font-medium text-neutral-900 ">${prod.revenue.toFixed(2)}</td>
 </tr>
 ))}
 </tbody>
 </table>
 );
 }
 };

 return (
 <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
 {/* Tabs */}
 <div className="flex items-center overflow-x-auto border-b border-neutral-200 ">
 {tabs.map(tab => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={cn(
 "px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
 activeTab === tab.id
 ? "border-neutral-900 text-neutral-900 "
 : "border-transparent text-neutral-500 hover:text-neutral-700"
 )}
 >
 {tab.label}
 </button>
 ))}
 </div>

 {/* Content */}
 <div className="p-0 overflow-x-auto">
 <div className="min-w-[600px] p-6">
 {renderTable()}
 </div>
 </div>
 </div>
 );
};
