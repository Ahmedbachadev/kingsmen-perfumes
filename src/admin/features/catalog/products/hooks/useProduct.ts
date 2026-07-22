import { useState, useEffect } from 'react';
import { ProductsService } from '../../../../../services/supabase/products.service';
import type { ProductWithRelations } from '../../../../../services/supabase/products.service';

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<ProductWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      if (!id) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const data = await ProductsService.getProduct(id);
        if (isMounted) {
          setProduct(data);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Failed to load product', err);
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { product, isLoading, error };
}
