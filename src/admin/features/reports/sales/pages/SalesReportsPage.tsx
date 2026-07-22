import React, { useState, useEffect } from 'react';
import { SalesFilters as FilterComponent } from '../components/SalesFilters';
import { SalesKPIs } from '../components/SalesKPIs';
import { SalesCharts } from '../components/SalesCharts';
import { SalesTables } from '../components/SalesTables';
import { ExportMenu } from '../components/ExportMenu';
import { SalesService } from '../services/sales.service';
import { exportToCSV, exportToExcel, exportToPDF } from '../utils/export.utils';
import type { SalesFilters, SalesKPIs as KPIStats, RevenueDataPoint, SalesTableOrder, BestRevenueDay, SalesByCollection, SalesByProduct } from '../types';
import { startOfDay, endOfDay } from 'date-fns';
import { BarChart3 } from 'lucide-react';

export default function SalesReportsPage() {
 const [filters, setFilters] = useState<SalesFilters>({
 dateRange: {
 preset: '30days',
 startDate: startOfDay(new Date(new Date().setDate(new Date().getDate() - 30))),
 endDate: endOfDay(new Date())
 },
 collection: 'all',
 paymentMethod: 'all',
 orderStatus: 'all'
 });

 const [isLoading, setIsLoading] = useState(true);
 const [data, setData] = useState<{
 kpis: KPIStats;
 charts: { daily: RevenueDataPoint[], weekly: RevenueDataPoint[], monthly: RevenueDataPoint[], yearly: RevenueDataPoint[] };
 tables: { orders: SalesTableOrder[], bestDays: BestRevenueDay[], collections: SalesByCollection[], products: SalesByProduct[] };
 } | null>(null);

 useEffect(() => {
 fetchData();
 }, [filters]);

 const fetchData = async () => {
 setIsLoading(true);
 try {
 const result = await SalesService.getReportData(filters);
 setData(result);
 } catch (error) {
 console.error('Failed to load sales data', error);
 } finally {
 setIsLoading(false);
 }
 };

 const handleExportCSV = () => {
 if (data) exportToCSV(data.tables.orders, 'sales-orders-report');
 };

 const handleExportExcel = () => {
 if (data) {
 exportToExcel(
 data.kpis, 
 data.tables.orders, 
 data.tables.collections, 
 data.tables.products, 
 data.tables.bestDays, 
 'Kingsmen_Sales_Report'
 );
 }
 };

 const handleExportPDF = () => {
 if (data) {
 exportToPDF(
 data.kpis, 
 data.tables.orders, 
 data.tables.collections, 
 data.tables.products, 
 'Kingsmen_Sales_Report'
 );
 }
 };

 return (
 <div className="min-h-screen bg-neutral-50 p-4 sm:p-6 lg:p-8">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
 <div>
 <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
 <BarChart3 className="w-6 h-6 text-neutral-500" />
 Sales Reports
 </h1>
 <p className="text-sm text-neutral-500 mt-1">
 Detailed breakdown of your sales performance.
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
 <SalesKPIs kpis={data.kpis} isLoading={isLoading} />
 <SalesCharts charts={data.charts} isLoading={isLoading} />
 <SalesTables tables={data.tables} isLoading={isLoading} />
 </>
 )}
 </div>
 );
}
