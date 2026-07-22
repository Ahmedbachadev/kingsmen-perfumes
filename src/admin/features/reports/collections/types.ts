export type DateRangePreset = 'today' | 'yesterday' | '7days' | '30days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom';

export interface CollectionFilters {
 dateRange: {
 preset: DateRangePreset;
 startDate: Date;
 endDate: Date;
 };
 collection?: string;
}

export interface CollectionAnalyticItem {
 id: string;
 name: string;
 revenue: number;
 orders: number;
 productsCount: number;
 inventoryCount: number;
 outOfStockCount: number;
}

export interface CollectionKPIs {
 bestPerforming: CollectionAnalyticItem | null;
 lowestPerforming: CollectionAnalyticItem | null;
 totalRevenue: number;
 totalOrders: number;
 totalProducts: number;
}

export interface CollectionChartDataPoint {
 collection: string;
 revenue: number;
 orders: number;
 color: string;
}

export interface CollectionGrowthDataPoint {
 date: string;
 [collectionName: string]: number | string; // Dynamic keys for each collection's revenue that day/week/month
}
