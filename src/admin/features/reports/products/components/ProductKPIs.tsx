import React from 'react';
import type { ProductKPIs as KPIStats } from '../types';
import { PackageX, TrendingDown, TrendingUp, Eye, PackageMinus, Box } from 'lucide-react';

interface ProductKPIsProps {
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
 value: number, 
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
 <div className="text-2xl font-bold text-neutral-900 ">
 {value.toLocaleString()}
 </div>
 {subtitle && (
 <div className="text-xs text-neutral-400 mt-1">{subtitle}</div>
 )}
 </div>
 </div>
);

export const ProductKPIs: React.FC<ProductKPIsProps> = ({ kpis, isLoading }) => {
 if (isLoading) {
 return (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
 {[1, 2, 3, 4, 5, 6].map(i => (
 <div key={i} className="h-24 bg-neutral-100 rounded-xl animate-pulse" />
 ))}
 </div>
 );
 }

 const getTopItem = (items: any[], defaultText: string) => 
 items.length > 0 ? items[0].title : defaultText;

 return (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
 <KPICard 
 title="Best Seller" 
 value={kpis.bestSellers[0]?.sold || 0} 
 subtitle={getTopItem(kpis.bestSellers, 'No sales')}
 icon={TrendingUp}
 colorClass="bg-emerald-500 text-emerald-500"
 />
 <KPICard 
 title="Worst Seller" 
 value={kpis.worstSellers[0]?.sold || 0} 
 subtitle={getTopItem(kpis.worstSellers, 'N/A')}
 icon={TrendingDown}
 colorClass="bg-red-500 text-red-500"
 />
 <KPICard 
 title="Most Viewed" 
 value={kpis.mostViewed[0]?.views || 0} 
 subtitle={getTopItem(kpis.mostViewed, 'No views')}
 icon={Eye}
 colorClass="bg-blue-500 text-blue-500"
 />
 
 <KPICard 
 title="Never Sold" 
 value={kpis.neverSold.length} 
 subtitle="Products with 0 sales"
 icon={PackageX}
 colorClass="bg-neutral-500 text-neutral-500"
 />
 <KPICard 
 title="Low Stock" 
 value={kpis.lowStock.length} 
 subtitle="Inventory ≤ 10"
 icon={PackageMinus}
 colorClass="bg-amber-500 text-amber-500"
 />
 <KPICard 
 title="Out of Stock" 
 value={kpis.outOfStock.length} 
 subtitle="Inventory = 0"
 icon={Box}
 colorClass="bg-red-600 text-red-600"
 />
 </div>
 );
};
