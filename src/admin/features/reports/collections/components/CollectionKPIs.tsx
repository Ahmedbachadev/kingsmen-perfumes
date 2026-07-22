import React from 'react';
import type { CollectionKPIs as KPIStats } from '../types';
import { Trophy, TrendingDown, DollarSign, ShoppingCart, Package } from 'lucide-react';

interface CollectionKPIsProps {
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

export const CollectionKPIs: React.FC<CollectionKPIsProps> = ({ kpis, isLoading }) => {
 if (isLoading) {
 return (
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
 {[1, 2, 3, 4, 5].map(i => (
 <div key={i} className="h-24 bg-neutral-100 rounded-xl animate-pulse" />
 ))}
 </div>
 );
 }

 return (
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
 <KPICard 
 title="Best Performing" 
 value={kpis.bestPerforming?.name || 'N/A'} 
 subtitle={kpis.bestPerforming ? `$${kpis.bestPerforming.revenue.toLocaleString()}` : ''}
 icon={Trophy}
 colorClass="bg-yellow-500 text-yellow-500"
 />
 <KPICard 
 title="Lowest Performing" 
 value={kpis.lowestPerforming?.name || 'N/A'} 
 subtitle={kpis.lowestPerforming ? `$${kpis.lowestPerforming.revenue.toLocaleString()}` : ''}
 icon={TrendingDown}
 colorClass="bg-red-500 text-red-500"
 />
 <KPICard 
 title="Total Revenue" 
 value={`$${kpis.totalRevenue.toLocaleString()}`} 
 icon={DollarSign}
 colorClass="bg-emerald-500 text-emerald-500"
 />
 <KPICard 
 title="Total Orders" 
 value={kpis.totalOrders.toLocaleString()} 
 icon={ShoppingCart}
 colorClass="bg-blue-500 text-blue-500"
 />
 <KPICard 
 title="Total Products" 
 value={kpis.totalProducts.toLocaleString()} 
 icon={Package}
 colorClass="bg-purple-500 text-purple-500"
 />
 </div>
 );
};
