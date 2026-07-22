import React, { useState } from 'react';
import { Filter, Check } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface ProductFiltersProps {
 statusFilter: string | null;
 onStatusChange: (status: string | null) => void;
 categoryFilter: string | null;
 onCategoryChange: (categoryId: string | null) => void;
 categories: { id: string; name: string }[];
}

export function ProductFilters({
 statusFilter,
 onStatusChange,
 categoryFilter,
 onCategoryChange,
 categories
}: ProductFiltersProps) {
 const [isOpen, setIsOpen] = useState(false);

 return (
 <div className="relative">
 <button 
 onClick={() => setIsOpen(!isOpen)}
 className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-all duration-300 ease-out text-sm font-medium text-slate-700 shadow-sm"
 >
 <Filter className="w-4 h-4" />
 <span>Filter</span>
 {(statusFilter || categoryFilter) && (
 <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
 )}
 </button>

 {isOpen && (
 <>
 <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
 <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 overflow-hidden transform origin-top-right transition-all duration-200 ease-out">
 <div className="p-3 border-b border-slate-100 ">
 <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">Status</h4>
 <div className="space-y-1">
 {[
 { label: 'All Statuses', value: null },
 { label: 'Active', value: 'active' },
 { label: 'Draft', value: 'draft' },
 { label: 'Archived', value: 'archived' },
 ].map(option => (
 <button
 key={option.value || 'all'}
 onClick={() => {
 onStatusChange(option.value);
 setIsOpen(false);
 }}
 className={cn(
 "w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-slate-50 transition-colors text-left",
 statusFilter === option.value ? "text-indigo-600 font-medium bg-indigo-50/50 " : "text-slate-700 "
 )}
 >
 {option.label}
 {statusFilter === option.value && <Check className="w-4 h-4" />}
 </button>
 ))}
 </div>
 </div>

 {categories.length > 0 && (
 <div className="p-3">
 <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">Category</h4>
 <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
 <button
 onClick={() => {
 onCategoryChange(null);
 setIsOpen(false);
 }}
 className={cn(
 "w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-slate-50 transition-colors text-left",
 categoryFilter === null ? "text-indigo-600 font-medium bg-indigo-50/50 " : "text-slate-700 "
 )}
 >
 All Categories
 {categoryFilter === null && <Check className="w-4 h-4" />}
 </button>
 {categories.map(cat => (
 <button
 key={cat.id}
 onClick={() => {
 onCategoryChange(cat.id);
 setIsOpen(false);
 }}
 className={cn(
 "w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-slate-50 transition-colors text-left",
 categoryFilter === cat.id ? "text-indigo-600 font-medium bg-indigo-50/50 " : "text-slate-700 "
 )}
 >
 {cat.name}
 {categoryFilter === cat.id && <Check className="w-4 h-4" />}
 </button>
 ))}
 </div>
 </div>
 )}
 </div>
 </>
 )}
 </div>
 );
}
