import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductsService } from '../../../../../services/supabase/products.service';
import type { ProductWithRelations } from '../../../../../services/supabase/products.service';
import { supabase } from '../../../../../lib/supabase';

import { ProductStats } from '../components/ProductStats';
import { ProductToolbar } from '../components/ProductToolbar';
import { ProductTable } from '../components/ProductTable';

export default function ProductsPage() {
 const navigate = useNavigate();
 
 // Data State
 const [products, setProducts] = useState<ProductWithRelations[]>([]);
 const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
 const [stats, setStats] = useState({ total: 0, active: 0, outOfStock: 0, featured: 0 });
 const [totalCount, setTotalCount] = useState(0);
 
 // UI State
 const [isLoading, setIsLoading] = useState(true);
 const [isStatsLoading, setIsStatsLoading] = useState(true);
 
 // Filter & Pagination State
 const [search, setSearch] = useState('');
 const [debouncedSearch, setDebouncedSearch] = useState('');
 const [statusFilter, setStatusFilter] = useState<string | null>(null);
 const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
 const [page, setPage] = useState(1);
 const limit = 20;

 // Debounce search
 useEffect(() => {
 const timer = setTimeout(() => {
 setDebouncedSearch(search);
 setPage(1); // reset to page 1 on search
 }, 400);
 return () => clearTimeout(timer);
 }, [search]);

 // Load Data
 useEffect(() => {
 loadCategories();
 loadStats();
 }, []); // Only run once

 useEffect(() => {
 loadProducts();
 }, [debouncedSearch, statusFilter, categoryFilter, page]);

 const loadProducts = async () => {
 setIsLoading(true);
 try {
 const result = await ProductsService.getProducts({
 search: debouncedSearch,
 status: statusFilter as any,
 categoryId: categoryFilter || undefined,
 page,
 limit
 });
 setProducts(result.products);
 setTotalCount(result.count);
 } catch (error) {
 console.error('Failed to fetch products', error);
 } finally {
 setIsLoading(false);
 }
 };

 const loadStats = async () => {
 setIsStatsLoading(true);
 try {
 const data = await ProductsService.getProductStats();
 setStats(data);
 } catch (error) {
 console.error('Failed to fetch product stats', error);
 } finally {
 setIsStatsLoading(false);
 }
 };

 const loadCategories = async () => {
 try {
 const { data } = await supabase.from('categories').select('id, name').order('name');
 if (data) setCategories(data);
 } catch (error) {
 console.error('Failed to fetch categories', error);
 }
 };

 const handleDelete = async (id: string) => {
 if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
 try {
 // Optimistic UI update
 setProducts(current => current.filter(p => p.id !== id));
 setTotalCount(c => Math.max(0, c - 1));
 
 await ProductsService.deleteProduct(id);
 
 // Refresh data to ensure consistency
 loadStats();
 if (products.length <= 1 && page > 1) {
 setPage(p => p - 1);
 } else {
 loadProducts();
 }
 } catch (error: any) {
 console.error('Failed to delete product', error);
 alert(error.message || 'Failed to delete product.');
 loadProducts(); // revert optimistic update
 }
 }
 };

 const handleClearFilters = () => {
 setSearch('');
 setStatusFilter(null);
 setCategoryFilter(null);
 setPage(1);
 };

 const hasFiltersActive = Boolean(debouncedSearch || statusFilter || categoryFilter);
 const totalPages = Math.ceil(totalCount / limit);

 return (
 <div className="p-6 max-w-[1400px] mx-auto pb-24">
 {/* Header */}
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
 <div>
 <h1 className="text-2xl font-bold tracking-tight text-slate-900 ">Products</h1>
 <p className="text-sm text-slate-500 mt-1">Manage your fragrance catalogue.</p>
 </div>
 <button 
 onClick={() => navigate('/admin/catalog/products/new')}
 className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-500 hover:scale-105 transition-all duration-300 ease-out shadow-[0_4px_14px_0_rgba(99,102,241,0.39)]"
 >
 <Plus className="w-4 h-4" />
 <span>Add Product</span>
 </button>
 </div>

 {/* KPI Cards */}
 <ProductStats stats={stats} isLoading={isStatsLoading} />

 {/* Main Container */}
 <div className="bg-white border border-slate-200/60 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col relative overflow-hidden transition-all duration-300">
 
 <ProductToolbar 
 search={search}
 onSearchChange={setSearch}
 statusFilter={statusFilter}
 onStatusChange={(val) => { setStatusFilter(val); setPage(1); }}
 categoryFilter={categoryFilter}
 onCategoryChange={(val) => { setCategoryFilter(val); setPage(1); }}
 categories={categories}
 onRefresh={() => { loadProducts(); loadStats(); }}
 isLoading={isLoading}
 />

 <div className="p-0 border-t border-slate-200/60 ">
 <ProductTable 
 products={products}
 isLoading={isLoading}
 onEdit={(id) => navigate(`/admin/catalog/products/${id}`)}
 onDelete={handleDelete}
 hasFiltersActive={hasFiltersActive}
 onClearFilters={handleClearFilters}
 currentPage={page}
 totalPages={totalPages}
 onPageChange={setPage}
 totalCount={totalCount}
 />
 </div>
 </div>
 </div>
 );
}
