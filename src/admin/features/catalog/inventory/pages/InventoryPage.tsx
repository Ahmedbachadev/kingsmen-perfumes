import React, { useState, useCallback } from 'react';
import { Boxes, Search, RefreshCw, History } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { useInventory, useStockAdjust } from '../hooks/useInventory';
import { InventoryStats } from '../components/InventoryStats';
import { InventoryFilters } from '../components/InventoryFilters';
import { InventoryTable } from '../components/InventoryTable';
import { InventoryAdjustModal } from '../components/InventoryAdjustModal';
import { InventoryHistory } from '../components/InventoryHistory';
import { LowStockWidget } from '../components/LowStockWidget';
import type {
  InventoryProduct,
  AdjustmentMode,
} from '../services/inventoryService';

type Tab = 'inventory' | 'low_stock';

export default function InventoryPage() {
  const inventory = useInventory();
  const [activeTab, setActiveTab] = useState<Tab>('inventory');

  // Modal state
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [adjustProduct, setAdjustProduct] = useState<InventoryProduct | null>(
    null
  );
  const [adjustMode, setAdjustMode] = useState<AdjustmentMode>('increase');
  const [lowStockRefreshKey, setLowStockRefreshKey] = useState(0);

  // History panel state
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyProductId, setHistoryProductId] = useState<string | undefined>(
    undefined
  );
  const [historyProductName, setHistoryProductName] = useState<
    string | undefined
  >(undefined);

  // Stock adjustment handler
  const { adjustStock, isAdjusting } = useStockAdjust(() => {
    inventory.loadStats();
    inventory.loadProducts();
    setLowStockRefreshKey((k) => k + 1);
  }, inventory.setProducts);

  // Open adjust modal
  const handleOpenAdjust = useCallback(
    (product: InventoryProduct, mode: AdjustmentMode) => {
      setAdjustProduct(product);
      setAdjustMode(mode);
      setAdjustModalOpen(true);
    },
    []
  );

  // Open history panel
  const handleViewHistory = useCallback(
    (productId: string) => {
      const product = inventory.products.find((p) => p.id === productId);
      setHistoryProductId(productId);
      setHistoryProductName(product?.name);
      setHistoryOpen(true);
    },
    [inventory.products]
  );

  // Open all history
  const handleViewAllHistory = useCallback(() => {
    setHistoryProductId(undefined);
    setHistoryProductName(undefined);
    setHistoryOpen(true);
  }, []);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'inventory', label: 'All Inventory' },
    {
      id: 'low_stock',
      label: 'Low Stock Alerts',
      count: inventory.stats.lowStock + inventory.stats.outOfStock,
    },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Inventory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage stock levels across your catalogue.
          </p>
        </div>
        <button
          onClick={handleViewAllHistory}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/60 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:scale-[1.02] transition-all duration-300 ease-out shadow-sm"
        >
          <History className="w-4 h-4" />
          <span>Stock History</span>
        </button>
      </div>

      {/* KPI Stats */}
      <InventoryStats stats={inventory.stats} isLoading={inventory.isStatsLoading} />

      {/* Main Container */}
      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col relative overflow-hidden transition-all duration-300">
        {/* Tabs */}
        <div className="flex items-center border-b border-slate-200/60 bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative px-5 py-3.5 text-sm font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'text-slate-900'
                  : 'text-slate-400 hover:text-slate-600'
              )}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={cn(
                      'text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums',
                      activeTab === tab.id
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'inventory' && (
          <>
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-200/60 flex flex-col sm:flex-row gap-4 justify-between bg-white sticky top-0 z-20">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={inventory.search}
                  onChange={(e) => inventory.setSearch(e.target.value)}
                  placeholder="Search by name, SKU, or collection..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 ease-out text-sm text-slate-900 placeholder:text-slate-400 hover:border-slate-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <InventoryFilters
                  stockStatus={inventory.stockStatus}
                  onStockStatusChange={(val) => {
                    inventory.setStockStatus(val);
                    inventory.setPage(1);
                  }}
                  isFeatured={inventory.isFeatured}
                  onFeaturedChange={(val) => {
                    inventory.setIsFeatured(val);
                    inventory.setPage(1);
                  }}
                  collectionId={inventory.collectionId}
                  onCollectionChange={(val) => {
                    inventory.setCollectionId(val);
                    inventory.setPage(1);
                  }}
                  collections={inventory.collections}
                  hasFilters={inventory.hasFilters}
                  onClearFilters={inventory.clearFilters}
                />
                <button
                  onClick={inventory.refresh}
                  disabled={inventory.isLoading}
                  className="flex items-center justify-center p-2.5 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-all duration-300 ease-out hover:scale-105 text-slate-600 shadow-sm disabled:opacity-50 disabled:hover:scale-100"
                  title="Refresh"
                >
                  <RefreshCw
                    className={cn(
                      'w-4 h-4',
                      inventory.isLoading && 'animate-spin text-indigo-500'
                    )}
                  />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="p-0 border-t border-slate-200/60">
              <InventoryTable
                products={inventory.products}
                isLoading={inventory.isLoading}
                onAdjust={handleOpenAdjust}
                onViewHistory={handleViewHistory}
                hasFilters={inventory.hasFilters}
                onClearFilters={inventory.clearFilters}
                currentPage={inventory.page}
                totalPages={inventory.totalPages}
                onPageChange={inventory.setPage}
                totalCount={inventory.totalCount}
                limit={inventory.limit}
              />
            </div>
          </>
        )}

        {activeTab === 'low_stock' && (
          <LowStockWidget
            onAdjust={handleOpenAdjust}
            refreshKey={lowStockRefreshKey}
          />
        )}
      </div>

      {/* Adjust Modal */}
      <InventoryAdjustModal
        isOpen={adjustModalOpen}
        product={adjustProduct}
        initialMode={adjustMode}
        onClose={() => setAdjustModalOpen(false)}
        onSubmit={adjustStock}
        isSubmitting={isAdjusting}
      />

      {/* History Panel */}
      <InventoryHistory
        isOpen={historyOpen}
        productId={historyProductId}
        productName={historyProductName}
        onClose={() => setHistoryOpen(false)}
      />
    </div>
  );
}
