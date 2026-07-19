import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import type { Product } from '../../products/types/product';
import type { InventoryHistory as IHistory } from '../types/inventory';
import { getProductInventoryHistory } from '../services/inventoryService';

interface Props {
  product: Partial<Product>;
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryHistory: React.FC<Props> = ({ product, isOpen, onClose }) => {
  const [history, setHistory] = useState<IHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const limit = 10;

  useEffect(() => {
    if (!isOpen || !product.id) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const { history: data, count } = await getProductInventoryHistory(product.id!, page, limit);
        setHistory(data);
        setTotalCount(count);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isOpen, product.id, page]);

  if (!isOpen) return null;

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Inventory History</h3>
            <p className="text-sm text-neutral-500 truncate max-w-[250px]" title={product.name}>{product.name}</p>
          </div>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading && history.length === 0 ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-start gap-4 p-4 border border-neutral-100 rounded-lg">
                  <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                    <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <RefreshCcw className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500 font-medium">No history recorded.</p>
              <p className="text-sm text-neutral-400 mt-1">Changes to inventory will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((record) => {
                const isIncrease = record.change_amount > 0;
                const isSet = record.change_amount === 0;
                
                return (
                  <div key={record.id} className="p-4 border border-neutral-100 rounded-lg shadow-sm bg-white">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-full ${isIncrease ? 'bg-emerald-100 text-emerald-600' : isSet ? 'bg-neutral-100 text-neutral-600' : 'bg-orange-100 text-orange-600'}`}>
                          {isIncrease ? <ArrowUpRight className="w-4 h-4" /> : isSet ? <RefreshCcw className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        </div>
                        <span className="font-medium text-neutral-900 text-sm">{record.reason}</span>
                      </div>
                      <span className="text-xs text-neutral-500">
                        {new Date(record.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="pl-9 flex items-center justify-between">
                      <div className="text-sm text-neutral-600">
                        <span className="text-neutral-400 line-through mr-2">{record.previous_quantity}</span>
                        <span className="font-bold text-neutral-900">{record.new_quantity}</span>
                      </div>
                      <div className={`text-sm font-semibold ${isIncrease ? 'text-emerald-600' : isSet ? 'text-neutral-600' : 'text-orange-600'}`}>
                        {isIncrease ? '+' : ''}{record.change_amount}
                      </div>
                    </div>
                    <div className="pl-9 mt-1 text-xs text-neutral-400">
                      by {record.updated_by}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
            <button 
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-neutral-500">Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
