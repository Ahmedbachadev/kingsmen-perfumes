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

export const DEFAULT_CHECKOUT_SETTINGS: CheckoutSettingsState = {
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

export function getCheckoutSettings(): CheckoutSettingsState {
  if (typeof window === 'undefined') return DEFAULT_CHECKOUT_SETTINGS;
  const saved = localStorage.getItem('kingsmen_admin_checkout_settings');
  if (saved) {
    try {
      return { ...DEFAULT_CHECKOUT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Failed to parse checkout settings from localStorage', e);
    }
  }
  return DEFAULT_CHECKOUT_SETTINGS;
}
