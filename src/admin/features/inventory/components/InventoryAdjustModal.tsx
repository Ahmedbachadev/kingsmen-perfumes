import React, { useState } from 'react';
import { X, Plus, Minus, Edit3 } from 'lucide-react';
import type { InventoryAdjustment, InventoryChangeReason } from '../types/inventory';
import type { Product } from '../../products/types/product';

interface Props {
  product: Partial<Product>;
  isOpen: boolean;
  onClose: () => void;
  onSave: (adjustment: InventoryAdjustment) => Promise<void>;
}

export const InventoryAdjustModal: React.FC<Props> = ({ product, isOpen, onClose, onSave }) => {
  const [mode, setMode] = useState<'add' | 'subtract' | 'set'>('add');
  const [amount, setAmount] = useState<number | ''>('');
  const [reason, setReason] = useState<InventoryChangeReason>('Manual Adjustment');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentStock = product.stock || 0;
  
  let newQuantity = currentStock;
  const parsedAmount = typeof amount === 'number' ? amount : 0;
  
  if (mode === 'add') {
    newQuantity = currentStock + parsedAmount;
  } else if (mode === 'subtract') {
    newQuantity = Math.max(0, currentStock - parsedAmount);
  } else if (mode === 'set') {
    newQuantity = parsedAmount;
  }

  const handleSave = async () => {
    if (parsedAmount === 0 && mode !== 'set') return;
    
    setIsSubmitting(true);
    await onSave({
      productId: product.id!,
      previousQuantity: currentStock,
      newQuantity,
      reason,
    });
    setIsSubmitting(false);
    onClose();
    // reset state
    setAmount('');
    setMode('add');
    setReason('Manual Adjustment');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900">Adjust Inventory</h3>
          <button onClick={onClose} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
            {product.thumbnail ? (
              <img src={product.thumbnail} alt={product.name} className="w-10 h-10 rounded border border-neutral-200 object-cover" />
            ) : (
              <div className="w-10 h-10 rounded bg-neutral-200"></div>
            )}
            <div>
              <p className="text-sm font-medium text-neutral-900 truncate" title={product.name}>{product.name}</p>
              <p className="text-xs text-neutral-500">Current Stock: <span className="font-semibold text-neutral-700">{currentStock}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => setMode('add')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded border ${mode === 'add' ? 'border-neutral-900 bg-neutral-50 text-neutral-900' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
            >
              <Plus className="w-4 h-4" />
              <span className="text-xs font-medium">Add</span>
            </button>
            <button 
              onClick={() => setMode('subtract')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded border ${mode === 'subtract' ? 'border-neutral-900 bg-neutral-50 text-neutral-900' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
            >
              <Minus className="w-4 h-4" />
              <span className="text-xs font-medium">Subtract</span>
            </button>
            <button 
              onClick={() => setMode('set')}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded border ${mode === 'set' ? 'border-neutral-900 bg-neutral-50 text-neutral-900' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'}`}
            >
              <Edit3 className="w-4 h-4" />
              <span className="text-xs font-medium">Set</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              {mode === 'set' ? 'New Quantity' : 'Amount'}
            </label>
            <input 
              type="number" 
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value === '' ? '' : parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Reason</label>
            <select 
              value={reason}
              onChange={(e) => setReason(e.target.value as InventoryChangeReason)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="Manual Adjustment">Manual Adjustment</option>
              <option value="New Shipment">New Shipment</option>
              <option value="Damaged Items">Damaged Items</option>
              <option value="Returned Items">Returned Items</option>
              <option value="Correction">Correction</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100 flex items-center justify-between">
            <span className="text-sm text-neutral-600">New Available Stock</span>
            <span className="text-lg font-bold text-neutral-900">{newQuantity}</span>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-end gap-3 bg-neutral-50/50">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSubmitting || (amount === '' && mode !== 'set')}
            className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};
