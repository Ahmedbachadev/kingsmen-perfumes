import React, { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileText, File as FileIcon } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface ExportMenuProps {
 onExportCSV: () => void;
 onExportExcel: () => void;
 onExportPDF: () => void;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({
 onExportCSV,
 onExportExcel,
 onExportPDF
}) => {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const handleClickOutside = (event: MouseEvent) => {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
 setIsOpen(false);
 }
 };
 document.addEventListener('mousedown', handleClickOutside);
 return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const handleExport = (type: 'csv' | 'excel' | 'pdf') => {
 setIsOpen(false);
 if (type === 'csv') onExportCSV();
 if (type === 'excel') onExportExcel();
 if (type === 'pdf') onExportPDF();
 };

 return (
 <div className="relative" ref={dropdownRef}>
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm"
 >
 <Download className="w-4 h-4" />
 Export
 </button>

 {isOpen && (
 <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden">
 <div className="py-1">
 <button
 onClick={() => handleExport('csv')}
 className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
 >
 <FileText className="w-4 h-4 text-neutral-400" />
 Export as CSV
 </button>
 <button
 onClick={() => handleExport('excel')}
 className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
 >
 <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
 Export as Excel
 </button>
 <button
 onClick={() => handleExport('pdf')}
 className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
 >
 <FileIcon className="w-4 h-4 text-red-500" />
 Export as PDF
 </button>
 </div>
 </div>
 )}
 </div>
 );
};
