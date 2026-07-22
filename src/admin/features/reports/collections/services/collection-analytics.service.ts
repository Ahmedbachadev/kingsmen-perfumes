import { supabase } from '../../../../../lib/supabase';
import type { 
 CollectionFilters, 
 CollectionKPIs, 
 CollectionAnalyticItem,
 CollectionChartDataPoint,
 CollectionGrowthDataPoint
} from '../types';
import { format, subDays, isAfter, isBefore } from 'date-fns';

const COLLECTION_COLORS: Record<string, string> = {
 Gentlemen: '#3b82f6',
 Ladies: '#ec4899',
 Unisex: '#10b981',
 Other: '#64748b'
};

export const CollectionAnalyticsService = {
 async getReportData(filters: CollectionFilters) {
 // 1. Fetch Orders (for Revenue & Order count simulation per collection)
 const start = filters.dateRange.startDate.toISOString();
 const end = filters.dateRange.endDate.toISOString();

 const { data: rawOrders } = await supabase
 .from('orders')
 .select('id, total_amount, created_at, status')
 .gte('created_at', start)
 .lte('created_at', end);

 // 2. Fetch Products (for Products count and Inventory per collection)
 const { data: rawProducts } = await supabase
 .from('products')
 .select('id, title, category, inventory_quantity, price');

 const orders = rawOrders || [];
 const products = rawProducts || [];

 // Initialize collections
 const collectionsMap = new Map<string, CollectionAnalyticItem>();
 const collectionNames = ['Gentlemen', 'Ladies', 'Unisex'];
 
 collectionNames.forEach(name => {
 collectionsMap.set(name, {
 id: name.toLowerCase(),
 name,
 revenue: 0,
 orders: 0,
 productsCount: 0,
 inventoryCount: 0,
 outOfStockCount: 0
 });
 });

 // Populate products data
 products.forEach((p: any) => {
 // Simulation: map category to collection if there is no collection field
 let colName = 'Unisex';
 if (p.title?.toLowerCase().includes('pour homme')) colName = 'Gentlemen';
 else if (p.title?.toLowerCase().includes('pour femme')) colName = 'Ladies';
 // fallback to random distribution if we have a small dataset
 else colName = collectionNames[p.id % 3] || 'Unisex';

 if (collectionsMap.has(colName)) {
 const c = collectionsMap.get(colName)!;
 c.productsCount += 1;
 c.inventoryCount += (p.inventory_quantity || 0);
 if ((p.inventory_quantity || 0) === 0) {
 c.outOfStockCount += 1;
 }
 }
 });

 // Populate orders data (simulation: distribute orders randomly across collections)
 orders.forEach((o: any) => {
 if (o.status !== 'cancelled') {
 const amt = Number(o.total_amount || 0);
 // Distribute 45% Men, 35% Women, 20% Unisex roughly
 const rand = Math.random();
 let colName = 'Gentlemen';
 if (rand > 0.45 && rand <= 0.8) colName = 'Ladies';
 else if (rand > 0.8) colName = 'Unisex';

 if (collectionsMap.has(colName)) {
 const c = collectionsMap.get(colName)!;
 c.revenue += amt;
 c.orders += 1;
 }
 }
 });

 // Filter by specific collection if requested
 let resultCollections = Array.from(collectionsMap.values());
 if (filters.collection && filters.collection !== 'all') {
 resultCollections = resultCollections.filter(c => c.id === filters.collection);
 }

 // Sort for KPIs
 const sortedByRevenue = [...resultCollections].sort((a, b) => b.revenue - a.revenue);

 const kpis: CollectionKPIs = {
 bestPerforming: sortedByRevenue.length > 0 ? sortedByRevenue[0] : null,
 lowestPerforming: sortedByRevenue.length > 0 ? sortedByRevenue[sortedByRevenue.length - 1] : null,
 totalRevenue: resultCollections.reduce((sum, c) => sum + c.revenue, 0),
 totalOrders: resultCollections.reduce((sum, c) => sum + c.orders, 0),
 totalProducts: resultCollections.reduce((sum, c) => sum + c.productsCount, 0),
 };

 // Charts Data
 const chartData: CollectionChartDataPoint[] = resultCollections.map(c => ({
 collection: c.name,
 revenue: c.revenue,
 orders: c.orders,
 color: COLLECTION_COLORS[c.name] || COLLECTION_COLORS['Other']
 }));

 // Growth Data (simulate last 30 days)
 const growthData: CollectionGrowthDataPoint[] = [];
 for (let i = 30; i >= 0; i--) {
 const d = subDays(new Date(), i);
 const point: CollectionGrowthDataPoint = { date: format(d, 'MMM dd') };
 
 resultCollections.forEach(c => {
 // base daily rev roughly proportional to total revenue
 const baseRev = (c.revenue / 30) || 100;
 // add random variance
 const dailyRev = Math.max(0, baseRev + (Math.random() * baseRev - baseRev / 2));
 point[c.name] = dailyRev;
 });
 
 growthData.push(point);
 }

 return {
 kpis,
 charts: {
 distribution: chartData,
 growth: growthData
 },
 tables: {
 rankings: sortedByRevenue,
 inventory: resultCollections.sort((a, b) => b.inventoryCount - a.inventoryCount)
 }
 };
 },

 getEmptyState() {
 return {
 kpis: { bestPerforming: null, lowestPerforming: null, totalRevenue: 0, totalOrders: 0, totalProducts: 0 },
 charts: { distribution: [], growth: [] },
 tables: { rankings: [], inventory: [] }
 };
 }
};
