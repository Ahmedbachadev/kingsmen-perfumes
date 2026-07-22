import React, { useState } from 'react';
import type { CollectionAnalyticItem } from '../types';
import { cn } from '../../../../utils/cn';

interface CollectionTablesProps {
 data: {
 rankings: CollectionAnalyticItem[];
 inventory: CollectionAnalyticItem[];
 };
 isLoading: boolean;
}

type TableTab = 'rankings' | 'inventory';

export const CollectionTables: React.FC<CollectionTablesProps> = ({ data, isLoading }) => {
 const [activeTab, setActiveTab] = useState<TableTab>('rankings');

 if (isLoading) {
 return <div className="h-[400px] w-full bg-neutral-100 rounded-xl animate-pulse" />;
 }

 const tabs: { id: TableTab; label: string }[] = [
 { id: 'rankings', label: 'Collection Rankings' },
 { id: 'inventory', label: 'Collection Inventory' }
 ];

 const renderTable = () => {
 if (activeTab === 'rankings') {
 return (
 <table className="w-full text-left text-sm">
 <thead className="text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="pb-3 font-medium">Rank</th>
 <th className="pb-3 font-medium">Collection</th>
 <th className="pb-3 font-medium text-right">Orders</th>
 <th className="pb-3 font-medium text-right">Products Sold</th>
 <th className="pb-3 font-medium text-right">Revenue</th>
 </tr>
 </thead>
 <tbody>
 {data.rankings.map((item, index) => (
 <tr key={item.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
 <td className="py-4 text-neutral-900 font-medium">#{index + 1}</td>
 <td className="py-4 text-neutral-900 font-semibold">{item.name}</td>
 <td className="py-4 text-right text-neutral-600 ">{item.orders.toLocaleString()}</td>
 <td className="py-4 text-right text-neutral-600 ">{(item.orders * 1.5).toFixed(0)}</td>
 <td className="py-4 text-right font-medium text-neutral-900 ">${item.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
 </tr>
 ))}
 </tbody>
 </table>
 );
 }

 return (
 <table className="w-full text-left text-sm">
 <thead className="text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="pb-3 font-medium">Collection</th>
 <th className="pb-3 font-medium text-right">Total Products (SKUs)</th>
 <th className="pb-3 font-medium text-right">Stock on Hand</th>
 <th className="pb-3 font-medium text-right">Out of Stock</th>
 </tr>
 </thead>
 <tbody>
 {data.inventory.map((item) => (
 <tr key={item.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
 <td className="py-4 text-neutral-900 font-semibold">{item.name}</td>
 <td className="py-4 text-right text-neutral-600 ">{item.productsCount.toLocaleString()}</td>
 <td className="py-4 text-right text-neutral-600 ">{item.inventoryCount.toLocaleString()}</td>
 <td className="py-4 text-right">
 <span className={cn(
 "px-2 py-1 rounded-md text-xs font-medium",
 item.outOfStockCount > 0 ? "bg-red-100 text-red-700 " : "text-neutral-600 "
 )}>
 {item.outOfStockCount.toLocaleString()}
 </span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 );
 };

 return (
 <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
 {/* Tabs */}
 <div className="flex items-center overflow-x-auto border-b border-neutral-200 scrollbar-hide">
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
 {data.rankings.length === 0 ? (
 <div className="text-center py-8 text-neutral-500 text-sm">
 No collections found.
 </div>
 ) : renderTable()}
 </div>
 </div>
 </div>
 );
};
