import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { SalesKPIs, SalesByCollection, SalesByProduct, SalesTableOrder, BestRevenueDay } from '../types';

export const exportToCSV = (data: any[], filename: string) => {
 if (!data || !data.length) return;
 const ws = XLSX.utils.json_to_sheet(data);
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

export const exportToExcel = (
 kpis: SalesKPIs,
 orders: SalesTableOrder[],
 collections: SalesByCollection[],
 products: SalesByProduct[],
 days: BestRevenueDay[],
 filename: string
) => {
 const wb = XLSX.utils.book_new();

 // KPIs Sheet
 const kpiData = [
 { Metric: 'Revenue', Value: kpis.revenue },
 { Metric: 'Gross Sales', Value: kpis.grossSales },
 { Metric: 'Net Sales', Value: kpis.netSales },
 { Metric: 'Total Orders', Value: kpis.orders },
 { Metric: 'Average Order Value', Value: kpis.averageOrderValue },
 { Metric: 'Completed Orders', Value: kpis.completedOrders },
 { Metric: 'Pending Orders', Value: kpis.pendingOrders },
 { Metric: 'Cancelled Orders', Value: kpis.cancelledOrders }
 ];
 const wsKPI = XLSX.utils.json_to_sheet(kpiData);
 XLSX.utils.book_append_sheet(wb, wsKPI, 'Summary');

 // Orders Sheet
 const wsOrders = XLSX.utils.json_to_sheet(orders);
 XLSX.utils.book_append_sheet(wb, wsOrders, 'Top Orders');

 // Collections Sheet
 const wsCollections = XLSX.utils.json_to_sheet(collections);
 XLSX.utils.book_append_sheet(wb, wsCollections, 'Collections');

 // Products Sheet
 const wsProducts = XLSX.utils.json_to_sheet(products);
 XLSX.utils.book_append_sheet(wb, wsProducts, 'Products');

 // Days Sheet
 const wsDays = XLSX.utils.json_to_sheet(days);
 XLSX.utils.book_append_sheet(wb, wsDays, 'Top Days');

 XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportToPDF = (
 kpis: SalesKPIs,
 orders: SalesTableOrder[],
 collections: SalesByCollection[],
 products: SalesByProduct[],
 filename: string
) => {
 const doc = new jsPDF();

 doc.setFontSize(20);
 doc.text('Sales Report', 14, 22);

 doc.setFontSize(12);
 doc.text(`Revenue: $${kpis.revenue.toFixed(2)}`, 14, 32);
 doc.text(`Gross Sales: $${kpis.grossSales.toFixed(2)}`, 14, 38);
 doc.text(`Net Sales: $${kpis.netSales.toFixed(2)}`, 14, 44);
 doc.text(`Orders: ${kpis.orders}`, 14, 50);

 // @ts-ignore - jspdf-autotable extends jspdf
 doc.autoTable({
 startY: 60,
 head: [['Order ID', 'Date', 'Customer', 'Total', 'Status']],
 body: orders.slice(0, 20).map(o => [o.id, o.date, o.customer, `$${o.total.toFixed(2)}`, o.status]),
 theme: 'grid'
 });

 // @ts-ignore
 doc.autoTable({
 head: [['Product', 'Sold', 'Revenue']],
 body: products.slice(0, 20).map(p => [p.product, p.sold, `$${p.revenue.toFixed(2)}`]),
 theme: 'grid'
 });

 // @ts-ignore
 doc.autoTable({
 head: [['Collection', 'Orders', 'Revenue']],
 body: collections.slice(0, 20).map(c => [c.collection, c.orders, `$${c.revenue.toFixed(2)}`]),
 theme: 'grid'
 });

 doc.save(`${filename}.pdf`);
};
