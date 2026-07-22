import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { ProductKPIs } from '../types';

export const exportProductsToCSV = (data: any[], filename: string) => {
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

export const exportProductsToExcel = (kpis: ProductKPIs, filename: string) => {
 const wb = XLSX.utils.book_new();

 const addSheet = (data: any[], sheetName: string) => {
 if (data.length > 0) {
 const ws = XLSX.utils.json_to_sheet(data);
 XLSX.utils.book_append_sheet(wb, ws, sheetName);
 }
 };

 addSheet(kpis.bestSellers, 'Best Sellers');
 addSheet(kpis.worstSellers, 'Worst Sellers');
 addSheet(kpis.mostViewed, 'Most Viewed');
 addSheet(kpis.lowStock, 'Low Stock');
 addSheet(kpis.outOfStock, 'Out of Stock');
 addSheet(kpis.neverSold, 'Never Sold');

 XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportProductsToPDF = (kpis: ProductKPIs, filename: string) => {
 const doc = new jsPDF();
 doc.setFontSize(20);
 doc.text('Product Analytics Report', 14, 22);

 const addTable = (title: string, data: any[], startY: number) => {
 doc.setFontSize(14);
 doc.text(title, 14, startY);
 // @ts-ignore
 doc.autoTable({
 startY: startY + 5,
 head: [['Product', 'SKU', 'Category', 'Sold', 'Revenue', 'Inventory']],
 body: data.slice(0, 15).map(p => [p.title, p.sku || 'N/A', p.category, p.sold, `$${p.revenue.toFixed(2)}`, p.inventory]),
 theme: 'grid',
 styles: { fontSize: 8 }
 });
 // @ts-ignore
 return doc.lastAutoTable.finalY + 15;
 };

 let currentY = 35;
 if (kpis.bestSellers.length) currentY = addTable('Best Sellers', kpis.bestSellers, currentY);
 if (kpis.lowStock.length) currentY = addTable('Low Stock Products', kpis.lowStock, currentY);
 if (kpis.outOfStock.length) currentY = addTable('Out of Stock Products', kpis.outOfStock, currentY);

 doc.save(`${filename}.pdf`);
};
