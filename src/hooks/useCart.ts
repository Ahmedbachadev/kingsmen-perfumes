import { useState, useEffect } from 'react';
import { fetcher } from '../lib/fetcher';
import type { ShopifyCart } from '../services/shopify/types';

export function useCart() {
  const [cart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetcher<{ status: string }>('/api/cart');
        console.log('Cart API status:', data.status);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { cart, loading, error };
}
