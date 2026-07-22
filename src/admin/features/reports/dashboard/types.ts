export type DateRange = 'today' | 'yesterday' | '7days' | '30days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';

export interface DateFilter {
 startDate: Date;
 endDate: Date;
 range: DateRange;
}

export interface KPIStats {
 totalRevenue: number;
 revenueChange: number; // percentage
 totalOrders: number;
 ordersChange: number;
 totalCustomers: number;
 customersChange: number;
 productsSold: number;
 productsSoldChange: number;
 averageOrderValue: number;
 aovChange: number;
 conversionRate: number;
 conversionRateChange: number;
 refundRate: number;
 refundRateChange: number;
}

export interface TrendDataPoint {
 date: string; // ISO date string or formatted label
 revenue: number;
 orders: number;
}

export interface TopProduct {
 id: string;
 title: string;
 sold: number;
 revenue: number;
}

export interface CategorySales {
 name: string;
 value: number; // percentage or total sales
 color: string;
}

export interface ActivityItem {
 id: string;
 type: 'order' | 'customer' | 'inventory';
 title: string;
 description: string;
 timestamp: string;
 amount?: number;
}
