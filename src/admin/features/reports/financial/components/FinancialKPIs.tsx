import React from 'react';
import type { FinancialKPIs as KPIStats } from '../types';
import { DollarSign, Truck, Tag, TrendingUp, HandCoins, Clock } from 'lucide-react';

interface FinancialKPIsProps {
 kpis: KPIStats;
 isLoading: boolean;
}

const KPICard = ({ 
 title, 
 value, 
 subtitle,
 icon: Icon,
 colorClass
}: { 
 title: string, 
 value: string | number, 
 subtitle?: string,
 icon: React.ElementType,
 colorClass: string
}) => (
 <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
 <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10 `}>
 <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
 </div>
 <div>
 <h3 className="text-sm font-medium text-neutral-500 mb-1">{title}</h3>
 <div className="text-xl md:text-2xl font-bold text-neutral-900 truncate max-w-[150px]">
 {value}
 </div>
 {subtitle && (
 <div className="text-xs text-neutral-400 mt-1">{subtitle}</div>
 )}
 </div>
 </div>
);

export const FinancialKPIs: React.FC<FinancialKPIsProps> = ({ kpis, isLoading }) => {
 if (isLoading) {
 return (
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
 {[1, 2, 3, 4, 5, 6].map(i => (
 <div key={i} className="h-24 bg-neutral-100 rounded-xl animate-pulse" />
 ))}
 </div>
 );
 }

 return (
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
 <KPICard 
 title="Net Revenue" 
 value={`$${kpis.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
 icon={DollarSign}
 colorClass="bg-emerald-500 text-emerald-500"
 />
 <KPICard 
 title="Shipping Income" 
 value={`$${kpis.shippingIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
 icon={Truck}
 colorClass="bg-blue-500 text-blue-500"
 />
 <KPICard 
 title="Discounts Given" 
 value={`-$${kpis.discounts.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
 icon={Tag}
 colorClass="bg-red-500 text-red-500"
 />
 <KPICard 
 title="Estimated Profit" 
 value={`$${kpis.estimatedProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
 subtitle={`${kpis.revenue > 0 ? ((kpis.estimatedProfit / kpis.revenue) * 100).toFixed(1) : 0}% Margin`}
 icon={TrendingUp}
 colorClass="bg-green-600 text-green-600"
 />
 <KPICard 
 title="Cash on Delivery" 
 value={`$${kpis.codOrdersValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
 subtitle={`${kpis.codOrdersCount.toLocaleString()} Orders`}
 icon={HandCoins}
 colorClass="bg-purple-500 text-purple-500"
 />
 <KPICard 
 title="Pending Payments" 
 value={`$${kpis.pendingPaymentsValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
 subtitle={`${kpis.pendingPaymentsCount.toLocaleString()} Orders`}
 icon={Clock}
 colorClass="bg-amber-500 text-amber-500"
 />
 </div>
 );
};
