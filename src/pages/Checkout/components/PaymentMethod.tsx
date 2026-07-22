interface PaymentMethodProps {
  customNote?: string;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ customNote }) => {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-sm font-semibold">
          3
        </div>
        <h2 className="text-white text-lg font-light tracking-[0.15em] uppercase">
          Payment Method
        </h2>
      </div>

      <div className="space-y-4">
        {/* Cash on Delivery Selected Card */}
        <div className="relative border-2 border-[#D4AF37] bg-[#D4AF37]/5 rounded-xl p-5 flex items-start gap-4 transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]">
          {/* Radio Indicator */}
          <div className="mt-1 w-5 h-5 rounded-full border-2 border-[#D4AF37] flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium text-base tracking-wide">
                Cash on Delivery (COD)
              </h3>
              <span className="text-[#D4AF37] text-xs font-semibold px-2.5 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 uppercase tracking-wider">
                Available
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {customNote || 'Pay with cash when your order is delivered.'}
            </p>
          </div>
        </div>

        {/* Informational reassurance badge */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 text-white/50 text-xs">
          <svg className="w-5 h-5 text-[#D4AF37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>No prepayment required. Inspect your package upon arrival with our trusted courier partner.</span>
        </div>
      </div>
    </div>
  );
};
