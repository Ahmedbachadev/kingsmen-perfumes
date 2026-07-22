import React from 'react';
import type { SalesKPIs as KPIStats } from '../types';

interface SalesKPIsProps {
 kpis: KPIStats;
 isLoading: boolean;
}

const KPICard = ({ title, value, prefix = '' }: { title: string, value: number, prefix?: string }) => (
 <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
 <h3 className="text-sm font-medium text-neutral-500 mb-1">{title}</h3>
 <div className="text-2xl font-bold text-neutral-900 ">
 {prefix}{prefix === '$' ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value.toLocaleString()}
 </div>
 </div>
);

export const SalesKPIs: React.FC<SalesKPIsProps> = ({ kpis, isLoading }) => {
 if (isLoading) {
 return (
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
 {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
 <div key={i} className="h-24 bg-neutral-100 rounded-xl animate-pulse" />
 ))}
 </div>
 );
 }

 return (
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
 <KPICard title="Revenue" value={kpis.revenue} prefix="$" />
 <KPICard title="Gross Sales" value={kpis.grossSales} prefix="$" />
 <KPICard title="Net Sales" value={kpis.netSales} prefix="$" />
 <KPICard title="Average Order Value" value={kpis.averageOrderValue} prefix="$" />
 
 <KPICard title="Total Orders" value={kpis.orders} />
 <KPICard title="Completed Orders" value={kpis.completedOrders} />
 <KPICard title="Pending Orders" value={kpis.pendingOrders} />
 <KPICard title="Cancelled Orders" value={kpis.cancelledOrders} />
 </div>
 );
};
