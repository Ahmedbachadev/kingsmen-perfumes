import React, { useState } from 'react';
import { GripVertical, X, Image as ImageIcon } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  status: string;
  inventory: number;
  regular_price: number;
  collection_display_order: number;
}

interface CollectionProductSorterProps {
  products: ProductItem[];
  onReorder: (newOrder: ProductItem[]) => void;
  onRemove: (productId: string) => void;
}

export function CollectionProductSorter({ products, onReorder, onRemove }: CollectionProductSorterProps) {
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItemIndex(index);
    // Needed for Firefox
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', index.toString());
    }
    // Make dragged element slightly transparent
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.opacity = '0.5';
      }
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggedItemIndex(null);
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = '1';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === targetIndex) return;

    const newProducts = [...products];
    const [draggedItem] = newProducts.splice(draggedItemIndex, 1);
    newProducts.splice(targetIndex, 0, draggedItem);
    
    onReorder(newProducts);
    setDraggedItemIndex(null);
  };

  if (products.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed border-slate-200/60 rounded-xl bg-slate-50/50">
        <p className="text-sm text-slate-500">No products assigned to this collection yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <div
          key={product.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          className={`flex items-center gap-4 p-3 bg-white border rounded-xl transition-all
            ${draggedItemIndex === index ? 'border-indigo-500 shadow-md' : 'border-slate-200/60 hover:border-slate-300'}
            ${draggedItemIndex !== null && draggedItemIndex !== index ? 'cursor-ns-resize' : 'cursor-grab active:cursor-grabbing'}
          `}
        >
          <div className="text-slate-400 p-1">
            <GripVertical className="w-5 h-5" />
          </div>
          
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-5 h-5 text-slate-400" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 truncate">{product.name}</h4>
            <div className="flex items-center gap-3 mt-0.5 text-[11px] text-slate-500">
              <span className="capitalize">{product.status}</span>
              <span>•</span>
              <span className={product.inventory > 0 ? 'text-emerald-600' : 'text-rose-600'}>
                {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
              </span>
              <span>•</span>
              <span>${product.regular_price.toFixed(2)}</span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
