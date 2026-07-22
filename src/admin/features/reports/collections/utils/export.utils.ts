import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { CollectionAnalyticItem } from '../types';

export const exportCollectionsToCSV = (data: CollectionAnalyticItem[], filename: string) => {
 if (!data || !data.length) return;
 const flatData = data.map(d => ({
 Collection: d.name,
 Revenue: d.revenue,
 Orders: d.orders,
 'Products Sold': Math.floor(d.orders * 1.5), // Simulation match
 'SKU Count': d.productsCount,
 'Stock on Hand': d.inventoryCount,
 'Out of Stock SKUs': d.outOfStockCount
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

export const exportCollectionsToExcel = (rankings: CollectionAnalyticItem[], inventory: CollectionAnalyticItem[], filename: string) => {
 const wb = XLSX.utils.book_new();

 const rankingsData = rankings.map((d, i) => ({
 Rank: i + 1,
 Collection: d.name,
 Orders: d.orders,
 'Products Sold': Math.floor(d.orders * 1.5),
 Revenue: d.revenue
 }));
 const wsRankings = XLSX.utils.json_to_sheet(rankingsData);
 XLSX.utils.book_append_sheet(wb, wsRankings, 'Rankings');

 const inventoryData = inventory.map(d => ({
 Collection: d.name,
 'SKU Count': d.productsCount,
 'Stock on Hand': d.inventoryCount,
 'Out of Stock SKUs': d.outOfStockCount
 }));
 const wsInventory = XLSX.utils.json_to_sheet(inventoryData);
 XLSX.utils.book_append_sheet(wb, wsInventory, 'Inventory');

 XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const exportCollectionsToPDF = (rankings: CollectionAnalyticItem[], inventory: CollectionAnalyticItem[], filename: string) => {
 const doc = new jsPDF();
 doc.setFontSize(20);
 doc.text('Collection Analytics Report', 14, 22);

 doc.setFontSize(14);
 doc.text('Collection Rankings', 14, 35);
 // @ts-ignore
 doc.autoTable({
 startY: 40,
 head: [['Rank', 'Collection', 'Orders', 'Revenue']],
 body: rankings.map((c, i) => [i + 1, c.name, c.orders, `$${c.revenue.toFixed(2)}`]),
 theme: 'grid'
 });

 // @ts-ignore
 const nextY = doc.lastAutoTable.finalY + 15;

 doc.text('Collection Inventory Health', 14, nextY);
 // @ts-ignore
 doc.autoTable({
 startY: nextY + 5,
 head: [['Collection', 'Total SKUs', 'Stock on Hand', 'Out of Stock']],
 body: inventory.map(c => [c.name, c.productsCount, c.inventoryCount, c.outOfStockCount]),
 theme: 'grid'
 });

 doc.save(`${filename}.pdf`);
};
