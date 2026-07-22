import React from 'react';
import {
  History,
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { useInventoryHistory } from '../hooks/useInventory';

interface InventoryHistoryProps {
  isOpen: boolean;
  productId?: string;
  productName?: string;
  onClose: () => void;
}

export function InventoryHistory({
  isOpen,
  productId,
  productName,
  onClose,
}: InventoryHistoryProps) {
  const { records, totalCount, page, setPage, totalPages, isLoading } =
    useInventoryHistory(isOpen ? productId : undefined);

  if (!isOpen) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-white shadow-[0_0_60px_rgba(0,0,0,0.1)] flex flex-col h-full animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
              <History className="w-4.5 h-4.5 text-slate-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Stock History
              </h2>
              <p className="text-xs text-slate-500">
                {productName
                  ? `Changes for ${productName}`
                  : 'All inventory changes'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {isLoading && records.length === 0 ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                      <div className="h-2.5 bg-slate-100 rounded w-1/2"></div>
                    </div>
                    <div className="h-5 w-12 bg-slate-100 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : records.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                <History className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                No history yet
              </h3>
              <p className="text-xs text-slate-500 max-w-[200px]">
                Stock changes will be recorded here when adjustments are made.
              </p>
            </div>
          ) : (
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <div className="divide-y divide-slate-100">
                {records.map((record) => {
                  const { date, time } = formatDate(record.created_at);
                  const isPositive = record.change_amount > 0;
                  const isZero = record.change_amount === 0;

                  return (
                    <div
                      key={record.id}
                      className="px-6 py-4 hover:bg-slate-50/50 transition-colors duration-150"
                    >
                      <div className="flex items-start gap-3">
                        {/* Change icon */}
                        <div
                          className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                            isZero
                              ? 'bg-slate-100'
                              : isPositive
                              ? 'bg-emerald-50'
                              : 'bg-rose-50'
                          )}
                        >
                          {isZero ? (
                            <Minus className="w-3.5 h-3.5 text-slate-400" />
                          ) : isPositive ? (
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Product name (only when showing all history) */}
                          {!productId && record.product && (
                            <p className="text-sm font-semibold text-slate-900 truncate mb-0.5">
                              {(record.product as any)?.name || 'Unknown'}
                            </p>
                          )}

                          {/* Change details */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-slate-600">
                              <span className="tabular-nums font-medium">
                                {record.previous_quantity}
                              </span>
                              <span className="text-slate-300 mx-1.5">→</span>
                              <span className="tabular-nums font-semibold text-slate-900">
                                {record.new_quantity}
                              </span>
                            </span>
                            <span
                              className={cn(
                                'text-xs font-semibold px-1.5 py-0.5 rounded-md tabular-nums',
                                isZero
                                  ? 'text-slate-500 bg-slate-100'
                                  : isPositive
                                  ? 'text-emerald-700 bg-emerald-50'
                                  : 'text-rose-700 bg-rose-50'
                              )}
                            >
                              {isPositive ? '+' : ''}
                              {record.change_amount}
                            </span>
                          </div>

                          {/* Reason */}
                          <p className="text-xs text-slate-400 mt-1">
                            <span className="font-medium text-slate-500">
                              {record.reason}
                            </span>
                            {record.notes && (
                              <>
                                <span className="mx-1">·</span>
                                <span className="italic">{record.notes}</span>
                              </>
                            )}
                          </p>
                        </div>

                        {/* Metadata */}
                        <div className="text-right flex-shrink-0">
                          <p className="text-[11px] font-medium text-slate-400">
                            {date}
                          </p>
                          <p className="text-[11px] text-slate-300 mt-0.5">
                            {time}
                          </p>
                          <p className="text-[10px] font-medium text-slate-400 mt-1">
                            {record.updated_by}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer / Pagination */}
        {totalCount > 0 && (
          <div className="px-6 py-3 border-t border-slate-100 bg-white sticky bottom-0 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {totalCount} total record{totalCount !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1 || isLoading}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-medium text-slate-500 px-2 tabular-nums">
                {page} / {totalPages || 1}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages || isLoading}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
