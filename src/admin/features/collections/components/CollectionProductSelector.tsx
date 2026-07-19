import React, { useState, useEffect } from 'react';
import { Search, X, Check, Image as ImageIcon } from 'lucide-react';
import { searchUnassignedProducts, assignProductsToCollection } from '../services/collectionService';

interface Props {
  collectionId: string;
  onAssigned: () => void;
  onClose: () => void;
}

export const CollectionProductSelector: React.FC<Props> = ({ collectionId, onAssigned, onClose }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await searchUnassignedProducts(collectionId, search);
        setResults(data);
      } catch (err) {
        console.error('Error searching products:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [search, collectionId]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAssign = async () => {
    if (selectedIds.size === 0) return;
    setSaving(true);
    try {
      await assignProductsToCollection(collectionId, Array.from(selectedIds));
      onAssigned();
      onClose();
    } catch (err) {
      console.error('Error assigning products:', err);
      alert('Failed to assign products. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900">Add Products to Collection</h2>
          <button 
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
            />
          </div>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              No products found.
            </div>
          ) : (
            results.map((product) => {
              const isSelected = selectedIds.has(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => toggleSelect(product.id)}
                  className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-colors ${
                    isSelected 
                      ? 'border-neutral-900 bg-neutral-50' 
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-neutral-900 border-neutral-900' : 'border-neutral-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>

                  {product.thumbnail ? (
                    <img src={product.thumbnail} alt="" className="w-10 h-10 rounded object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-neutral-100 flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-neutral-400" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">{product.name}</p>
                    <p className="text-xs text-neutral-500 truncate">{product.sku} • {product.stock} in stock</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-between items-center">
          <span className="text-sm text-neutral-600">
            {selectedIds.size} product(s) selected
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={selectedIds.size === 0 || saving}
              className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {saving ? 'Adding...' : 'Add Selected'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
