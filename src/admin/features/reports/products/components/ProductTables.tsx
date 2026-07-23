import React, { useState } from 'react';
import type { ProductAnalyticItem } from '../types';
import { cn } from '../../../../utils/cn';

interface ProductTablesProps {
 data: {
 bestSellers: ProductAnalyticItem[];
 worstSellers: ProductAnalyticItem[];
 lowStock: ProductAnalyticItem[];
 neverSold: ProductAnalyticItem[];
 };
 isLoading: boolean;
}

type TableTab = 'best' | 'worst' | 'lowStock' | 'neverSold';

export const ProductTables: React.FC<ProductTablesProps> = ({ data, isLoading }) => {
 const [activeTab, setActiveTab] = useState<TableTab>('best');

 if (isLoading) {
 return <div className="h-[400px] w-full bg-neutral-100 rounded-xl animate-pulse" />;
 }

 const tabs: { id: TableTab; label: string; count: number }[] = [
 { id: 'best', label: 'Best Sellers', count: data.bestSellers.length },
 { id: 'worst', label: 'Worst Sellers', count: data.worstSellers.length },
 { id: 'lowStock', label: 'Low Stock', count: data.lowStock.length },
 { id: 'neverSold', label: 'Never Sold', count: data.neverSold.length }
 ];

 const getTableData = () => {
 switch (activeTab) {
 case 'best': return data.bestSellers;
 case 'worst': return data.worstSellers;
 case 'lowStock': return data.lowStock;
 case 'neverSold': return data.neverSold;
 default: return [];
 }
 };

 const tableData = getTableData();

 return (
 <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
 {/* Tabs */}
 <div className="flex items-center overflow-x-auto border-b border-neutral-200 scrollbar-hide">
 {tabs.map(tab => (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={cn(
 "flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
 activeTab === tab.id
 ? "border-neutral-900 text-neutral-900 "
 : "border-transparent text-neutral-500 hover:text-neutral-700"
 )}
 >
 {tab.label}
 <span className={cn(
 "px-2 py-0.5 rounded-full text-xs",
 activeTab === tab.id 
 ? "bg-neutral-100 text-neutral-900 " 
 : "bg-neutral-100 text-neutral-500"
 )}>
 {tab.count}
 </span>
 </button>
 ))}
 </div>

 {/* Content */}
 <div className="p-0 overflow-x-auto">
 <div className="min-w-[800px] p-6">
 {tableData.length === 0 ? (
 <div className="text-center py-8 text-neutral-500 text-sm">
 No products found in this category.
 </div>
 ) : (
 <table className="w-full text-left text-sm">
 <thead className="text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="pb-3 font-medium">Product / SKU</th>
 <th className="pb-3 font-medium">Category</th>
 <th className="pb-3 font-medium text-right">Inventory</th>
 <th className="pb-3 font-medium text-right">Views</th>
 <th className="pb-3 font-medium text-right">Units Sold</th>
 <th className="pb-3 font-medium text-right">Revenue</th>
 </tr>
 </thead>
 <tbody>
 {tableData.map((item) => (
 <tr key={item.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
 <td className="py-3">
 <div className="font-medium text-neutral-900 ">{item.title}</div>
 <div className="text-xs text-neutral-500 mt-0.5">{item.sku}</div>
 </td>
 <td className="py-3 text-neutral-600 capitalize">{item.category}</td>
 <td className="py-3 text-right">
 <span className={cn(
 "px-2 py-1 rounded-md text-xs font-medium",
 item.inventory === 0 ? "bg-red-100 text-red-700 " :
 item.inventory <= 10 ? "bg-amber-100 text-amber-700 " :
 "text-neutral-600 "
 )}>
 {item.inventory} in stock
 </span>
 </td>
 <td className="py-3 text-right text-neutral-600 ">{item.views.toLocaleString()}</td>
                  <td className="py-3 text-right text-sm text-neutral-600">{item.orders}</td>
                  <td className="py-3 text-right font-medium text-neutral-900 ">Rs {item.revenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
 </tr>
 ))}
 </tbody>
 </table>
 )}
 </div>
 </div>
 </div>
 );
};
