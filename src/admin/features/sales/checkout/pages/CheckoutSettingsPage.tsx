import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Truck, 
  FileText, 
  Settings2, 
  Check, 
  RotateCcw, 
  Save, 
  AlertCircle,
  ShieldCheck,
  DollarSign
} from 'lucide-react';

export interface CheckoutSettingsState {
  // Payment Config
  enableCod: boolean;
  codFee: number;
  minCodAmount: number;
  maxCodAmount: number;
  codCustomNote: string;
  
  // Shipping Config
  flatShippingFee: number;
  enableFreeShipping: boolean;
  freeShippingThreshold: number;
  deliveryTimeframe: string;
  enableExpressDelivery: boolean;
  expressDeliveryFee: number;

  // Form Field Requirements
  requireEmail: boolean;
  requirePostalCode: boolean;
  allowDeliveryNotes: boolean;

  // Order Fulfillment
  orderPrefix: string;
  autoReduceInventory: boolean;
  sendOrderConfirmation: boolean;
}

const DEFAULT_SETTINGS: CheckoutSettingsState = {
  enableCod: true,
  codFee: 0,
  minCodAmount: 0,
  maxCodAmount: 100000,
  codCustomNote: 'Pay with cash when your order is delivered.',

  flatShippingFee: 15,
  enableFreeShipping: true,
  freeShippingThreshold: 100,
  deliveryTimeframe: '3 to 5 Business Days',
  enableExpressDelivery: false,
  expressDeliveryFee: 35,

  requireEmail: false,
  requirePostalCode: false,
  allowDeliveryNotes: true,

  orderPrefix: 'KM-',
  autoReduceInventory: true,
  sendOrderConfirmation: true
};

export default function CheckoutSettingsPage() {
  const [settings, setSettings] = useState<CheckoutSettingsState>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'payment' | 'shipping' | 'fields' | 'fulfillment'>('payment');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kingsmen_admin_checkout_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse admin checkout settings', e);
      }
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('kingsmen_admin_checkout_settings', JSON.stringify(settings));
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 600);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset checkout settings to default values?')) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.setItem('kingsmen_admin_checkout_settings', JSON.stringify(DEFAULT_SETTINGS));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Checkout Settings</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              COD Active
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Configure payment methods, shipping thresholds, customer requirements, and order behavior.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Defaults
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all text-sm font-medium shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {isSaving ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Save className="w-4 h-4 text-[#D4AF37]" />
            )}
            <span>{isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Checkout settings successfully saved and applied storewide.</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('payment')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'payment'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payment Methods (COD)</span>
        </button>

        <button
          onClick={() => setActiveTab('shipping')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'shipping'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Delivery</span>
        </button>

        <button
          onClick={() => setActiveTab('fields')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'fields'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Form Fields & Requirements</span>
        </button>

        <button
          onClick={() => setActiveTab('fulfillment')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
            activeTab === 'fulfillment'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Settings2 className="w-4 h-4" />
          <span>Order Behavior & Fulfillment</span>
        </button>
      </div>

      {/* Tab Contents */}
      {/* 1. Payment Methods (COD) */}
      {activeTab === 'payment' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-semibold text-slate-900 text-base">Cash on Delivery (COD) Configuration</h3>
                <p className="text-slate-500 text-xs mt-0.5">Control how Cash on Delivery functions at checkout.</p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableCod}
                  onChange={(e) => setSettings({ ...settings, enableCod: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* COD Handling Fee */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  COD Handling Charge ($ / Rs)
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    value={settings.codFee}
                    onChange={(e) => setSettings({ ...settings, codFee: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm"
                    placeholder="0"
                  />
                </div>
                <p className="text-slate-400 text-xs mt-1">Set to 0 for free handling.</p>
              </div>

              {/* Max COD Amount */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Maximum COD Limit ($ / Rs)
                </label>
                <input
                  type="number"
                  value={settings.maxCodAmount}
                  onChange={(e) => setSettings({ ...settings, maxCodAmount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm"
                  placeholder="100000"
                />
                <p className="text-slate-400 text-xs mt-1">Orders above this amount must use online payment.</p>
              </div>

              {/* Custom Customer Note */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Checkout COD Instruction Notice
                </label>
                <textarea
                  rows={3}
                  value={settings.codCustomNote}
                  onChange={(e) => setSettings({ ...settings, codCustomNote: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm resize-none"
                  placeholder="Pay with cash when your order is delivered."
                />
                <p className="text-slate-400 text-xs mt-1">This text appears directly on the Cash on Delivery selection card.</p>
              </div>
            </div>
          </div>

          {/* Side Card: Gateway Info */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="font-semibold text-[#D4AF37] uppercase tracking-wider text-xs">Payment Architecture</h4>
            <h3 className="text-lg font-bold">Cash on Delivery Engine</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Your store is currently operating in Cash on Delivery mode. Additional payment gateways (Stripe, PayPal, local bank transfers) can be plugged into this configuration module in future releases.
            </p>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">COD Status</span>
                <span className="text-emerald-400 font-semibold">ENABLED</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Card Payments</span>
                <span className="text-slate-500 font-medium">DISABLED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Shipping & Delivery */}
      {activeTab === 'shipping' && (
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Shipping Rates & Thresholds</h3>
            <p className="text-slate-500 text-xs mt-0.5">Manage delivery fees and free shipping conditions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Flat Rate Fee */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Standard Shipping Fee ($)
              </label>
              <input
                type="number"
                value={settings.flatShippingFee}
                onChange={(e) => setSettings({ ...settings, flatShippingFee: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm"
              />
            </div>

            {/* Enable Free Shipping */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Free Shipping Program
              </label>
              <div className="flex items-center gap-3 pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableFreeShipping}
                    onChange={(e) => setSettings({ ...settings, enableFreeShipping: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                </label>
                <span className="text-xs text-slate-600 font-medium">
                  {settings.enableFreeShipping ? 'Free shipping enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Free Shipping Threshold */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Free Shipping Order Threshold ($)
              </label>
              <input
                type="number"
                disabled={!settings.enableFreeShipping}
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm disabled:bg-slate-100 disabled:text-slate-400"
              />
            </div>

            {/* Estimated Delivery Timeframe */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Estimated Delivery Timeframe (Display String)
              </label>
              <input
                type="text"
                value={settings.deliveryTimeframe}
                onChange={(e) => setSettings({ ...settings, deliveryTimeframe: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm"
                placeholder="3 to 5 Business Days"
              />
              <p className="text-slate-400 text-xs mt-1">Displayed to customer on the Order Success page.</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Form Fields & Requirements */}
      {activeTab === 'fields' && (
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Customer Input Controls</h3>
            <p className="text-slate-500 text-xs mt-0.5">Toggle optional vs mandatory fields on the Checkout form.</p>
          </div>

          <div className="space-y-4 max-w-2xl">
            {/* Require Email */}
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div>
                <h4 className="text-sm font-medium text-slate-900">Require Email Address</h4>
                <p className="text-xs text-slate-500">Require customers to enter an email address for invoice generation.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.requireEmail}
                onChange={(e) => setSettings({ ...settings, requireEmail: e.target.checked })}
                className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
              />
            </div>

            {/* Require Postal Code */}
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div>
                <h4 className="text-sm font-medium text-slate-900">Require Postal Code</h4>
                <p className="text-xs text-slate-500">Require postal code field to be populated before submitting.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.requirePostalCode}
                onChange={(e) => setSettings({ ...settings, requirePostalCode: e.target.checked })}
                className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
              />
            </div>

            {/* Allow Delivery Notes */}
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div>
                <h4 className="text-sm font-medium text-slate-900">Allow Delivery Instructions Box</h4>
                <p className="text-xs text-slate-500">Show optional special delivery instructions text area.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowDeliveryNotes}
                onChange={(e) => setSettings({ ...settings, allowDeliveryNotes: e.target.checked })}
                className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Order Behavior & Fulfillment */}
      {activeTab === 'fulfillment' && (
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 text-base">Order Numbering & Automated Actions</h3>
            <p className="text-slate-500 text-xs mt-0.5">Control how orders are registered in Supabase.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
            {/* Order Number Prefix */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Order Number Prefix
              </label>
              <input
                type="text"
                value={settings.orderPrefix}
                onChange={(e) => setSettings({ ...settings, orderPrefix: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 text-sm font-mono"
                placeholder="KM-"
              />
              <p className="text-slate-400 text-xs mt-1">Example generated code: <code className="text-slate-700">{settings.orderPrefix}849201</code></p>
            </div>

            {/* Auto Reduce Inventory */}
            <div className="sm:col-span-2 flex items-center justify-between p-4 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div>
                <h4 className="text-sm font-medium text-slate-900">Auto-reduce Inventory</h4>
                <p className="text-xs text-slate-500">Automatically decrease stock in Supabase products table upon checkout.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoReduceInventory}
                onChange={(e) => setSettings({ ...settings, autoReduceInventory: e.target.checked })}
                className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
