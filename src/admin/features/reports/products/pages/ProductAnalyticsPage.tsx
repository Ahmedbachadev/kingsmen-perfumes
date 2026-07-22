import React, { useState, useEffect } from 'react';
import { ProductFilters as FilterComponent } from '../components/ProductFilters';
import { ProductKPIs } from '../components/ProductKPIs';
import { ProductCharts } from '../components/ProductCharts';
import { ProductTables } from '../components/ProductTables';
import { ExportMenu } from '../../sales/components/ExportMenu';
import { ProductAnalyticsService } from '../services/product-analytics.service';
import { exportProductsToCSV, exportProductsToExcel, exportProductsToPDF } from '../utils/export.utils';
import type { 
 ProductFilters, 
 ProductKPIs as KPIStats, 
 SalesPerProductDataPoint, 
 InventoryTrendDataPoint, 
 CollectionPerformanceDataPoint 
} from '../types';
import { startOfDay, endOfDay } from 'date-fns';
import { PackageSearch } from 'lucide-react';

export default function ProductAnalyticsPage() {
 const [filters, setFilters] = useState<ProductFilters>({
 dateRange: {
 preset: '30days',
 startDate: startOfDay(new Date(new Date().setDate(new Date().getDate() - 30))),
 endDate: endOfDay(new Date())
 },
 category: 'all',
 collection: 'all',
 status: 'all'
 });

 const [isLoading, setIsLoading] = useState(true);
 const [data, setData] = useState<{
 kpis: KPIStats;
 charts: { 
 salesPerProduct: SalesPerProductDataPoint[], 
 inventoryTrend: InventoryTrendDataPoint[], 
 collectionPerformance: CollectionPerformanceDataPoint[] 
 };
 } | null>(null);

 useEffect(() => {
 fetchData();
 }, [filters]);

 const fetchData = async () => {
 setIsLoading(true);
 try {
 const result = await ProductAnalyticsService.getReportData(filters);
 setData(result);
 } catch (error) {
 console.error('Failed to load product analytics data', error);
 } finally {
 setIsLoading(false);
 }
 };

 const handleExportCSV = () => {
 if (data) exportProductsToCSV(data.kpis.bestSellers, 'product-best-sellers-report');
 };

 const handleExportExcel = () => {
 if (data) {
 exportProductsToExcel(data.kpis, 'Kingsmen_Product_Analytics');
 }
 };

 const handleExportPDF = () => {
 if (data) {
 exportProductsToPDF(data.kpis, 'Kingsmen_Product_Analytics');
 }
 };

 return (
 <div className="min-h-screen bg-neutral-50 p-4 sm:p-6 lg:p-8">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
 <div>
 <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
 <PackageSearch className="w-6 h-6 text-neutral-500" />
 Product Analytics
 </h1>
 <p className="text-sm text-neutral-500 mt-1">
 Deep dive into inventory health and product performance.
 </p>
 </div>
 <ExportMenu 
 onExportCSV={handleExportCSV} 
 onExportExcel={handleExportExcel} 
 onExportPDF={handleExportPDF} 
 />
 </div>

 <FilterComponent filters={filters} onChange={setFilters} />

 {data && (
 <>
 <ProductKPIs kpis={data.kpis} isLoading={isLoading} />
 <ProductCharts charts={data.charts} isLoading={isLoading} />
 <ProductTables data={data.kpis} isLoading={isLoading} />
 </>
 )}
 </div>
 );
}
