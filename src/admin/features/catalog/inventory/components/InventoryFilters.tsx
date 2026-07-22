import React, { useState } from 'react';
import { Filter, Check, X } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import type { StockStatus } from '../services/inventoryService';

interface InventoryFiltersProps {
  stockStatus: StockStatus | null;
  onStockStatusChange: (status: StockStatus | null) => void;
  isFeatured: boolean | null;
  onFeaturedChange: (val: boolean | null) => void;
  collectionId: string | null;
  onCollectionChange: (id: string | null) => void;
  collections: { id: string; name: string }[];
  hasFilters: boolean;
  onClearFilters: () => void;
}

export function InventoryFilters({
  stockStatus,
  onStockStatusChange,
  isFeatured,
  onFeaturedChange,
  collectionId,
  onCollectionChange,
  collections,
  hasFilters,
  onClearFilters,
}: InventoryFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const stockOptions: { label: string; value: StockStatus | null }[] = [
    { label: 'All Stock', value: null },
    { label: 'In Stock', value: 'in_stock' },
    { label: 'Low Stock', value: 'low_stock' },
    { label: 'Out of Stock', value: 'out_of_stock' },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-all duration-300 ease-out text-sm font-medium text-slate-700 shadow-sm"
        >
          <Filter className="w-4 h-4" />
          <span>Filter</span>
          {hasFilters && (
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
          )}
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
              {/* Stock Status */}
              <div className="p-3 border-b border-slate-100">
                <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                  Stock Status
                </h4>
                <div className="space-y-0.5">
                  {stockOptions.map((option) => (
                    <button
                      key={option.value || 'all'}
                      onClick={() => {
                        onStockStatusChange(option.value);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-slate-50 transition-colors text-left',
                        stockStatus === option.value
                          ? 'text-indigo-600 font-medium bg-indigo-50/50'
                          : 'text-slate-700'
                      )}
                    >
                      {option.label}
                      {stockStatus === option.value && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured */}
              <div className="p-3 border-b border-slate-100">
                <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                  Featured
                </h4>
                <div className="space-y-0.5">
                  {[
                    { label: 'All Products', value: null as boolean | null },
                    { label: 'Featured Only', value: true as boolean | null },
                  ].map((option) => (
                    <button
                      key={String(option.value)}
                      onClick={() => {
                        onFeaturedChange(option.value);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-slate-50 transition-colors text-left',
                        isFeatured === option.value
                          ? 'text-indigo-600 font-medium bg-indigo-50/50'
                          : 'text-slate-700'
                      )}
                    >
                      {option.label}
                      {isFeatured === option.value && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Collection */}
              {collections.length > 0 && (
                <div className="p-3">
                  <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                    Collection
                  </h4>
                  <div className="space-y-0.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                    <button
                      onClick={() => {
                        onCollectionChange(null);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-slate-50 transition-colors text-left',
                        collectionId === null
                          ? 'text-indigo-600 font-medium bg-indigo-50/50'
                          : 'text-slate-700'
                      )}
                    >
                      All Collections
                      {collectionId === null && <Check className="w-4 h-4" />}
                    </button>
                    {collections.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => {
                          onCollectionChange(col.id);
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl hover:bg-slate-50 transition-colors text-left',
                          collectionId === col.id
                            ? 'text-indigo-600 font-medium bg-indigo-50/50'
                            : 'text-slate-700'
                        )}
                      >
                        {col.name}
                        {collectionId === col.id && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}
