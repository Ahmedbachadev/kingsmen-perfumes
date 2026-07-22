export type DateRangePreset = 'today' | 'yesterday' | '7days' | '30days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';

export interface ProductFilters {
 dateRange: {
 preset: DateRangePreset;
 startDate: Date;
 endDate: Date;
 };
 category?: string;
 collection?: string;
 status?: string;
}

export interface ProductAnalyticItem {
 id: string;
 title: string;
 sku?: string;
 category: string;
 sold: number;
 revenue: number;
 views: number;
 inventory: number;
 status: string;
}

export interface ProductKPIs {
 bestSellers: ProductAnalyticItem[];
 worstSellers: ProductAnalyticItem[];
 mostViewed: ProductAnalyticItem[];
 neverSold: ProductAnalyticItem[];
 lowStock: ProductAnalyticItem[];
 outOfStock: ProductAnalyticItem[];
}

export interface SalesPerProductDataPoint {
 product: string;
 revenue: number;
 sold: number;
}

export interface InventoryTrendDataPoint {
 date: string;
 stockIn: number;
 stockOut: number;
 balance: number;
}

export interface CollectionPerformanceDataPoint {
 name: string;
 value: number; // revenue or units sold
 color: string;
}
