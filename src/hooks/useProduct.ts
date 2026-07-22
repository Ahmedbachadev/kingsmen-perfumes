import { useState, useEffect } from 'react';
import type { ShopifyProduct } from '../services/shopify/types';
import { ProductsService } from '../services/supabase/products.service';
import { mapToShopifyProduct } from './useProducts';

export function useProduct(handle?: string) {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!handle) {
      setLoading(false);
      return;
    }
    
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await ProductsService.getProduct(handle as string, 'slug');
        if (isMounted) setProduct(mapToShopifyProduct(data));
      } catch (err: any) {
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
