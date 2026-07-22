import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { ProductFilters } from './ProductFilters';

interface ProductToolbarProps {
 search: string;
 onSearchChange: (val: string) => void;
 statusFilter: string | null;
 onStatusChange: (val: string | null) => void;
 categoryFilter: string | null;
 onCategoryChange: (val: string | null) => void;
 categories: { id: string; name: string }[];
 onRefresh: () => void;
 isLoading: boolean;
}

export function ProductToolbar({
 search,
 onSearchChange,
 statusFilter,
 onStatusChange,
 categoryFilter,
 onCategoryChange,
 categories,
 onRefresh,
 isLoading
}: ProductToolbarProps) {
 return (
 <div className="p-4 border-b border-slate-200/60 flex flex-col sm:flex-row gap-4 justify-between bg-white sticky top-0 z-20">
 <div className="relative flex-1 max-w-md">
 <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
 <input 
 type="text" 
 value={search}
 onChange={(e) => onSearchChange(e.target.value)}
 placeholder="Search products by name or SKU..." 
 className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ease-out text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-300"
 />
 </div>
 <div className="flex items-center gap-2">
 <ProductFilters 
 statusFilter={statusFilter}
 onStatusChange={onStatusChange}
 categoryFilter={categoryFilter}
 onCategoryChange={onCategoryChange}
 categories={categories}
 />
 <button 
 onClick={onRefresh}
 disabled={isLoading}
 className="flex items-center justify-center p-2.5 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-all duration-300 ease-out hover:scale-105 text-slate-600 shadow-sm disabled:opacity-50 disabled:hover:scale-100"
 title="Refresh"
 >
 <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-500' : ''}`} />
 </button>
 </div>
 </div>
 );
}
