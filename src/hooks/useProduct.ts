import { useState, useEffect } from 'react';
import { fetcher, fetchCache } from '../lib/fetcher';
import type { ShopifyProduct } from '../services/shopify/types';

export function useProduct(handle?: string) {
  const cacheKey = `/api/product?handle=${handle}`;
  const initialData = handle && fetchCache.has(cacheKey) ? fetchCache.get(cacheKey).product : null;

  const [product, setProduct] = useState<ShopifyProduct | null>(initialData);
  const [loading, setLoading] = useState(initialData === null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }
    
    if (initialData) {
      setLoading(false);
      return;
    }
    
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetcher<{ product: ShopifyProduct }>(`/api/product?handle=${handle}`);
        if (isMounted) setProduct(data.product);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [handle]);

  return { product, loading, error };
}
