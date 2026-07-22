import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCheckout } from './hooks/useCheckout';
import { ContactForm } from './components/ContactForm';
import { ShippingForm } from './components/ShippingForm';
import { PaymentMethod } from './components/PaymentMethod';
import { OrderSummary } from './components/OrderSummary';

export default function CheckoutPage() {
  const {
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
  } = useCheckout();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-light text-white uppercase tracking-[0.2em] mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-white/60 text-sm max-w-md mb-8">
          You have no items in your shopping cart. Browse our luxury fragrances to begin your experience.
        </p>
        <Link
          to="/products"
          className="px-8 py-4 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-colors duration-300 shadow-xl"
        >
          Explore Fragrance Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto text-white">
      {/* Header & Breadcrumb */}
      <div className="mb-10 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest text-white/40 mb-3">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#D4AF37]">Checkout</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] text-white">
          Complete Your Order
        </h1>
        <p className="text-white/50 text-sm mt-2">
          Review your details and place your Cash on Delivery order securely.
        </p>
      </div>

      {/* Global Server Error Banner */}
      {serverError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-start gap-3"
        >
          <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h4 className="font-semibold text-red-200">Order Submission Failed</h4>
            <p className="text-red-300/80 mt-0.5">{serverError}</p>
          </div>
        </motion.div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-8">
          <ContactForm formData={formData} errors={errors} onChange={updateField} />
          <ShippingForm formData={formData} errors={errors} onChange={updateField} />
          <PaymentMethod customNote={settings?.codCustomNote} />
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shippingFee={shippingFee}
            totalAmount={totalAmount}
          />

          {/* Place Order CTA Button */}
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            disabled={isSubmitting}
            onClick={submitOrder}
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#FFF8DC] to-[#D4AF37] text-black py-4 px-6 rounded-xl font-bold uppercase tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <span>Place Order • Cash on Delivery</span>
                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </motion.button>

          <p className="text-white/40 text-center text-xs tracking-wider">
            🔒 Safe & Secure Cash on Delivery Checkout
          </p>
        </div>
      </div>
    </div>
  );
}
