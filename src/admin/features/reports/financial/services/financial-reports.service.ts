import { supabase } from '../../../../../lib/supabase';
import type { 
 FinancialFilters, 
 FinancialKPIs, 
 RevenueTrendDataPoint,
 PaymentStatusDataPoint,
 DailyRevenueBreakdown,
 MonthlyFinancialSummary
} from '../types';
import { format, parseISO, startOfMonth } from 'date-fns';

export const FinancialReportsService = {
 async getReportData(filters: FinancialFilters) {
 const start = filters.dateRange.startDate.toISOString();
 const end = filters.dateRange.endDate.toISOString();

 const { data: rawOrders, error } = await supabase
 .from('orders')
 .select('id, total_amount, status, created_at')
 .gte('created_at', start)
 .lte('created_at', end);

 if (error) {
 console.error('Error fetching financial data', error);
 return this.getEmptyState();
 }

 const orders = rawOrders || [];

 // Financial calculations
 const PROFIT_MARGIN = 0.65; // Fixed assumption
 const SHIPPING_FEE_ASSUMPTION = 10;
 const DISCOUNT_RATE_ASSUMPTION = 0.10;

 let revenue = 0;
 let shippingIncome = 0;
 let discounts = 0;
 let estimatedProfit = 0;
 
 let codOrdersCount = 0;
 let codOrdersValue = 0;
 let pendingPaymentsCount = 0;
 let pendingPaymentsValue = 0;
 let paidOrdersValue = 0;

 const dailyBreakdownMap = new Map<string, DailyRevenueBreakdown>();
 const monthlySummaryMap = new Map<string, MonthlyFinancialSummary>();

 orders.forEach((o: any) => {
 const grossAmt = Number(o.total_amount || 0);
 const isCancelled = o.status === 'cancelled';
 const isPending = o.status === 'pending';
 const isCompleted = o.status === 'completed';

 // Simulation: randomly assign COD if not cancelled
 const isCod = !isCancelled && Math.random() > 0.8;

 if (!isCancelled) {
 // Simulations to populate dashboard
 const shipping = grossAmt > 100 ? 0 : SHIPPING_FEE_ASSUMPTION;
 const discount = Math.random() > 0.5 ? grossAmt * DISCOUNT_RATE_ASSUMPTION : 0;
 const netAmt = grossAmt - discount + shipping;
 const profit = netAmt * PROFIT_MARGIN;

 if (isCompleted) {
 revenue += netAmt;
 shippingIncome += shipping;
 discounts += discount;
 estimatedProfit += profit;
 paidOrdersValue += netAmt;
 }

 if (isPending) {
 pendingPaymentsCount++;
 pendingPaymentsValue += netAmt;
 }

 if (isCod) {
 codOrdersCount++;
 codOrdersValue += netAmt;
 }

 // Daily Breakdown
 const dateStr = format(parseISO(o.created_at), 'yyyy-MM-dd');
 if (!dailyBreakdownMap.has(dateStr)) {
 dailyBreakdownMap.set(dateStr, {
 date: format(parseISO(o.created_at), 'MMM dd, yyyy'),
 grossRevenue: 0,
 discounts: 0,
 shipping: 0,
 netRevenue: 0,
 estimatedProfit: 0
 });
 }
 const daily = dailyBreakdownMap.get(dateStr)!;
 daily.grossRevenue += grossAmt;
 daily.discounts += discount;
 daily.shipping += shipping;
 daily.netRevenue += netAmt;
 daily.estimatedProfit += profit;

 // Monthly Summary
 const monthStr = format(startOfMonth(parseISO(o.created_at)), 'yyyy-MM');
 if (!monthlySummaryMap.has(monthStr)) {
 monthlySummaryMap.set(monthStr, {
 month: format(parseISO(o.created_at), 'MMMM yyyy'),
 grossRevenue: 0,
 discounts: 0,
 shipping: 0,
 netRevenue: 0,
 estimatedProfit: 0,
 profitMargin: 0
 });
 }
 const monthly = monthlySummaryMap.get(monthStr)!;
 monthly.grossRevenue += grossAmt;
 monthly.discounts += discount;
 monthly.shipping += shipping;
 monthly.netRevenue += netAmt;
 monthly.estimatedProfit += profit;
 monthly.profitMargin = monthly.netRevenue > 0 ? (monthly.estimatedProfit / monthly.netRevenue) * 100 : 0;
 }
 });

 const kpis: FinancialKPIs = {
 revenue,
 shippingIncome,
 discounts,
 estimatedProfit,
 codOrdersCount,
 codOrdersValue,
 pendingPaymentsCount,
 pendingPaymentsValue
 };

 const dailyBreakdown = Array.from(dailyBreakdownMap.values()).reverse(); // Newest first
 const monthlySummary = Array.from(monthlySummaryMap.values()).reverse();

 // Charts Data
 const revenueTrendData: RevenueTrendDataPoint[] = Array.from(dailyBreakdownMap.values())
 .map(d => ({
 date: d.date.substring(0, 6), // 'MMM dd'
 revenue: d.netRevenue,
 profit: d.estimatedProfit
 })).reverse(); // oldest first for charts

 const paymentStatusData: PaymentStatusDataPoint[] = [
 { name: 'Paid Online', value: paidOrdersValue - codOrdersValue, color: '#10b981' },
 { name: 'Cash on Delivery', value: codOrdersValue, color: '#3b82f6' },
 { name: 'Pending', value: pendingPaymentsValue, color: '#f59e0b' }
 ].filter(d => d.value > 0);

 return {
 kpis,
 charts: {
 trend: revenueTrendData,
 paymentStatus: paymentStatusData
 },
 tables: {
 daily: dailyBreakdown,
 monthly: monthlySummary
 }
 };
 },

 getEmptyState() {
 return {
 kpis: {
 revenue: 0, shippingIncome: 0, discounts: 0, estimatedProfit: 0,
 codOrdersCount: 0, codOrdersValue: 0, pendingPaymentsCount: 0, pendingPaymentsValue: 0
 },
 charts: { trend: [], paymentStatus: [] },
 tables: { daily: [], monthly: [] }
 };
 }
};
