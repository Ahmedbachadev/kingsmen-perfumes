import React, { useState, useEffect } from 'react';
import { FinancialFilters as FilterComponent } from '../components/FinancialFilters';
import { FinancialKPIs } from '../components/FinancialKPIs';
import { FinancialCharts } from '../components/FinancialCharts';
import { FinancialTables } from '../components/FinancialTables';
import { ExportMenu } from '../../sales/components/ExportMenu';
import { FinancialReportsService } from '../services/financial-reports.service';
import { exportFinancialsToCSV, exportFinancialsToExcel, exportFinancialsToPDF } from '../utils/export.utils';
import type { 
 FinancialFilters, 
 FinancialKPIs as KPIStats, 
 RevenueTrendDataPoint,
 PaymentStatusDataPoint,
 DailyRevenueBreakdown,
 MonthlyFinancialSummary
} from '../types';
import { startOfDay, endOfDay } from 'date-fns';
import { Wallet } from 'lucide-react';

export default function FinancialReportsPage() {
 const [filters, setFilters] = useState<FinancialFilters>({
 dateRange: {
 preset: '30days',
 startDate: startOfDay(new Date(new Date().setDate(new Date().getDate() - 30))),
 endDate: endOfDay(new Date())
 }
 });

 const [isLoading, setIsLoading] = useState(true);
 const [data, setData] = useState<{
 kpis: KPIStats;
 charts: { 
 trend: RevenueTrendDataPoint[], 
 paymentStatus: PaymentStatusDataPoint[]
 };
 tables: {
 daily: DailyRevenueBreakdown[],
 monthly: MonthlyFinancialSummary[]
 }
 } | null>(null);

 useEffect(() => {
 fetchData();
 }, [filters]);

 const fetchData = async () => {
 setIsLoading(true);
 try {
 const result = await FinancialReportsService.getReportData(filters);
 setData(result);
 } catch (error) {
 console.error('Failed to load financial data', error);
 } finally {
 setIsLoading(false);
 }
 };

 const handleExportCSV = () => {
 if (data) exportFinancialsToCSV(data.tables.daily, 'financial-reports-daily');
 };

 const handleExportExcel = () => {
 if (data) {
 exportFinancialsToExcel(data.tables.daily, data.tables.monthly, 'Kingsmen_Financial_Reports');
 }
 };

 const handleExportPDF = () => {
 if (data) {
 exportFinancialsToPDF(data.tables.daily, data.tables.monthly, 'Kingsmen_Financial_Reports');
 }
 };

 return (
 <div className="min-h-screen bg-neutral-50 p-4 sm:p-6 lg:p-8">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
 <div>
 <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
 <Wallet className="w-6 h-6 text-neutral-500" />
 Financial Reports
 </h1>
 <p className="text-sm text-neutral-500 mt-1">
 Track revenue, cash flow, discounts, and estimated profits.
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
 <FinancialKPIs kpis={data.kpis} isLoading={isLoading} />
 <FinancialCharts charts={data.charts} isLoading={isLoading} />
 <FinancialTables data={data.tables} isLoading={isLoading} />
 </>
 )}
 </div>
 );
}
