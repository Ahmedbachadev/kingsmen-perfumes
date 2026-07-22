import React from 'react';
import type { CheckoutFormData, CheckoutFormErrors } from '../../../utils/validation/checkoutSchema';

interface ShippingFormProps {
  formData: CheckoutFormData;
  errors: CheckoutFormErrors;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

const PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Azad Jammu & Kashmir',
  'Gilgit-Baltistan'
];

export const ShippingForm: React.FC<ShippingFormProps> = ({ formData, errors, onChange }) => {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
          2
        </div>
        <h2 className="text-white text-lg font-light tracking-[0.15em] uppercase">
          Shipping Address
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Province / State */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-white/60 font-medium">
            Province / Region <span className="text-[#D4AF37]">*</span>
          </label>
          <select
            value={formData.province}
            onChange={(e) => onChange('province', e.target.value)}
            className={`w-full px-4 py-3 bg-[#121212] border rounded-xl text-white focus:outline-none focus:ring-2 transition-all text-sm ${
              errors.province
                ? 'border-red-500/80 focus:ring-red-500/20'
                : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20'
            }`}
          >
            {PROVINCES.map((prov) => (
              <option key={prov} value={prov} className="bg-[#121212] text-white">
                {prov}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="text-red-400 text-xs mt-1">{errors.province}</p>
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-white/60 font-medium">
            City <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Lahore"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
              errors.city
                ? 'border-red-500/80 focus:ring-red-500/20'
                : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20'
            }`}
          />
          {errors.city && (
            <p className="text-red-400 text-xs mt-1">{errors.city}</p>
          )}
        </div>

        {/* Area / Locality */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-white/60 font-medium">
            Area / Sector / Locality <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Gulberg III, DHA Phase 5"
            value={formData.area}
            onChange={(e) => onChange('area', e.target.value)}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
              errors.area
                ? 'border-red-500/80 focus:ring-red-500/20'
                : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20'
            }`}
          />
          {errors.area && (
            <p className="text-red-400 text-xs mt-1">{errors.area}</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-white/60 font-medium">
            Postal Code <span className="text-white/30">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 54000"
            value={formData.postalCode}
            onChange={(e) => onChange('postalCode', e.target.value)}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
              errors.postalCode
                ? 'border-red-500/80 focus:ring-red-500/20'
                : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20'
            }`}
          />
          {errors.postalCode && (
            <p className="text-red-400 text-xs mt-1">{errors.postalCode}</p>
          )}
        </div>

        {/* Street Address */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-xs uppercase tracking-wider text-white/60 font-medium">
            Street Address <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. House #123, Street #4, Main Boulevard"
            value={formData.streetAddress}
            onChange={(e) => onChange('streetAddress', e.target.value)}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
              errors.streetAddress
                ? 'border-red-500/80 focus:ring-red-500/20'
                : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20'
            }`}
          />
          {errors.streetAddress && (
            <p className="text-red-400 text-xs mt-1">{errors.streetAddress}</p>
          )}
        </div>

        {/* Delivery Instructions (Optional) */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-xs uppercase tracking-wider text-white/60 font-medium">
            Delivery Instructions <span className="text-white/30">(Optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="Special instructions for courier (e.g. call before delivery)..."
            value={formData.notes || ''}
            onChange={(e) => onChange('notes', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
};
