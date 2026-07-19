import React from 'react';
import { useCheckout } from '../features/checkout/hooks/useCheckout';
import { ContactForm } from '../features/checkout/components/ContactForm';
import { ShippingForm } from '../features/checkout/components/ShippingForm';
import { PaymentMethod } from '../features/checkout/components/PaymentMethod';
import { OrderSummary } from '../features/checkout/components/OrderSummary';
import { PlaceOrderButton } from '../features/checkout/components/PlaceOrderButton';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { form, onSubmit, isSubmitting, error, cartItems, subtotal, shipping, grandTotal } = useCheckout();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-neutral-400" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your Cart is Empty</h2>
        <p className="text-neutral-500 mb-8 text-center max-w-sm">
          Looks like you haven't added anything to your cart yet. Let's fix that!
        </p>
        <Link 
          to="/products"
          className="bg-neutral-900 text-white px-8 py-4 rounded-full font-medium hover:bg-neutral-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight mb-2">
            Checkout
          </h1>
          <p className="text-neutral-500">
            Please fill in your details below to complete your order.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16">
          
          {/* Left Column - Forms */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            <ContactForm form={form} />
            <hr className="border-neutral-200" />
            <ShippingForm form={form} />
            <hr className="border-neutral-200" />
            <PaymentMethod />
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              <OrderSummary 
                items={cartItems} 
                subtotal={subtotal} 
                shipping={shipping} 
                grandTotal={grandTotal} 
              />
              <div className="mt-6">
                <PlaceOrderButton isSubmitting={isSubmitting} error={error} />
              </div>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
