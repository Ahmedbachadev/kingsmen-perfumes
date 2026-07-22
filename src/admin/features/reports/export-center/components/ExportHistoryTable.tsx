import React, { useEffect, useState } from 'react';
import type { ExportJob } from '../types';
import { ExportService } from '../services/export.service';
import { format, parseISO } from 'date-fns';
import { Download, Trash2, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../../../utils/cn';

export const ExportHistoryTable: React.FC = () => {
 const [jobs, setJobs] = useState<ExportJob[]>([]);

 useEffect(() => {
 const unsubscribe = ExportService.subscribe((updatedJobs) => {
 setJobs(updatedJobs);
 });
 return () => unsubscribe();
 }, []);

 const handleDownload = (job: ExportJob) => {
 if (job.blobUrl) {
 const link = document.createElement('a');
 link.href = job.blobUrl;
 link.download = job.filename;
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 }
 };

 const StatusBadge = ({ status }: { status: ExportJob['status'] }) => {
 switch (status) {
 case 'Completed':
 return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 "><CheckCircle2 className="w-3.5 h-3.5" /> Completed</span>;
 case 'Processing':
 return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 "><div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" /> Processing</span>;
 case 'Failed':
 return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 "><AlertCircle className="w-3.5 h-3.5" /> Failed</span>;
 default:
 return <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 "><Clock className="w-3.5 h-3.5" /> Pending</span>;
 }
 };

 return (
 <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden mt-6">
 <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
 <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
 <FileText className="w-5 h-5 text-neutral-500" />
 Export History
 </h2>
 <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
 {jobs.length} Jobs
 </span>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left text-sm">
 <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-200 ">
 <tr>
 <th className="px-6 py-4 font-medium">Filename / Entity</th>
 <th className="px-6 py-4 font-medium">Date Started</th>
 <th className="px-6 py-4 font-medium">Format</th>
 <th className="px-6 py-4 font-medium">Status</th>
 <th className="px-6 py-4 font-medium text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-neutral-100 ">
 {jobs.length === 0 ? (
 <tr>
 <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
 No exports found. Start a new export above.
 </td>
 </tr>
 ) : (
 jobs.map((job) => (
 <tr key={job.id} className="hover:bg-neutral-50 transition-colors">
 <td className="px-6 py-4">
 <div className="font-medium text-neutral-900 truncate max-w-[250px]">{job.filename}</div>
 <div className="text-xs text-neutral-500 mt-1 flex items-center gap-2">
 <span className="px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-600 ">{job.entity}</span>
 {job.filters?.dateRangePreset !== 'all' && <span>• {job.filters?.dateRangePreset}</span>}
 </div>
 </td>
 <td className="px-6 py-4 text-neutral-600 ">
 {format(parseISO(job.createdAt), 'MMM d, yyyy h:mm a')}
 </td>
 <td className="px-6 py-4">
 <span className="px-2 py-1 rounded-md text-xs font-medium border border-neutral-200 text-neutral-600 bg-white ">
 {job.format}
 </span>
 </td>
 <td className="px-6 py-4">
 <StatusBadge status={job.status} />
 </td>
 <td className="px-6 py-4 text-right">
 <div className="flex items-center justify-end gap-2">
 <button
 onClick={() => handleDownload(job)}
 disabled={job.status !== 'Completed'}
 className={cn(
 "p-2 rounded-lg transition-colors flex items-center justify-center",
 job.status === 'Completed' 
 ? "text-blue-600 hover:bg-blue-50" 
 : "text-neutral-300 cursor-not-allowed"
 )}
 title="Download"
 >
 <Download className="w-4 h-4" />
 </button>
 <button
 onClick={() => ExportService.deleteJob(job.id)}
 className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center"
 title="Delete"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </div>
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>
 </div>
 );
};
