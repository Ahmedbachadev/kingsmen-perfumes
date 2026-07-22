import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { DailyRevenueBreakdown, MonthlyFinancialSummary } from '../types';

export const exportFinancialsToCSV = (data: DailyRevenueBreakdown[], filename: string) => {
 if (!data || !data.length) return;
 const flatData = data.map(d => ({
 Date: d.date,
 'Gross Revenue': d.grossRevenue,
 Discounts: d.discounts,
 'Shipping Income': d.shipping,
 'Net Revenue': d.netRevenue,
 'Estimated Profit': d.estimatedProfit
 }));
 const ws = XLSX.utils.json_to_sheet(flatData);
 const csv = XLSX.utils.sheet_to_csv(ws);
 const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
 const url = URL.createObjectURL(blob);
 const link = document.createElement('a');
 link.setAttribute('href', url);
 link.setAttribute('download', `${filename}.csv`);
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
};

export const exportFinancialsToExcel = (daily: DailyRevenueBreakdown[], monthly: MonthlyFinancialSummary[], filename: string) => {
 const wb = XLSX.utils.book_new();

 const dailyData = daily.map(d => ({
 Date: d.date,
 'Gross Revenue': d.grossRevenue,
 Discounts: d.discounts,
 'Shipping Income': d.shipping,
 'Net Revenue': d.netRevenue,
 'Estimated Profit': d.estimatedProfit
 }));
 const wsDaily = XLSX.utils.json_to_sheet(dailyData);
 XLSX.utils.book_append_sheet(wb, wsDaily, 'Daily Breakdown');

 const monthlyData = monthly.map(d => ({
 Month: d.month,
 'Gross Revenue': d.grossRevenue,
 Discounts: d.discounts,
 'Shipping Income': d.shipping,
 'Net Revenue': d.netRevenue,
 'Estimated Profit': d.estimatedProfit,
 'Profit Margin (%)': d.profitMargin.toFixed(1)
 }));
 const wsMonthly = XLSX.utils.json_to_sheet(monthlyData);
 XLSX.utils.book_append_sheet(wb, wsMonthly, 'Monthly Summary');

 XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportFinancialsToPDF = (daily: DailyRevenueBreakdown[], monthly: MonthlyFinancialSummary[], filename: string) => {
 const doc = new jsPDF();
 doc.setFontSize(20);
 doc.text('Financial Reports', 14, 22);

 doc.setFontSize(14);
 doc.text('Monthly Financial Summary', 14, 35);
 // @ts-ignore
 doc.autoTable({
 startY: 40,
 head: [['Month', 'Gross Rev', 'Net Rev', 'Est. Profit', 'Margin']],
 body: monthly.map(m => [
 m.month, 
 `$${m.grossRevenue.toFixed(2)}`, 
 `$${m.netRevenue.toFixed(2)}`, 
 `$${m.estimatedProfit.toFixed(2)}`,
 `${m.profitMargin.toFixed(1)}%`
 ]),
 theme: 'grid'
 });

 // @ts-ignore
 const nextY = doc.lastAutoTable.finalY + 15;

 doc.text('Daily Revenue Breakdown (Recent)', 14, nextY);
 // @ts-ignore
 doc.autoTable({
 startY: nextY + 5,
 head: [['Date', 'Gross', 'Discounts', 'Shipping', 'Net', 'Profit']],
 body: daily.slice(0, 20).map(d => [
 d.date, 
 `$${d.grossRevenue.toFixed(2)}`, 
 `-$${d.discounts.toFixed(2)}`, 
 `+$${d.shipping.toFixed(2)}`, 
 `$${d.netRevenue.toFixed(2)}`,
 `$${d.estimatedProfit.toFixed(2)}`
 ]),
 theme: 'grid'
 });

 doc.save(`${filename}.pdf`);
};
