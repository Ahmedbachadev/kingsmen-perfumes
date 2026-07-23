import React, { useState } from 'react';
import type { DailyRevenueBreakdown, MonthlyFinancialSummary } from '../types';
import { cn } from '../../../../utils/cn';

interface FinancialTablesProps {
 data: {
 daily: DailyRevenueBreakdown[];
 monthly: MonthlyFinancialSummary[];
 };
 isLoading: boolean;
}

type TableTab = 'daily' | 'monthly';

export const FinancialTables: React.FC<FinancialTablesProps> = ({ data, isLoading }) => {
 const [activeTab, setActiveTab] = useState<TableTab>('daily');

 if (isLoading) {
 return <div className="h-[400px] w-full bg-neutral-100 rounded-xl animate-pulse" />;
 }

 const tabs: { id: TableTab; label: string }[] = [
 { id: 'daily', label: 'Revenue Breakdown (Daily)' },
 { id: 'monthly', label: 'Monthly Financial Summary' }
 ];

 const renderTable = () => {
 if (activeTab === 'daily') {
 return (
 <table className="w-full text-left text-sm">
 <thead className="text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="pb-3 font-medium">Date</th>
 <th className="pb-3 font-medium text-right">Gross Revenue</th>
 <th className="pb-3 font-medium text-right text-red-500">Discounts</th>
 <th className="pb-3 font-medium text-right text-blue-500">Shipping Income</th>
 <th className="pb-3 font-medium text-right">Net Revenue</th>
 <th className="pb-3 font-medium text-right text-green-600">Est. Profit</th>
 </tr>
 </thead>
 <tbody>
 {data.daily.map((item, index) => (
 <tr key={index} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
 <td className="py-4 text-neutral-900 font-medium">{item.date}</td>
 <td className="py-4 text-right text-neutral-600 ">Rs {item.grossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
 <td className="py-4 text-right text-red-500">-Rs {item.discounts.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
 <td className="py-4 text-right text-blue-500">+Rs {item.shipping.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
 <td className="py-4 text-right font-semibold text-neutral-900 ">Rs {item.netRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
 <td className="py-4 text-right font-medium text-green-600">Rs {item.estimatedProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
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
 <th className="pb-3 font-medium">Month</th>
 <th className="pb-3 font-medium text-right">Gross Revenue</th>
 <th className="pb-3 font-medium text-right">Net Revenue</th>
 <th className="pb-3 font-medium text-right text-green-600">Est. Profit</th>
 <th className="pb-3 font-medium text-right">Profit Margin</th>
 </tr>
 </thead>
 <tbody>
 {data.monthly.map((item, index) => (
 <tr key={index} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
 <td className="py-4 text-neutral-900 font-semibold">{item.month}</td>
 <td className="py-4 text-right text-neutral-600 ">Rs {item.grossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
 <td className="py-4 text-right font-medium text-neutral-900 ">Rs {item.netRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
 <td className="py-4 text-right font-medium text-green-600">Rs {item.estimatedProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
 <td className="py-4 text-right">
 <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 ">
 {item.profitMargin.toFixed(1)}%
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
 <div className="min-w-[700px] p-6">
 {data.daily.length === 0 ? (
 <div className="text-center py-8 text-neutral-500 text-sm">
 No financial data found for the selected period.
 </div>
 ) : renderTable()}
 </div>
 </div>
 </div>
 );
};
