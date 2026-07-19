import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { BottleSize } from '../../types/product';

interface Props {
  sizes: BottleSize[];
  onChange: (sizes: BottleSize[]) => void;
}

export const BottleSizeManager: React.FC<Props> = ({ sizes = [], onChange }) => {
  const [newSize, setNewSize] = useState('');
  const [newPriceAdjustment, setNewPriceAdjustment] = useState('');

  const handleAdd = () => {
    if (!newSize.trim()) return;
    
    onChange([
      ...sizes, 
      { 
        size: newSize.trim(), 
        price_adjustment: newPriceAdjustment ? Number(newPriceAdjustment) : 0 
      }
    ]);
    
    setNewSize('');
    setNewPriceAdjustment('');
  };

  const handleRemove = (index: number) => {
    const updated = [...sizes];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-neutral-700">Bottle Sizes & Price Adjustments</label>
      
      {/* Existing Sizes */}
      {sizes.length > 0 && (
        <div className="space-y-2">
          {sizes.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex-1 text-sm font-medium text-neutral-900">{item.size}</div>
              <div className="text-sm text-neutral-500">
                {item.price_adjustment > 0 ? '+' : ''}{item.price_adjustment === 0 ? 'No adjustment' : `$${item.price_adjustment}`}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add New */}
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="e.g. 50 ml"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        <div className="w-32">
          <div className="relative">
            <span className="absolute left-3 top-2 text-neutral-500">$</span>
            <input
              type="number"
              placeholder="0.00"
              value={newPriceAdjustment}
              onChange={(e) => setNewPriceAdjustment(e.target.value)}
              className="w-full pl-7 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newSize.trim()}
          className="flex items-center justify-center w-10 h-10 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs text-neutral-500">Add sizes (e.g., 30ml, 50ml, 100ml). If a size costs extra, specify the positive adjustment amount.</p>
    </div>
  );
};
