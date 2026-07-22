import React, { useState, useEffect } from 'react';
import { CollectionFilters as FilterComponent } from '../components/CollectionFilters';
import { CollectionKPIs } from '../components/CollectionKPIs';
import { CollectionCharts } from '../components/CollectionCharts';
import { CollectionTables } from '../components/CollectionTables';
import { ExportMenu } from '../../sales/components/ExportMenu';
import { CollectionAnalyticsService } from '../services/collection-analytics.service';
import { exportCollectionsToCSV, exportCollectionsToExcel, exportCollectionsToPDF } from '../utils/export.utils';
import type { 
 CollectionFilters, 
 CollectionKPIs as KPIStats, 
 CollectionChartDataPoint, 
 CollectionGrowthDataPoint,
 CollectionAnalyticItem
} from '../types';
import { startOfDay, endOfDay } from 'date-fns';
import { Layers } from 'lucide-react';

export default function CollectionAnalyticsPage() {
 const [filters, setFilters] = useState<CollectionFilters>({
 dateRange: {
 preset: '30days',
 startDate: startOfDay(new Date(new Date().setDate(new Date().getDate() - 30))),
 endDate: endOfDay(new Date())
 },
 collection: 'all'
 });

 const [isLoading, setIsLoading] = useState(true);
 const [data, setData] = useState<{
 kpis: KPIStats;
 charts: { 
 distribution: CollectionChartDataPoint[], 
 growth: CollectionGrowthDataPoint[]
 };
 tables: {
 rankings: CollectionAnalyticItem[],
 inventory: CollectionAnalyticItem[]
 }
 } | null>(null);

 useEffect(() => {
 fetchData();
 }, [filters]);

 const fetchData = async () => {
 setIsLoading(true);
 try {
 const result = await CollectionAnalyticsService.getReportData(filters);
 setData(result);
 } catch (error) {
 console.error('Failed to load collection analytics data', error);
 } finally {
 setIsLoading(false);
 }
 };

 const handleExportCSV = () => {
 if (data) exportCollectionsToCSV(data.tables.rankings, 'collection-analytics-report');
 };

 const handleExportExcel = () => {
 if (data) {
 exportCollectionsToExcel(data.tables.rankings, data.tables.inventory, 'Kingsmen_Collection_Analytics');
 }
 };

 const handleExportPDF = () => {
 if (data) {
 exportCollectionsToPDF(data.tables.rankings, data.tables.inventory, 'Kingsmen_Collection_Analytics');
 }
 };

 return (
 <div className="min-h-screen bg-neutral-50 p-4 sm:p-6 lg:p-8">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
 <div>
 <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
 <Layers className="w-6 h-6 text-neutral-500" />
 Collection Analytics
 </h1>
 <p className="text-sm text-neutral-500 mt-1">
 Analyze the performance and health of your product collections.
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
 <CollectionKPIs kpis={data.kpis} isLoading={isLoading} />
 <CollectionCharts charts={data.charts} isLoading={isLoading} />
 <CollectionTables data={data.tables} isLoading={isLoading} />
 </>
 )}
 </div>
 );
}
