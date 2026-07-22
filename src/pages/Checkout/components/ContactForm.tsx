import React from 'react';
import type { CheckoutFormData, CheckoutFormErrors } from '../../../utils/validation/checkoutSchema';

interface ContactFormProps {
  formData: CheckoutFormData;
  errors: CheckoutFormErrors;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ formData, errors, onChange }) => {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
          1
        </div>
        <h2 className="text-white text-lg font-light tracking-[0.15em] uppercase">
          Contact Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-xs uppercase tracking-wider text-white/60 font-medium">
            Full Name <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Alexander Kingsmen"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
              errors.fullName
                ? 'border-red-500/80 focus:ring-red-500/20'
                : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20'
            }`}
          />
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-white/60 font-medium">
            Phone Number <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. 0300 1234567"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
              errors.phone
                ? 'border-red-500/80 focus:ring-red-500/20'
                : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20'
            }`}
          />
          {errors.phone ? (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          ) : (
            <p className="text-white/30 text-[11px]">Required for delivery confirmation SMS/call</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-white/60 font-medium">
            Email Address <span className="text-white/30">(Optional)</span>
          </label>
          <input
            type="email"
            placeholder="e.g. alexander@example.com"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 transition-all text-sm ${
              errors.email
                ? 'border-red-500/80 focus:ring-red-500/20'
                : 'border-white/10 focus:border-[#D4AF37] focus:ring-[#D4AF37]/20'
            }`}
          />
          {errors.email ? (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          ) : (
            <p className="text-white/30 text-[11px]">For receiving order invoice & status updates</p>
          )}
        </div>
      </div>
    </div>
  );
};
