import React from 'react';
import type { ProductFormData } from '../../types/product-form.types';

interface ProductStatusCardProps {
  data: ProductFormData;
  onChange: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
}

export function ProductStatusCard({ data, onChange }: ProductStatusCardProps) {
  return (
    <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <h2 className="text-base font-semibold text-slate-900 mb-6">Status</h2>
      
      <div className="space-y-4">
        <label className="relative flex cursor-pointer rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm hover:bg-slate-50 transition-colors focus:outline-none">
          <input
            type="radio"
            name="status"
            value="active"
            checked={data.status === 'active'}
            onChange={() => onChange('status', 'active')}
            className="peer sr-only"
          />
          <span className="flex flex-1">
            <span className="flex flex-col">
              <span className="block text-sm font-medium text-slate-900">Active</span>
              <span className="mt-1 flex items-center text-xs text-slate-500">
                Visible to customers on the storefront
              </span>
            </span>
          </span>
          <span className="pointer-events-none absolute -inset-px rounded-lg border-2 peer-checked:border-indigo-500" aria-hidden="true"></span>
        </label>

        <label className="relative flex cursor-pointer rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm hover:bg-slate-50 transition-colors focus:outline-none">
          <input
            type="radio"
            name="status"
            value="draft"
            checked={data.status === 'draft'}
            onChange={() => onChange('status', 'draft')}
            className="peer sr-only"
          />
          <span className="flex flex-1">
            <span className="flex flex-col">
              <span className="block text-sm font-medium text-slate-900">Draft</span>
              <span className="mt-1 flex items-center text-xs text-slate-500">
                Hidden from customers, ready to publish later
              </span>
            </span>
          </span>
          <span className="pointer-events-none absolute -inset-px rounded-lg border-2 peer-checked:border-indigo-500" aria-hidden="true"></span>
        </label>
        
        <label className="relative flex cursor-pointer rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm hover:bg-slate-50 transition-colors focus:outline-none">
          <input
            type="radio"
            name="status"
            value="archived"
            checked={data.status === 'archived'}
            onChange={() => onChange('status', 'archived')}
            className="peer sr-only"
          />
          <span className="flex flex-1">
            <span className="flex flex-col">
              <span className="block text-sm font-medium text-slate-900">Archived</span>
              <span className="mt-1 flex items-center text-xs text-slate-500">
                Hidden from customers and most admin views
              </span>
            </span>
          </span>
          <span className="pointer-events-none absolute -inset-px rounded-lg border-2 peer-checked:border-indigo-500" aria-hidden="true"></span>
        </label>
      </div>
    </div>
  );
}
