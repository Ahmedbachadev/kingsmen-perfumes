import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationState {
  orderNumber?: string;
}

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state?.orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-100 text-center">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full scale-150 opacity-50 blur-xl"></div>
            <CheckCircle className="w-20 h-20 text-green-500 relative z-10" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Thank You!</h1>
          <p className="text-neutral-500 mb-8">
            Your order has been successfully placed. We'll send you an email confirmation shortly.
          </p>

          <div className="bg-neutral-50 rounded-2xl p-6 mb-8 border border-neutral-100">
            <p className="text-sm text-neutral-500 uppercase tracking-wider font-medium mb-1">
              Order Number
            </p>
            <p className="text-xl font-bold text-neutral-900 tracking-tight">
              {state.orderNumber}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-sm text-neutral-600 mb-8 bg-blue-50/50 p-4 rounded-xl">
            <Package className="w-5 h-5 text-blue-600" />
            <span>Estimated delivery: <strong className="text-neutral-900 font-medium">3-5 Business Days</strong></span>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center w-full bg-neutral-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors focus:ring-4 focus:ring-neutral-900/10"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
