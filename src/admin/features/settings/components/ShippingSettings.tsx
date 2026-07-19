import React from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';

export const ShippingSettings: React.FC = () => {
  const { draftSettings, updateDraft } = useSettingsContext();

  if (!draftSettings) return null;

  const { shipping } = draftSettings;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    let parsedValue: any = value;
    if (type === 'checkbox') parsedValue = checked;
    if (type === 'number') parsedValue = Number(value);

    updateDraft('shipping', { ...shipping, [name]: parsedValue });
  };

  const handleRegionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const regions = val.split(',').map(s => s.trim()).filter(Boolean);
    updateDraft('shipping', { ...shipping, shippingRegions: regions });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-1">Shipping Configuration</h3>
        <p className="text-sm text-neutral-500">Manage shipping rates, thresholds, and delivery options.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Base Shipping Cost</label>
            <div className="relative">
              <span className="absolute left-4 top-2 text-neutral-500">₨</span>
              <input
                type="number"
                name="shippingCost"
                value={shipping.shippingCost}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Free Shipping Threshold</label>
            <div className="relative">
              <span className="absolute left-4 top-2 text-neutral-500">₨</span>
              <input
                type="number"
                name="freeShippingThreshold"
                value={shipping.freeShippingThreshold}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">Set to 0 to disable free shipping.</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Estimated Delivery Time</label>
          <input
            type="text"
            name="estimatedDeliveryTime"
            value={shipping.estimatedDeliveryTime}
            onChange={handleChange}
            placeholder="e.g. 3-5 Business Days"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Shipping Regions (Comma separated)</label>
          <input
            type="text"
            value={shipping.shippingRegions.join(', ')}
            onChange={handleRegionsChange}
            placeholder="e.g. Nationwide, Punjab, Sindh"
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900"
          />
        </div>
      </div>
    </div>
  );
};
