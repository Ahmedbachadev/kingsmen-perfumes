import React from 'react';
import { Package, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductEmptyStateProps {
 hasSearch: boolean;
 onClearFilters: () => void;
}

export function ProductEmptyState({ hasSearch, onClearFilters }: ProductEmptyStateProps) {
 const navigate = useNavigate();

 return (
 <div className="flex flex-col items-center justify-center p-16 text-center bg-white border border-slate-200/60 rounded-2xl h-[450px]">
 <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 ">
 <Package className="w-8 h-8 text-slate-400 " />
 </div>
 <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-2">
 {hasSearch ? 'No products found' : 'No Products Yet'}
 </h3>
 <p className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
 {hasSearch 
 ? "We couldn't find any products matching your current filters and search criteria."
 : "Start by adding your first fragrance to build out your catalog. Products you create here will automatically sync to the storefront."
 }
 </p>
 
 {hasSearch ? (
 <button 
 onClick={onClearFilters}
 className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 hover:scale-105 transition-all duration-300 ease-out shadow-sm"
 >
 Clear Filters
 </button>
 ) : (
 <button 
 onClick={() => navigate('/admin/catalog/products/new')}
 className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 hover:scale-105 transition-all duration-300 ease-out shadow-[0_4px_14px_0_rgba(99,102,241,0.39)]"
 >
 <Plus className="w-5 h-5" />
 Add Your First Product
 </button>
 )}
 </div>
 );
}
