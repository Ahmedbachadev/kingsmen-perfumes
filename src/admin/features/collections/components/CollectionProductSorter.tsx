<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Image as ImageIcon } from 'lucide-react';
import { unassignProductFromCollection, updateCollectionProductOrder, getCollectionProducts } from '../services/collectionService';

// Individual Sortable Item Component
const SortableItem = ({ product, onRemove }: { product: any, onRemove: (id: string) => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as const,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`flex items-center gap-4 p-3 bg-white border rounded-lg group ${
        isDragging ? 'border-neutral-900 shadow-md' : 'border-neutral-200'
      }`}
    >
      <div {...attributes} {...listeners} className="cursor-grab p-1 text-neutral-400 hover:text-neutral-900">
        <GripVertical className="w-5 h-5" />
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
        <p className="text-xs text-neutral-500 truncate">{product.sku} • {product.status}</p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(product.id)}
        className="p-2 text-neutral-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Remove from collection"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

interface Props {
  collectionId: string;
  refreshTrigger: number; // to refetch when assigned via modal
}

export const CollectionProductSorter: React.FC<Props> = ({ collectionId, refreshTrigger }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // fetch all for sorting (could paginate if huge, but let's assume reasonable sizes for manual sorting)
        const res = await getCollectionProducts(collectionId, 1, 1000, '');
        setProducts(res.products);
      } catch (err) {
        console.error('Error fetching collection products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collectionId, refreshTrigger]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        
        const newArray = arrayMove(items, oldIndex, newIndex);
        
        // Save the new order to DB asynchronously
        saveNewOrder(newArray);
        
        return newArray;
      });
    }
  };

  const saveNewOrder = async (orderedArray: any[]) => {
    setSaving(true);
    try {
      const updates = orderedArray.map((p, index) => ({
        id: p.id,
        collection_sort_order: index
      }));
      await updateCollectionProductOrder(updates);
    } catch (err) {
      console.error('Error saving order:', err);
      // Might want to show a toast here
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (productId: string) => {
    if (!window.confirm("Remove this product from the collection?")) return;

    try {
      await unassignProductFromCollection(productId);
      setProducts(products.filter(p => p.id !== productId));
    } catch (err) {
      console.error('Error removing product:', err);
      alert('Failed to remove product.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-lg">
        <p className="text-sm text-neutral-500">No products in this collection.</p>
        <p className="text-xs text-neutral-400 mt-1">Use the "Add Products" button to get started.</p>
=======
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
>>>>>>> 3fef0dc (production ready version with admin panel)
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="space-y-2 relative">
      {saving && (
        <div className="absolute -top-6 right-0 text-xs text-neutral-500 animate-pulse">
          Saving order...
        </div>
      )}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={products.map(p => p.id)}
          strategy={verticalListSortingStrategy}
        >
          {products.map(product => (
            <SortableItem key={product.id} product={product} onRemove={handleRemove} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
=======
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
>>>>>>> 3fef0dc (production ready version with admin panel)
