import { supabase } from '../../../../../lib/supabase';
import type { ExportEntity, ExportFormat, ExportJob, DateRangePreset } from '../types';
import { v4 as uuidv4 } from 'uuid';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// In-memory store for the session to hold blob URLs
let exportJobs: ExportJob[] = [];
let listeners: ((jobs: ExportJob[]) => void)[] = [];

const notifyListeners = () => {
 listeners.forEach(l => l([...exportJobs]));
};

export const ExportService = {
 subscribe(listener: (jobs: ExportJob[]) => void) {
 listeners.push(listener);
 listener([...exportJobs]);
 return () => {
 listeners = listeners.filter(l => l !== listener);
 };
 },

 getJobs() {
 return [...exportJobs];
 },

 deleteJob(id: string) {
 exportJobs = exportJobs.filter(j => j.id !== id);
 notifyListeners();
 },

 async initiateExport(entity: ExportEntity, format: ExportFormat, preset: DateRangePreset) {
 const id = uuidv4();
 const filename = `Kingsmen_${entity.replace(/\s+/g, '_')}_${new Date().getTime()}`;
 
 const newJob: ExportJob = {
 id,
 entity,
 format,
 status: 'Processing',
 filename: `${filename}.${format.toLowerCase()}`,
 createdAt: new Date().toISOString(),
 filters: { dateRangePreset: preset }
 };

 exportJobs = [newJob, ...exportJobs];
 notifyListeners();

 // Simulate background processing queue
 setTimeout(() => {
 this.processExport(id);
 }, 2000); // 2 second delay to simulate loading
 },

 async processExport(id: string) {
 const jobIndex = exportJobs.findIndex(j => j.id === id);
 if (jobIndex === -1) return;
 const job = exportJobs[jobIndex];

 try {
 // 1. Fetch relevant data (Simulated generic fetch for demo purposes)
 let data: any[] = [];
 let headers: string[] = [];

 switch (job.entity) {
 case 'Products':
 case 'Inventory':
 const { data: pData } = await supabase.from('products').select('*');
 data = pData || [];
 headers = ['title', 'sku', 'price', 'inventory_quantity', 'category'];
 break;
 case 'Orders':
 case 'Sales Reports':
 case 'Financial Reports':
 const { data: oData } = await supabase.from('orders').select('*');
 data = oData || [];
 headers = ['id', 'status', 'total_amount', 'created_at', 'customer_id'];
 break;
 case 'Customers':
 const { data: cData } = await supabase.from('profiles').select('*');
 data = cData || [];
 headers = ['id', 'email', 'full_name', 'created_at'];
 break;
 case 'Newsletter':
 case 'Collections':
 default:
 // Dummy fallback
 data = [{ info: `Simulated data for ${job.entity}`, date: new Date().toISOString() }];
 headers = ['info', 'date'];
 break;
 }

 // 2. Format Data
 const formattedData = data.map((item: any) => {
 const row: any = {};
 headers.forEach(h => row[h] = item[h] || '');
 return row;
 });

 // 3. Generate Blob URL based on Format
 let blobUrl = '';

 if (job.format === 'CSV') {
 const ws = XLSX.utils.json_to_sheet(formattedData);
 const csv = XLSX.utils.sheet_to_csv(ws);
 const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
 blobUrl = URL.createObjectURL(blob);
 } else if (job.format === 'Excel') {
 const wb = XLSX.utils.book_new();
 const ws = XLSX.utils.json_to_sheet(formattedData);
 XLSX.utils.book_append_sheet(wb, ws, 'Data');
 
 // Write to array buffer
 const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
 const blob = new Blob([wbout], { type: 'application/octet-stream' });
 blobUrl = URL.createObjectURL(blob);
 } else if (job.format === 'PDF') {
 const doc = new jsPDF();
 doc.text(`${job.entity} Export`, 14, 20);
 // @ts-ignore
 doc.autoTable({
 startY: 30,
 head: [headers.map(h => h.toUpperCase())],
 body: formattedData.map(d => headers.map(h => String(d[h]).substring(0, 50))),
 theme: 'grid',
 styles: { fontSize: 8 }
 });
 const blob = doc.output('blob');
 blobUrl = URL.createObjectURL(blob);
 }

 // 4. Update Job
 exportJobs[jobIndex] = {
 ...job,
 status: 'Completed',
 completedAt: new Date().toISOString(),
 blobUrl
 };
 notifyListeners();

 } catch (error: any) {
 console.error('Export generation failed', error);
 exportJobs[jobIndex] = {
 ...job,
 status: 'Failed',
 completedAt: new Date().toISOString(),
 error: error.message
 };
 notifyListeners();
 }
 }
};
