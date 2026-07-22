import { useState, useEffect, useCallback } from 'react';
import { ProductsService } from '../services/supabase/products.service';
import type { ProductWithRelations } from '../services/supabase/products.service';
import type { ShopifyProduct } from '../services/shopify/types';

export function mapToShopifyProduct(product: ProductWithRelations): ShopifyProduct {
  return {
    id: product.id,
    handle: product.slug,
    title: product.name,
    description: product.description || product.short_description || '',
    featuredImage: product.images?.[0] ? { url: product.images[0].url, altText: product.images[0].alt_text || product.name } : null,
    priceRange: { 
      minVariantPrice: { amount: (product.sale_price || product.regular_price).toString(), currencyCode: 'USD' }, 
      maxVariantPrice: { amount: product.regular_price.toString(), currencyCode: 'USD' } 
    },
    availableForSale: product.status === 'active' && product.inventory > 0,
    collections: { 
      edges: product.collection ? [{ node: { id: 'col_1', title: product.collection.name, handle: product.collection.name.toLowerCase() } }] : [] 
    },
  };
}

export function useProducts() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch only active products that have search visibility
      const data = await ProductsService.getProducts({ status: 'active' });
      const mappedProducts = data.products.map(mapToShopifyProduct);
      setProducts(mappedProducts);
    } catch (err: any) {
      console.error('Failed to fetch products from Supabase', err);
      setError(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, error, refetch: load };
}
