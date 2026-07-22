import React from 'react';
import { ExportForm } from '../components/ExportForm';
import { ExportHistoryTable } from '../components/ExportHistoryTable';
import { HardDriveDownload } from 'lucide-react';

export default function ExportCenterPage() {
 return (
 <div className="min-h-screen bg-neutral-50 p-4 sm:p-6 lg:p-8">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
 <div>
 <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
 <HardDriveDownload className="w-6 h-6 text-neutral-500" />
 Export Center
 </h1>
 <p className="text-sm text-neutral-500 mt-1">
 Generate and manage bulk data exports from across your store.
 </p>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="lg:col-span-1">
 <ExportForm />
 </div>
 <div className="lg:col-span-2 mt-6 lg:mt-0">
 <ExportHistoryTable />
 </div>
 </div>
 </div>
 );
}
