import React, { useState } from 'react';
import type { ExportEntity, ExportFormat, DateRangePreset } from '../types';
import { ExportService } from '../services/export.service';
import { DownloadCloud, Layers, Calendar, FileType } from 'lucide-react';
import { cn } from '../../../../utils/cn';

const entities: ExportEntity[] = [
 'Products', 'Orders', 'Customers', 'Inventory', 
 'Collections', 'Newsletter', 'Sales Reports', 'Financial Reports'
];

const formats: ExportFormat[] = ['CSV', 'Excel', 'PDF'];

const presets: { label: string; value: DateRangePreset }[] = [
 { label: 'All Time', value: 'all' },
 { label: 'Today', value: 'today' },
 { label: 'Yesterday', value: 'yesterday' },
 { label: 'Last 7 Days', value: '7days' },
 { label: 'Last 30 Days', value: '30days' },
 { label: 'This Month', value: 'thisMonth' },
 { label: 'Last Month', value: 'lastMonth' },
 { label: 'This Year', value: 'thisYear' },
];

export const ExportForm: React.FC = () => {
 const [selectedEntity, setSelectedEntity] = useState<ExportEntity>('Orders');
 const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('CSV');
 const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>('all');
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleExport = async () => {
 setIsSubmitting(true);
 await ExportService.initiateExport(selectedEntity, selectedFormat, selectedPreset);
 setIsSubmitting(false);
 };

 return (
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
 <h2 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
 <DownloadCloud className="w-5 h-5 text-neutral-500" />
 New Export Job
 </h2>

 <div className="space-y-6">
 {/* Entity Selection */}
 <div>
 <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-3">
 <Layers className="w-4 h-4" /> Data Type
 </label>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 {entities.map(entity => (
 <button
 key={entity}
 onClick={() => setSelectedEntity(entity)}
 className={cn(
 "px-3 py-2 text-sm rounded-lg border transition-all text-left",
 selectedEntity === entity 
 ? "border-neutral-900 bg-neutral-900 text-white font-medium" 
 : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
 )}
 >
 {entity}
 </button>
 ))}
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* Format Selection */}
 <div>
 <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-3">
 <FileType className="w-4 h-4" /> Format
 </label>
 <div className="flex gap-3">
 {formats.map(format => (
 <button
 key={format}
 onClick={() => setSelectedFormat(format)}
 className={cn(
 "flex-1 px-4 py-2 text-sm rounded-lg border transition-all",
 selectedFormat === format 
 ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-medium" 
 : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
 )}
 >
 {format}
 </button>
 ))}
 </div>
 </div>

 {/* Date Range Selection */}
 <div>
 <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-3">
 <Calendar className="w-4 h-4" /> Date Range
 </label>
 <select
 value={selectedPreset}
 onChange={(e) => setSelectedPreset(e.target.value as DateRangePreset)}
 className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
 >
 {presets.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
 </select>
 </div>
 </div>

 {/* Action */}
 <div className="pt-4 border-t border-neutral-100 ">
 <button
 onClick={handleExport}
 disabled={isSubmitting}
 className="w-full bg-neutral-900 text-white hover:bg-neutral-800 px-6 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
 >
 {isSubmitting ? (
 <>
 <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
 Initializing...
 </>
 ) : (
 <>
 <DownloadCloud className="w-4 h-4" />
 Start Export
 </>
 )}
 </button>
 </div>
 </div>
 </div>
 );
};
