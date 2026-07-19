import React, { useState } from 'react';
import { useInventory } from '../../features/inventory/hooks/useInventory';
import { LowStockWidget } from '../../features/inventory/components/LowStockWidget';
import { InventoryTable } from '../../features/inventory/components/InventoryTable';
import { InventoryAdjustModal } from '../../features/inventory/components/InventoryAdjustModal';
import { InventoryHistory } from '../../features/inventory/components/InventoryHistory';
import { Search, Filter, RefreshCcw } from 'lucide-react';
import type { Product } from '../../features/products/types/product';

const InventoryPage: React.FC = () => {
  const {
    products,
    lowStockProducts,
    loading,
    lowStockLoading,
    error,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    threshold,
    adjustStock,
    refresh
  } = useInventory(10);

  const [activeProductForAdjust, setActiveProductForAdjust] = useState<Partial<Product> | null>(null);
  const [activeProductForHistory, setActiveProductForHistory] = useState<Partial<Product> | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 h-full flex flex-col">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Inventory</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Track and adjust stock levels across your catalog.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={refresh} className="text-red-700 hover:text-red-800">
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-6 flex-1 flex flex-col">
        <LowStockWidget 
          products={lowStockProducts} 
          loading={lowStockLoading} 
          threshold={threshold}
          onEditStock={(productId) => {
            const p = lowStockProducts.find(x => x.id === productId);
            if (p) setActiveProductForAdjust(p);
          }}
        />

        <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="pl-10 pr-8 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Inventory</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
            
            <button
              onClick={refresh}
              className="p-2 border border-neutral-300 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors"
              title="Refresh Data"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1">
          <InventoryTable 
            products={products}
            loading={loading}
            threshold={threshold}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            onAdjustStock={setActiveProductForAdjust}
            onViewHistory={setActiveProductForHistory}
          />
        </div>
      </div>

      {/* Modals */}
      {activeProductForAdjust && (
        <InventoryAdjustModal 
          product={activeProductForAdjust}
          isOpen={true}
          onClose={() => setActiveProductForAdjust(null)}
          onSave={adjustStock}
        />
      )}

      {activeProductForHistory && (
        <InventoryHistory 
          product={activeProductForHistory}
          isOpen={true}
          onClose={() => setActiveProductForHistory(null)}
        />
      )}
    </div>
  );
};

export default InventoryPage;
