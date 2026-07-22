export type DateRangePreset = 'today' | 'yesterday' | '7days' | '30days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';

export interface SalesFilters {
 dateRange: {
 preset: DateRangePreset;
 startDate: Date;
 endDate: Date;
 };
 collection?: string;
 paymentMethod?: string;
 orderStatus?: string;
}

export interface SalesKPIs {
 revenue: number;
 grossSales: number;
 netSales: number;
 orders: number;
 averageOrderValue: number;
 cancelledOrders: number;
 pendingOrders: number;
 completedOrders: number;
}

export interface RevenueDataPoint {
 date: string; // Used for X axis label (e.g. 'Mon', 'Week 1', 'Jan')
 revenue: number;
}

export interface SalesTableOrder {
 id: string;
 date: string;
 customer: string;
 total: number;
 status: string;
}

export interface BestRevenueDay {
 date: string;
 revenue: number;
 orders: number;
}

export interface SalesByCollection {
 collection: string;
 revenue: number;
 orders: number;
}

export interface SalesByProduct {
 product: string;
 revenue: number;
 sold: number;
}
