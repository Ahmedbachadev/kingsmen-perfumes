import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, Hash, AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import {
  ADJUSTMENT_REASONS,
  type AdjustmentMode,
  type AdjustmentReason,
  type InventoryProduct,
} from '../services/inventoryService';

interface InventoryAdjustModalProps {
  isOpen: boolean;
  product: InventoryProduct | null;
  initialMode: AdjustmentMode;
  onClose: () => void;
  onSubmit: (params: {
    productId: string;
    currentStock: number;
    mode: AdjustmentMode;
    amount: number;
    reason: AdjustmentReason;
    notes?: string;
  }) => Promise<void>;
  isSubmitting: boolean;
}

const modeConfig: Record<
  AdjustmentMode,
  { label: string; icon: React.ElementType; color: string; bgColor: string }
> = {
  increase: {
    label: 'Increase Stock',
    icon: Plus,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  decrease: {
    label: 'Decrease Stock',
    icon: Minus,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  set: {
    label: 'Set Exact Stock',
    icon: Hash,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
};

export function InventoryAdjustModal({
  isOpen,
  product,
  initialMode,
  onClose,
  onSubmit,
  isSubmitting,
}: InventoryAdjustModalProps) {
  const [mode, setMode] = useState<AdjustmentMode>(initialMode);
  const [amount, setAmount] = useState<string>('');
  const [reason, setReason] = useState<AdjustmentReason>('Manual Adjustment');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setAmount('');
      setReason('Manual Adjustment');
      setNotes('');
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, initialMode]);

  if (!isOpen || !product) return null;

  const currentStock = product.inventory;
  const numAmount = parseInt(amount) || 0;

  // Calculate preview
  let previewStock: number;
  switch (mode) {
    case 'increase':
      previewStock = currentStock + numAmount;
      break;
    case 'decrease':
      previewStock = Math.max(0, currentStock - numAmount);
      break;
    case 'set':
      previewStock = Math.max(0, numAmount);
      break;
    default:
      previewStock = currentStock;
  }

  const changeAmount = previewStock - currentStock;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (numAmount <= 0 && mode !== 'set') {
      setError('Please enter a value greater than 0.');
      return;
    }
    if (mode === 'set' && numAmount < 0) {
      setError('Stock cannot be negative.');
      return;
    }
    if (mode === 'decrease' && numAmount > currentStock) {
      setError(`Cannot decrease by more than current stock (${currentStock}).`);
      return;
    }

    try {
      await onSubmit({
        productId: product.id,
        currentStock,
        mode,
        amount: numAmount,
        reason,
        notes: notes.trim() || undefined,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to adjust stock.');
    }
  };

  const config = modeConfig[mode];
  const ModeIcon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-9 h-9 rounded-xl flex items-center justify-center',
                config.bgColor
              )}
            >
              <ModeIcon className={cn('w-4.5 h-4.5', config.color)} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {config.label}
              </h2>
              <p className="text-xs text-slate-500 truncate max-w-[220px]">
                {product.name}
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

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-5">
            {/* Mode Tabs */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              {(Object.keys(modeConfig) as AdjustmentMode[]).map((m) => {
                const mc = modeConfig[m];
                const Icon = mc.icon;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMode(m);
                      setAmount('');
                      setError(null);
                    }}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200',
                      mode === m
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {m === 'increase'
                      ? 'Add'
                      : m === 'decrease'
                      ? 'Remove'
                      : 'Set'}
                  </button>
                );
              })}
            </div>

            {/* Current Stock Display */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
              <span className="text-sm font-medium text-slate-500">
                Current Stock
              </span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {currentStock}
              </span>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {mode === 'set' ? 'New Quantity' : 'Amount'}
              </label>
              <input
                ref={inputRef}
                type="number"
                min="0"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                placeholder={mode === 'set' ? 'Enter new stock level' : 'Enter amount'}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-lg font-semibold text-slate-900 tabular-nums placeholder:text-slate-300 placeholder:font-normal placeholder:text-sm"
              />
            </div>

            {/* Preview */}
            {numAmount > 0 && (
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100/60">
                <span className="text-sm font-medium text-indigo-600">
                  New Stock Level
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-indigo-700 tabular-nums">
                    {previewStock}
                  </span>
                  {changeAmount !== 0 && (
                    <span
                      className={cn(
                        'text-xs font-semibold px-1.5 py-0.5 rounded-md',
                        changeAmount > 0
                          ? 'text-emerald-700 bg-emerald-100'
                          : 'text-rose-700 bg-rose-100'
                      )}
                    >
                      {changeAmount > 0 ? '+' : ''}
                      {changeAmount}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Reason Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Reason
              </label>
              <div className="relative">
                <select
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value as AdjustmentReason)
                  }
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm font-medium text-slate-700 appearance-none cursor-pointer"
                >
                  {ADJUSTMENT_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Notes{' '}
                <span className="text-slate-300 normal-case">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add a note about this adjustment..."
                rows={2}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-sm text-slate-700 placeholder:text-slate-300 resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-rose-50 border border-rose-200 rounded-xl">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                <p className="text-sm font-medium text-rose-700">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || (numAmount <= 0 && mode !== 'set')}
              className={cn(
                'px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
                mode === 'increase'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                  : mode === 'decrease'
                  ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Updating...
                </span>
              ) : (
                'Confirm'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
