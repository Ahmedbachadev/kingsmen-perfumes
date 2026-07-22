import { supabase } from '../../../../../lib/supabase';
import type { 
 SalesFilters, 
 SalesKPIs, 
 RevenueDataPoint, 
 SalesTableOrder,
 BestRevenueDay,
 SalesByCollection,
 SalesByProduct
} from '../types';
import { format, parseISO, startOfDay, endOfDay } from 'date-fns';

export const SalesService = {
 async getReportData(filters: SalesFilters) {
 const start = filters.dateRange.startDate.toISOString();
 const end = filters.dateRange.endDate.toISOString();

 let query = supabase
 .from('orders')
 .select(`
 id,
 total_amount,
 status,
 created_at,
 customer_id
 `)
 .gte('created_at', start)
 .lte('created_at', end);

 if (filters.orderStatus && filters.orderStatus !== 'all') {
 query = query.eq('status', filters.orderStatus);
 }
 
 // In a real app we would join payment methods and collections here
 const { data: orders, error } = await query;
 if (error) {
 console.error('Error fetching sales data', error);
 return this.getEmptyState();
 }

 const safeOrders = orders || [];

 // Filter by payment method locally if simulated
 const filteredOrders = safeOrders; // Add payment/collection filtering logic if needed

 // --- KPIs ---
 let revenue = 0;
 let grossSales = 0;
 let cancelledOrdersCount = 0;
 let pendingOrdersCount = 0;
 let completedOrdersCount = 0;

 filteredOrders.forEach(o => {
 const amt = Number(o.total_amount || 0);
 grossSales += amt;
 
 if (o.status === 'completed') {
 completedOrdersCount++;
 revenue += amt;
 } else if (o.status === 'cancelled') {
 cancelledOrdersCount++;
 } else {
 pendingOrdersCount++;
 }
 });

 const netSales = revenue * 0.95; // Simulated 5% cost
 const ordersCount = filteredOrders.length;
 const aov = ordersCount > 0 ? grossSales / ordersCount : 0;

 const kpis: SalesKPIs = {
 revenue,
 grossSales,
 netSales,
 orders: ordersCount,
 averageOrderValue: aov,
 cancelledOrders: cancelledOrdersCount,
 pendingOrders: pendingOrdersCount,
 completedOrders: completedOrdersCount
 };

 // --- CHARTS ---
 const dailyMap = new Map<string, number>();
 filteredOrders.forEach(o => {
 if (o.status !== 'cancelled') {
 const dateStr = format(parseISO(o.created_at), 'yyyy-MM-dd');
 dailyMap.set(dateStr, (dailyMap.get(dateStr) || 0) + Number(o.total_amount || 0));
 }
 });

 const dailyRevenue: RevenueDataPoint[] = Array.from(dailyMap.entries())
 .sort((a, b) => a[0].localeCompare(b[0]))
 .map(([date, rev]) => ({
 date: format(parseISO(date), 'MMM dd'),
 revenue: rev
 }));

 // --- TABLES ---
 const tableOrders: SalesTableOrder[] = filteredOrders.map(o => ({
 id: o.id.substring(0, 8),
 date: format(parseISO(o.created_at), 'MMM dd, yyyy HH:mm'),
 customer: `Customer ${o.customer_id ? o.customer_id.substring(0, 4) : 'Guest'}`,
 total: Number(o.total_amount),
 status: o.status
 })).sort((a, b) => b.total - a.total); // Top orders

 // Top Days
 const bestDays: BestRevenueDay[] = Array.from(dailyMap.entries())
 .map(([date, rev]) => {
 const orderCount = filteredOrders.filter(o => format(parseISO(o.created_at), 'yyyy-MM-dd') === date).length;
 return { date, revenue: rev, orders: orderCount };
 })
 .sort((a, b) => b.revenue - a.revenue)
 .slice(0, 10);

 // Mock Collections and Products since we don't have order_items populated for analytics
 const salesByCollection: SalesByCollection[] = [
 { collection: 'Gentlemen', revenue: revenue * 0.45, orders: Math.floor(ordersCount * 0.45) },
 { collection: 'Ladies', revenue: revenue * 0.35, orders: Math.floor(ordersCount * 0.35) },
 { collection: 'Unisex', revenue: revenue * 0.20, orders: Math.floor(ordersCount * 0.20) }
 ].sort((a, b) => b.revenue - a.revenue);

 const salesByProduct: SalesByProduct[] = [
 { product: 'Kingsmen Signature', revenue: revenue * 0.3, sold: Math.floor(ordersCount * 0.4) },
 { product: 'Oud Wood', revenue: revenue * 0.2, sold: Math.floor(ordersCount * 0.25) },
 { product: 'Royal Blue', revenue: revenue * 0.15, sold: Math.floor(ordersCount * 0.2) },
 { product: 'Midnight Noir', revenue: revenue * 0.1, sold: Math.floor(ordersCount * 0.1) }
 ].sort((a, b) => b.revenue - a.revenue);

 return {
 kpis,
 charts: {
 daily: dailyRevenue,
 weekly: dailyRevenue, // In a real app we group these
 monthly: dailyRevenue,
 yearly: dailyRevenue
 },
 tables: {
 orders: tableOrders,
 bestDays,
 collections: salesByCollection,
 products: salesByProduct
 }
 };
 },

 getEmptyState() {
 return {
 kpis: {
 revenue: 0, grossSales: 0, netSales: 0, orders: 0,
 averageOrderValue: 0, cancelledOrders: 0, pendingOrders: 0, completedOrders: 0
 },
 charts: { daily: [], weekly: [], monthly: [], yearly: [] },
 tables: { orders: [], bestDays: [], collections: [], products: [] }
 };
 }
};
