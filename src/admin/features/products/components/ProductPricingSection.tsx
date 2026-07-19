import React from 'react';
import type { ProductFormData, ValidationErrors } from '../validation/productSchema';

interface Props {
  data: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
  errors: ValidationErrors;
}

export const ProductPricingSection: React.FC<Props> = ({ data, onChange, errors }) => {
  const price = Number(data.price) || 0;
  const cost = Number(data.cost_price) || 0;
  
  let margin = 0;
  let profit = 0;
  
  if (price > 0 && cost > 0) {
    profit = price - cost;
    margin = (profit / price) * 100;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-neutral-900">Pricing</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-1">
              Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-neutral-500">$</span>
              <input
                type="number"
                id="price"
                min="0"
                step="0.01"
                value={data.price}
                onChange={(e) => onChange('price', e.target.value)}
                className={`w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow ${errors.price ? 'border-red-300' : 'border-neutral-300'}`}
                placeholder="0.00"
              />
            </div>
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>

          <div>
            <label htmlFor="compare_price" className="block text-sm font-medium text-neutral-700 mb-1">
              Compare at Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-neutral-500">$</span>
              <input
                type="number"
                id="compare_price"
                min="0"
                step="0.01"
                value={data.compare_price}
                onChange={(e) => onChange('compare_price', e.target.value)}
                className={`w-full pl-7 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow ${errors.compare_price ? 'border-red-300' : 'border-neutral-300'}`}
                placeholder="0.00"
              />
            </div>
            {errors.compare_price && <p className="mt-1 text-sm text-red-600">{errors.compare_price}</p>}
          </div>
        </div>

        <hr className="border-neutral-200" />

        <div>
          <label htmlFor="cost_price" className="block text-sm font-medium text-neutral-700 mb-1">
            Cost Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-neutral-500">$</span>
            <input
              type="number"
              id="cost_price"
              min="0"
              step="0.01"
              value={data.cost_price}
              onChange={(e) => onChange('cost_price', e.target.value)}
              className="w-full pl-7 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
              placeholder="0.00"
            />
          </div>
          <p className="mt-1 text-xs text-neutral-500">Customers won't see this.</p>
        </div>

        {price > 0 && cost > 0 && (
          <div className="flex items-center gap-6 mt-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <div>
              <p className="text-xs text-neutral-500 mb-1">Profit</p>
              <p className="font-medium text-neutral-900">${profit.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-1">Margin</p>
              <p className="font-medium text-neutral-900">{margin.toFixed(1)}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
