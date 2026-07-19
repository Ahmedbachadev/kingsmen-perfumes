import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormData } from '../validation/checkoutSchema';
import { checkoutService } from '../services/checkoutService';
import { useCartContext } from '../../../contexts/CartContext';

export function useCheckout() {
  const navigate = useNavigate();
  const { items, closeCart, clearCart } = useCartContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      province: '',
      city: '',
      area: '',
      address1: '',
      postalCode: '',
    },
  });

  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.priceRange?.minVariantPrice.amount || '0');
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal > 0 ? 0 : 0; // Configured to 0 for now as per plan
  const grandTotal = subtotal + shipping;

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const result = await checkoutService.placeOrder(
        data,
        items,
        subtotal,
        shipping,
        grandTotal
      );

      if (result.success) {
        clearCart();
        closeCart();
        navigate('/checkout/success', { 
          state: { orderNumber: result.orderNumber },
          replace: true
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    error,
    subtotal,
    shipping,
    grandTotal,
    cartItems: items,
  };
}
