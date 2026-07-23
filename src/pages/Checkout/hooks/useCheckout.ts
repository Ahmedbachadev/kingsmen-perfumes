import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../../contexts/CartContext';
import { validateCheckoutForm, type CheckoutFormData, type CheckoutFormErrors } from '../../../utils/validation/checkoutSchema';
import { CheckoutService, type CreatedOrderResult } from '../../../services/checkoutService';
import { getCheckoutSettings } from '../../../utils/checkoutSettings';

export function useCheckout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartContext();

  // Dynamically fetch active administrative checkout settings
  const settings = useMemo(() => getCheckoutSettings(), []);

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    province: 'Punjab',
    city: 'Lahore',
    area: '',
    streetAddress: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'cod'
  });

  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.priceRange?.minVariantPrice?.amount || '0');
    return total + price * item.quantity;
  }, 0);

  // Calculate dynamic shipping fee based on Admin Settings
  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (settings.enableFreeShipping && subtotal >= settings.freeShippingThreshold) {
      return 0;
    }
    return settings.flatShippingFee + (settings.codFee || 0);
  }, [subtotal, settings]);

  const totalAmount = subtotal + shippingFee;

  const updateField = useCallback((field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (prev[field]) {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      }
      return prev;
    });
    setServerError(null);
  }, []);

  const submitOrder = useCallback(async () => {
    if (isSubmitting) return;

    if (formData.paymentMethod === 'cod' && !settings.enableCod) {
      setServerError('Cash on Delivery is currently disabled by store management.');
      return;
    }
    
    if (formData.paymentMethod === 'wire_transfer' && !settings.enableWireTransfer) {
      setServerError('Wire Transfer is currently disabled by store management.');
      return;
    }

    if (items.length === 0) {
      setServerError('Your cart is empty.');
      return;
    }

    const { isValid, errors: validationErrors } = validateCheckoutForm(formData, {
      requireEmail: settings.requireEmail,
      requirePostalCode: settings.requirePostalCode
    });

    if (!isValid) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setIsSubmitting(true);
      setServerError(null);

      let finalNotes = formData.notes || '';
      if (formData.paymentMethod === 'wire_transfer') {
        finalNotes = finalNotes ? `${finalNotes}\nPayment Method: Wire Transfer` : 'Payment Method: Wire Transfer';
      }
      
      const orderDataForService = { ...formData, notes: finalNotes };

      const result: CreatedOrderResult = await CheckoutService.placeCodOrder(
        orderDataForService,
        items,
        subtotal,
        shippingFee,
        totalAmount,
        settings.orderPrefix || 'KM-'
      );

      sessionStorage.setItem('kingsmen_last_order', JSON.stringify(result));
      clearCart();
      navigate('/checkout/success', { state: { order: result }, replace: true });
    } catch (err: any) {
      console.error('Failed to submit order:', err);
      setServerError(err?.message || 'An unexpected error occurred while placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, items, subtotal, shippingFee, totalAmount, isSubmitting, settings, clearCart, navigate]);

  return {
    items,
    formData,
    errors,
    settings,
    isSubmitting,
    serverError,
    subtotal,
    shippingFee,
    totalAmount,
    updateField,
    submitOrder
  };
}
