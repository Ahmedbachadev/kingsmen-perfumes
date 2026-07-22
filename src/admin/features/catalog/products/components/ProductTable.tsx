import React from 'react';
import { ProductRow } from './ProductRow';
import { ProductEmptyState } from './ProductEmptyState';
import type { ProductWithRelations } from '../../../../../services/supabase/products.service';

interface ProductTableProps {
 products: ProductWithRelations[];
 isLoading: boolean;
 onEdit: (id: string) => void;
 onDelete: (id: string) => void;
 hasFiltersActive: boolean;
 onClearFilters: () => void;
 currentPage: number;
 totalPages: number;
 onPageChange: (page: number) => void;
 totalCount: number;
}

export function ProductTable({
 products,
 isLoading,
 onEdit,
 onDelete,
 hasFiltersActive,
 onClearFilters,
 currentPage,
 totalPages,
 onPageChange,
 totalCount
}: ProductTableProps) {
 
 if (isLoading && products.length === 0) {
 return (
 <div className="p-4 space-y-4">
 {[1, 2, 3, 4, 5].map((i) => (
 <div key={i} className="flex items-center gap-4 animate-pulse">
 <div className="w-10 h-10 bg-slate-100 rounded-xl"></div>
 <div className="flex-1 space-y-2">
 <div className="h-4 bg-slate-100 rounded-md w-1/4"></div>
 <div className="h-3 bg-slate-100 rounded-md w-1/6"></div>
 </div>
 </div>
 ))}
 </div>
 );
 }

 if (products.length === 0) {
 return <ProductEmptyState hasSearch={hasFiltersActive} onClearFilters={onClearFilters} />;
 }

 return (
 <div className="relative">
 <div className="overflow-x-auto relative min-h-[400px]">
 {isLoading && (
 <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center transition-all duration-300">
 <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
 </div>
 )}
 <table className="w-full text-left text-sm text-slate-500 ">
 <thead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 border-b border-slate-200/60 ">
 <tr>
 <th scope="col" className="px-4 py-3">Product</th>
 <th scope="col" className="px-4 py-3">Collection</th>
 <th scope="col" className="px-4 py-3">Category</th>
 <th scope="col" className="px-4 py-3">Price</th>
 <th scope="col" className="px-4 py-3">Stock</th>
 <th scope="col" className="px-4 py-3">Status</th>
 <th scope="col" className="px-4 py-3">Updated</th>
 <th scope="col" className="px-4 py-3 text-right"></th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 ">
 {products.map((product) => (
 <ProductRow 
 key={product.id}
 product={product}
 onEdit={onEdit}
 onDelete={onDelete}
 />
 ))}
 </tbody>
 </table>
 </div>
 
 <div className="px-6 py-4 border-t border-slate-200/60 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
 <span className="text-sm text-slate-500">
 Showing <span className="font-medium text-slate-900 ">{(currentPage - 1) * 20 + 1}</span> to <span className="font-medium text-slate-900 ">{Math.min(currentPage * 20, totalCount)}</span> of <span className="font-medium text-slate-900 ">{totalCount}</span> results
 </span>
 <div className="flex items-center gap-2">
 <button 
 onClick={() => onPageChange(currentPage - 1)}
 disabled={currentPage === 1 || isLoading}
 className="px-4 py-2 border border-slate-200/60 rounded-xl text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out shadow-sm disabled:hover:scale-100 hover:scale-[1.02]"
 >
 Previous
 </button>
 <button 
 onClick={() => onPageChange(currentPage + 1)}
 disabled={currentPage >= totalPages || isLoading}
 className="px-4 py-2 border border-slate-200/60 rounded-xl text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-out shadow-sm disabled:hover:scale-100 hover:scale-[1.02]"
 >
 Next
 </button>
 </div>
 </div>
 </div>
 );
}
