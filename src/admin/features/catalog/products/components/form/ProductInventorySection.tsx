import React from 'react';
import { Package, Hash } from 'lucide-react';
import type { ProductFormData, ProductFormErrors } from '../../types/product-form.types';
import { SettingsToggle } from '../../../../system/settings/components/ui/SettingsToggle';

interface ProductInventorySectionProps {
  data: ProductFormData;
  errors: ProductFormErrors;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
}

export function ProductInventorySection({ data, errors, onChange }: ProductInventorySectionProps) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mt-6">
      <h2 className="text-base font-semibold text-slate-900 mb-6">Inventory</h2>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div id="field-inventory">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Available Stock <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={data.inventory}
              onChange={(e) => onChange('inventory', parseInt(e.target.value, 10) || 0)}
              className={`w-full px-4 py-2.5 bg-slate-50 border ${errors.inventory ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-200/60 focus:border-indigo-500 focus:ring-indigo-500/20'} rounded-xl focus:ring-2 transition-all duration-300 ease-out text-sm text-slate-900`}
            />
            {errors.inventory && <p className="mt-1.5 text-xs text-rose-500">{errors.inventory}</p>}
          </div>

          <div className="space-y-4 pt-1">
            <SettingsToggle
              checked={data.track_inventory}
              onChange={(checked) => onChange('track_inventory', checked)}
              label="Track quantity"
              description="Automatically update stock as items are sold"
            />
            
            {data.track_inventory && (
              <SettingsToggle
                checked={data.continue_selling}
                onChange={(checked) => onChange('continue_selling', checked)}
                label="Continue selling when out of stock"
                description="Allow customers to backorder this item"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
