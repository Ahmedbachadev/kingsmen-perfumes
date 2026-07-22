import React from 'react';
import type { ProductFormData } from '../../types/product-form.types';
import { FragranceNotesInput } from './FragranceNotesInput';
import {
  FRAGRANCE_FAMILIES,
  CONCENTRATIONS,
  LONGEVITY_OPTIONS,
  PROJECTION_OPTIONS,
  SEASONS,
  OCCASIONS,
  SUGGESTED_NOTES,
  BOTTLE_SIZE_PRESETS,
} from '../../constants/fragrance.constants';
import { Plus, X } from 'lucide-react';
import { cn } from '../../../../../utils/cn';

interface ProductFragranceSectionProps {
  data: ProductFormData;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
}

export function ProductFragranceSection({ data, onChange }: ProductFragranceSectionProps) {
  const toggleSelection = (field: 'recommended_seasons' | 'recommended_occasions', value: string) => {
    const current = data[field];
    if (current.includes(value)) {
      onChange(field, current.filter((v) => v !== value));
    } else {
      onChange(field, [...current, value]);
    }
  };

  const addBottleSize = () => {
    onChange('bottle_sizes', [...data.bottle_sizes, { size: '', price_adjustment: null }]);
  };

  const updateBottleSize = (index: number, key: 'size' | 'price_adjustment', value: any) => {
    const newSizes = [...data.bottle_sizes];
    newSizes[index] = { ...newSizes[index], [key]: value };
    onChange('bottle_sizes', newSizes);
  };

  const removeBottleSize = (index: number) => {
    onChange('bottle_sizes', data.bottle_sizes.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mt-6">
      <h2 className="text-base font-semibold text-slate-900 mb-6">Fragrance Information</h2>

      <div className="space-y-8">
        {/* Basic Classification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Fragrance Family
            </label>
            <select
              value={data.fragrance_family || ''}
              onChange={(e) => onChange('fragrance_family', e.target.value || null)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out text-sm text-slate-900 appearance-none"
            >
              <option value="">Select family...</option>
              {FRAGRANCE_FAMILIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Concentration
            </label>
            <select
              value={data.concentration || ''}
              onChange={(e) => onChange('concentration', e.target.value || null)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out text-sm text-slate-900 appearance-none"
            >
              <option value="">Select concentration...</option>
              {CONCENTRATIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border-t border-slate-100 my-2"></div>

        {/* Fragrance Notes */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-800">Fragrance Notes</h3>
          
          <FragranceNotesInput
            label="Top Notes"
            notes={data.top_notes}
            suggestions={SUGGESTED_NOTES}
            onChange={(val) => onChange('top_notes', val)}
            placeholder="e.g. Bergamot, Lemon..."
          />
          
          <FragranceNotesInput
            label="Heart (Middle) Notes"
            notes={data.heart_notes}
            suggestions={SUGGESTED_NOTES}
            onChange={(val) => onChange('heart_notes', val)}
            placeholder="e.g. Lavender, Rose..."
          />
          
          <FragranceNotesInput
            label="Base Notes"
            notes={data.base_notes}
            suggestions={SUGGESTED_NOTES}
            onChange={(val) => onChange('base_notes', val)}
            placeholder="e.g. Vanilla, Amber..."
          />
        </div>

        <div className="border-t border-slate-100 my-2"></div>

        {/* Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Longevity
            </label>
            <select
              value={data.longevity || ''}
              onChange={(e) => onChange('longevity', e.target.value || null)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out text-sm text-slate-900 appearance-none"
            >
              <option value="">Select longevity...</option>
              {LONGEVITY_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Projection
            </label>
            <select
              value={data.projection || ''}
              onChange={(e) => onChange('projection', e.target.value || null)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 ease-out text-sm text-slate-900 appearance-none"
            >
              <option value="">Select projection...</option>
              {PROJECTION_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recommended Seasons & Occasions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Recommended Seasons
            </label>
            <div className="flex flex-wrap gap-2">
              {SEASONS.map((season) => {
                const isSelected = data.recommended_seasons.includes(season);
                return (
                  <button
                    key={season}
                    type="button"
                    onClick={() => toggleSelection('recommended_seasons', season)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border',
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    )}
                  >
                    {season}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Recommended Occasions
            </label>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((occasion) => {
                const isSelected = data.recommended_occasions.includes(occasion);
                return (
                  <button
                    key={occasion}
                    type="button"
                    onClick={() => toggleSelection('recommended_occasions', occasion)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border',
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    )}
                  >
                    {occasion}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 my-2"></div>

        {/* Bottle Sizes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-800">Bottle Sizes</h3>
            <button
              type="button"
              onClick={addBottleSize}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Size
            </button>
          </div>

          {data.bottle_sizes.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No alternative bottle sizes configured. Will use default price.</p>
          ) : (
            <div className="space-y-3">
              {data.bottle_sizes.map((bottle, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={bottle.size}
                      onChange={(e) => updateBottleSize(index, 'size', e.target.value)}
                      placeholder="e.g. 50 ml"
                      list="bottle-size-suggestions"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 text-sm text-slate-900"
                    />
                    <datalist id="bottle-size-suggestions">
                      {BOTTLE_SIZE_PRESETS.map((preset) => (
                        <option key={preset} value={preset} />
                      ))}
                    </datalist>
                  </div>
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">+$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={bottle.price_adjustment || ''}
                      onChange={(e) => updateBottleSize(index, 'price_adjustment', e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="Price adjustment (optional)"
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 text-sm text-slate-900"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBottleSize(index)}
                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
