import React from 'react';
import type { MarketingKPIs as KPIStats } from '../types';
import { Megaphone, Ticket, Users, Package, Layers, MonitorPlay } from 'lucide-react';

interface MarketingKPIsProps {
 kpis: KPIStats;
 isLoading: boolean;
}

const KPICard = ({ 
 title, 
 value, 
 icon: Icon,
 colorClass
}: { 
 title: string, 
 value: string | number, 
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
 </div>
 </div>
);

export const MarketingKPIs: React.FC<MarketingKPIsProps> = ({ kpis, isLoading }) => {
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
 title="Active Campaigns" 
 value={kpis.activeCampaigns} 
 icon={Megaphone}
 colorClass="bg-blue-500 text-blue-500"
 />
 <KPICard 
 title="Active Coupons" 
 value={kpis.activeCoupons} 
 icon={Ticket}
 colorClass="bg-emerald-500 text-emerald-500"
 />
 <KPICard 
 title="Newsletter Subscribers" 
 value={kpis.newsletterSubscribers.toLocaleString()} 
 icon={Users}
 colorClass="bg-purple-500 text-purple-500"
 />
 <KPICard 
 title="Featured Products" 
 value={kpis.featuredProducts} 
 icon={Package}
 colorClass="bg-amber-500 text-amber-500"
 />
 <KPICard 
 title="Featured Collections" 
 value={kpis.featuredCollections} 
 icon={Layers}
 colorClass="bg-pink-500 text-pink-500"
 />
 <KPICard 
 title="Homepage Promotions" 
 value={kpis.homepagePromotions} 
 icon={MonitorPlay}
 colorClass="bg-indigo-500 text-indigo-500"
 />
 </div>
 );
};
