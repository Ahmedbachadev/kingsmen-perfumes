import React, { useState, useEffect } from 'react';
import { DateRangePicker } from '../components/DateRangePicker';
import { KPICard } from '../components/KPICard';
import { TrendChart } from '../components/TrendChart';
import { TopProductsList } from '../components/TopProductsList';
import { CategoryPieChart } from '../components/CategoryPieChart';
import { RecentActivityFeed } from '../components/RecentActivityFeed';
import { AnalyticsService } from '../services/analytics.service';
import type { DateFilter, KPIStats, TrendDataPoint, TopProduct, CategorySales, ActivityItem } from '../types';
import { startOfDay, endOfDay } from 'date-fns';
import { LayoutDashboard } from 'lucide-react';

export default function AnalyticsDashboard() {
 const [dateFilter, setDateFilter] = useState<DateFilter>({
 range: '30days',
 startDate: startOfDay(new Date(new Date().setDate(new Date().getDate() - 30))),
 endDate: endOfDay(new Date())
 });

 const [isLoading, setIsLoading] = useState(true);
 const [kpis, setKpis] = useState<KPIStats | null>(null);
 const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);
 const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
 const [categorySales, setCategorySales] = useState<CategorySales[]>([]);
 const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

 useEffect(() => {
 fetchData();
 }, [dateFilter]);

 const fetchData = async () => {
 setIsLoading(true);
 try {
 const [dashboardData, productsData, categoryData, activityData] = await Promise.all([
 AnalyticsService.getDashboardData(dateFilter),
 AnalyticsService.getTopProducts(),
 AnalyticsService.getCategorySales(),
 AnalyticsService.getRecentActivity()
 ]);

 setKpis(dashboardData.kpis);
 setTrendData(dashboardData.trendData);
 setTopProducts(productsData);
 setCategorySales(categoryData);
 setRecentActivity(activityData);
 } catch (error) {
 console.error('Failed to load dashboard data', error);
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
 <LayoutDashboard className="w-6 h-6 text-neutral-500" />
 Reports & Analytics
 </h1>
 <p className="text-sm text-neutral-500 mt-1">
 Overview of your store's performance and activity.
 </p>
 </div>
 <DateRangePicker value={dateFilter} onChange={setDateFilter} />
 </div>

 {/* KPI Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
 <KPICard 
 title="Total Revenue" 
 value={kpis?.totalRevenue || 0} 
 change={kpis?.revenueChange || 0} 
 prefix="$" 
 isLoading={isLoading} 
 />
 <KPICard 
 title="Total Orders" 
 value={kpis?.totalOrders || 0} 
 change={kpis?.ordersChange || 0} 
 isLoading={isLoading} 
 />
 <KPICard 
 title="Total Customers" 
 value={kpis?.totalCustomers || 0} 
 change={kpis?.customersChange || 0} 
 isLoading={isLoading} 
 />
 <KPICard 
 title="Products Sold" 
 value={kpis?.productsSold || 0} 
 change={kpis?.productsSoldChange || 0} 
 isLoading={isLoading} 
 />
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
 <KPICard 
 title="Average Order Value" 
 value={kpis?.averageOrderValue || 0} 
 change={kpis?.aovChange || 0} 
 prefix="$" 
 isLoading={isLoading} 
 />
 <KPICard 
 title="Conversion Rate" 
 value={kpis?.conversionRate || 0} 
 change={kpis?.conversionRateChange || 0} 
 suffix="%" 
 isLoading={isLoading} 
 />
 <KPICard 
 title="Refund Rate" 
 value={kpis?.refundRate || 0} 
 change={kpis?.refundRateChange || 0} 
 suffix="%" 
 isLoading={isLoading} 
 />
 </div>

 {/* Charts Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
 {/* Revenue Trend */}
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
 <h3 className="text-lg font-bold text-neutral-900 mb-4">Revenue Trend</h3>
 <TrendChart data={trendData} metric="revenue" isLoading={isLoading} />
 </div>

 {/* Orders Trend */}
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
 <h3 className="text-lg font-bold text-neutral-900 mb-4">Orders Trend</h3>
 <TrendChart data={trendData} metric="orders" isLoading={isLoading} />
 </div>
 </div>

 {/* Secondary Data Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
 {/* Top Products */}
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm lg:col-span-1">
 <h3 className="text-lg font-bold text-neutral-900 mb-6">Top Selling Products</h3>
 <TopProductsList products={topProducts} isLoading={isLoading} />
 </div>

 {/* Category Sales */}
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm lg:col-span-2">
 <h3 className="text-lg font-bold text-neutral-900 mb-6">Sales by Category</h3>
 <CategoryPieChart data={categorySales} isLoading={isLoading} />
 </div>
 </div>

 {/* Recent Activity */}
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
 <h3 className="text-lg font-bold text-neutral-900 mb-8 text-center md:text-left">Recent Activity</h3>
 <RecentActivityFeed activities={recentActivity} isLoading={isLoading} />
 </div>
 </div>
 );
}
