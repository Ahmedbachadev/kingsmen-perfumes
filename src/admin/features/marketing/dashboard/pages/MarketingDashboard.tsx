import React, { useState, useEffect } from 'react';
import { MarketingKPIs as KPIsComponent } from '../components/MarketingKPIs';
import { MarketingActivity } from '../components/MarketingActivity';
import { MarketingQuickActions } from '../components/MarketingQuickActions';
import { MarketingService } from '../services/marketing.service';
import type { MarketingKPIs as KPIStats, MarketingActivityItem } from '../types';
import { Megaphone } from 'lucide-react';

export default function MarketingDashboard() {
 const [isLoading, setIsLoading] = useState(true);
 const [kpis, setKpis] = useState<KPIStats | null>(null);
 const [feed, setFeed] = useState<MarketingActivityItem[]>([]);

 useEffect(() => {
 fetchData();
 }, []);

 const fetchData = async () => {
 setIsLoading(true);
 try {
 const [kpiData, feedData] = await Promise.all([
 MarketingService.getDashboardData(),
 MarketingService.getActivityFeed()
 ]);
 setKpis(kpiData);
 setFeed(feedData);
 } catch (error) {
 console.error('Failed to load marketing data', error);
 } finally {
 setIsLoading(false);
 }
 };

 return (
 <div className="min-h-screen bg-neutral-50 p-4 sm:p-6 lg:p-8">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
 <div>
 <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
 <Megaphone className="w-6 h-6 text-neutral-500" />
 Marketing Center
 </h1>
 <p className="text-sm text-neutral-500 mt-1">
 Manage campaigns, coupons, and promotional activities.
 </p>
 </div>
 </div>

 <KPIsComponent kpis={kpis!} isLoading={isLoading || !kpis} />

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-2">
 <MarketingActivity feed={feed} isLoading={isLoading} />
 </div>
 <div className="lg:col-span-1">
 <MarketingQuickActions />
 </div>
 </div>
 </div>
 );
}
