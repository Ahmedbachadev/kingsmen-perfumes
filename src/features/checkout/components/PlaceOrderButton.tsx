import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  isSubmitting: boolean;
  error: string | null;
}

export const PlaceOrderButton: React.FC<Props> = ({ isSubmitting, error }) => {
  return (
    <div className="pt-6 border-t border-neutral-200">
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-neutral-900 text-white py-4 px-6 rounded-xl font-medium text-lg hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-900/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          'Place Order'
        )}
      </button>
      
      <p className="text-center text-xs text-neutral-500 mt-4 flex items-center justify-center gap-1.5">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Your information is secure
      </p>
    </div>
  );
};
