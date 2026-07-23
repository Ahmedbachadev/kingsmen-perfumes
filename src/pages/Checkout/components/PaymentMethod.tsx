import type { CheckoutFormData } from '../../../utils/validation/checkoutSchema';
import type { CheckoutSettingsState } from '../../../utils/checkoutSettings';

interface PaymentMethodProps {
  customNote?: string;
  formData: CheckoutFormData;
  settings: CheckoutSettingsState;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ customNote, formData, settings, onChange }) => {
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
        {settings.enableCod && (
          <div 
            className={`relative border-2 ${formData.paymentMethod === 'cod' ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/10 bg-transparent hover:border-white/30 cursor-pointer'} rounded-xl p-5 flex items-start gap-4 transition-all`}
            onClick={() => onChange('paymentMethod', 'cod')}
          >
            {/* Radio Indicator */}
            <div className={`mt-1 w-5 h-5 rounded-full border-2 ${formData.paymentMethod === 'cod' ? 'border-[#D4AF37]' : 'border-white/30'} flex items-center justify-center shrink-0`}>
              {formData.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium text-base tracking-wide">
                  Cash on Delivery (COD)
                </h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                {customNote || 'Pay with cash when your order is delivered.'}
              </p>
            </div>
          </div>
        )}

        {/* Wire Transfer Selected Card */}
        {settings.enableWireTransfer && (
          <div 
            className={`relative border-2 ${formData.paymentMethod === 'wire_transfer' ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-white/10 bg-transparent hover:border-white/30 cursor-pointer'} rounded-xl p-5 flex items-start gap-4 transition-all`}
            onClick={() => onChange('paymentMethod', 'wire_transfer')}
          >
            {/* Radio Indicator */}
            <div className={`mt-1 w-5 h-5 rounded-full border-2 ${formData.paymentMethod === 'wire_transfer' ? 'border-[#D4AF37]' : 'border-white/30'} flex items-center justify-center shrink-0`}>
              {formData.paymentMethod === 'wire_transfer' && <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium text-base tracking-wide">
                  Wire Transfer (Bank Transfer)
                </h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                Transfer the amount to our bank account and send the screenshot to our WhatsApp.
              </p>
              
              {formData.paymentMethod === 'wire_transfer' && (
                <div className="mt-3 p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Bank Details</span>
                    <p className="text-white text-sm font-mono whitespace-pre-wrap">{settings.wireTransferBankAccount || 'Bank details not provided.'}</p>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">WhatsApp Screenshot To</span>
                    <p className="text-[#D4AF37] text-sm font-mono font-medium">{settings.wireTransferWhatsApp || '03425269194'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Informational reassurance badge */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 text-white/50 text-xs mt-4">
          <svg className="w-5 h-5 text-[#D4AF37] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Your payment method is secure and your information is always protected.</span>
        </div>
      </div>
    </div>
  );
};
