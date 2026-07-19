import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';

export const PaymentSettings: React.FC = () => {
  const { draftSettings, updateDraft } = useSettingsContext();

  if (!draftSettings) return null;

  const { payments } = draftSettings;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateDraft('payments', { ...payments, [name]: checked });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Payment Gateways</h3>
        <p className="text-sm text-neutral-500">Configure accepted payment methods during checkout.</p>
      </div>

      <div className="space-y-4">
        {/* Cash on Delivery */}
        <div className="flex items-center justify-between p-5 rounded-xl border border-neutral-200 bg-white">
          <div>
            <h4 className="font-medium text-neutral-900">Cash on Delivery (COD)</h4>
            <p className="text-sm text-neutral-500 mt-1">Allow customers to pay with cash upon delivery.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="cashOnDeliveryEnabled"
              checked={payments.cashOnDeliveryEnabled} 
              onChange={handleChange}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neutral-900"></div>
          </label>
        </div>

        {/* Future Integrations Placeholders */}
        <div className="flex items-center justify-between p-5 rounded-xl border border-neutral-200 bg-neutral-50 opacity-60">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-neutral-900">Stripe / Credit Cards</h4>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-600">Coming Soon</span>
            </div>
            <p className="text-sm text-neutral-500 mt-1">Accept online credit card payments securely.</p>
          </div>
          <button disabled className="px-4 py-2 text-sm font-medium bg-neutral-200 text-neutral-500 rounded-lg cursor-not-allowed">
            Connect
          </button>
        </div>

        <div className="flex items-center justify-between p-5 rounded-xl border border-neutral-200 bg-neutral-50 opacity-60">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-neutral-900">Easypaisa / JazzCash</h4>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-600">Coming Soon</span>
            </div>
            <p className="text-sm text-neutral-500 mt-1">Accept local mobile wallet payments.</p>
          </div>
          <button disabled className="px-4 py-2 text-sm font-medium bg-neutral-200 text-neutral-500 rounded-lg cursor-not-allowed">
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};
