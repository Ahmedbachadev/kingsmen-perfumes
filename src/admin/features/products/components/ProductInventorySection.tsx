import React from 'react';
import type { ProductFormData, ValidationErrors } from '../validation/productSchema';

interface Props {
  data: ProductFormData;
  onChange: (field: keyof ProductFormData, value: any) => void;
  errors: ValidationErrors;
}

export const ProductInventorySection: React.FC<Props> = ({ data, onChange, errors }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-neutral-900">Inventory</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-neutral-700 mb-1">
              SKU (Stock Keeping Unit)
            </label>
            <input
              type="text"
              id="sku"
              value={data.sku}
              onChange={(e) => onChange('sku', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="barcode" className="block text-sm font-medium text-neutral-700 mb-1">
              Barcode (ISBN, UPC, GTIN, etc.)
            </label>
            <input
              type="text"
              id="barcode"
              value={data.barcode}
              onChange={(e) => onChange('barcode', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
            />
          </div>
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-neutral-700 mb-1">
            Stock Quantity *
          </label>
          <input
            type="number"
            id="stock"
            min="0"
            value={data.stock}
            onChange={(e) => onChange('stock', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow ${errors.stock ? 'border-red-300' : 'border-neutral-300'}`}
          />
          {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox"
              checked={data.track_inventory}
              onChange={(e) => onChange('track_inventory', e.target.checked)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
            />
            <span className="text-sm text-neutral-700">Track quantity</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox"
              checked={data.continue_selling}
              onChange={(e) => onChange('continue_selling', e.target.checked)}
              className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
            />
            <span className="text-sm text-neutral-700">Continue selling when out of stock</span>
          </label>
        </div>
      </div>
    </div>
  );
};
