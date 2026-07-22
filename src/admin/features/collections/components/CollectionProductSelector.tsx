import React, { useState, useEffect } from 'react';
import { Search, Plus, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../../../lib/supabase';
import { cn } from '../../../utils/cn';

interface ProductMin {
  id: string;
  name: string;
  image_url: string | null;
  status: string;
}

interface CollectionProductSelectorProps {
  collectionId: string;
  onAddProducts: (productIds: string[]) => Promise<void>;
  existingProductIds: string[];
}

export function CollectionProductSelector({ collectionId, onAddProducts, existingProductIds }: CollectionProductSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductMin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchProducts = async () => {
      setIsLoading(true);
      let query = supabase
        .from('products')
        .select('id, name, image_url, status')
        .limit(20);

      if (existingProductIds.length > 0) {
        query = query.not('id', 'in', `(${existingProductIds.join(',')})`);
      }

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error } = await query;
      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    };

    const debounce = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounce);
  }, [search, isOpen, existingProductIds]);

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleAdd = async () => {
    if (selectedIds.size === 0) return;
    
    try {
      setIsSubmitting(true);
      await onAddProducts(Array.from(selectedIds));
      setIsOpen(false);
      setSelectedIds(new Set());
      setSearch('');
    } catch (error) {
      console.error('Failed to add products:', error);
      alert('Failed to add products');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Products
      </button>
    );
  }

  return (
    <div className="border border-slate-200/60 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-semibold text-slate-900">Add Products</h3>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 text-sm"
          />
        </div>
      </div>

      <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
        {isLoading ? (
          <div className="p-4 text-center text-sm text-slate-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-4 text-center text-sm text-slate-500">No products found.</div>
        ) : (
          <div className="space-y-1">
            {products.map(product => (
              <div
                key={product.id}
                onClick={() => toggleSelection(product.id)}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors border",
                  selectedIds.has(product.id)
                    ? "bg-indigo-50 border-indigo-200"
                    : "bg-white border-transparent hover:bg-slate-50"
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900 truncate">{product.name}</div>
                  <div className="text-[11px] text-slate-500 capitalize">{product.status}</div>
                </div>
                <div className="pr-2">
                  <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    selectedIds.has(product.id)
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "border-slate-300 bg-white"
                  )}>
                    {selectedIds.has(product.id) && <Plus className="w-3.5 h-3.5 rotate-45" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <span className="text-sm text-slate-600 font-medium">
          {selectedIds.size} product{selectedIds.size !== 1 ? 's' : ''} selected
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={selectedIds.size === 0 || isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add Selected'}
          </button>
        </div>
      </div>
    </div>
  );
}
