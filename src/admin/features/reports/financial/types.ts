export type DateRangePreset = 'today' | 'yesterday' | '7days' | '30days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';

export interface FinancialFilters {
 dateRange: {
 preset: DateRangePreset;
 startDate: Date;
 endDate: Date;
 };
}

export interface FinancialKPIs {
 revenue: number;
 shippingIncome: number;
 discounts: number;
 estimatedProfit: number;
 codOrdersCount: number;
 codOrdersValue: number;
 pendingPaymentsCount: number;
 pendingPaymentsValue: number;
}

export interface RevenueTrendDataPoint {
 date: string;
 revenue: number;
 profit: number;
}

export interface PaymentStatusDataPoint {
 name: string;
 value: number;
 color: string;
}

export interface DailyRevenueBreakdown {
 date: string;
 grossRevenue: number;
 discounts: number;
 shipping: number;
 netRevenue: number;
 estimatedProfit: number;
}

export interface MonthlyFinancialSummary {
 month: string;
 grossRevenue: number;
 discounts: number;
 shipping: number;
 netRevenue: number;
 estimatedProfit: number;
 profitMargin: number;
}
