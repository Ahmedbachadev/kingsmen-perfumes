import { useState, useEffect, useCallback } from 'react';
import { fetcher, fetchCache } from '../lib/fetcher';
import type { ShopifyProduct } from '../services/shopify/types';

const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: '1',
    handle: 'lucid',
    title: 'Lucid',
    description: 'A bright, fleeting introduction of Bergamot and Pink Pepper, settling into a deeply resonant core.',
    featuredImage: { url: '/products/lucid.png', altText: 'Lucid' },
    priceRange: { minVariantPrice: { amount: '250.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '250.00', currencyCode: 'USD' } },
    availableForSale: true,
    collections: { edges: [] },
  },
  {
    id: '2',
    handle: 'dominus',
    title: 'Dominus',
    description: 'Absolute command. Dark woods layered with subtle spice create an unforgettable trail.',
    featuredImage: { url: '/products/dominus.png', altText: 'Dominus' },
    priceRange: { minVariantPrice: { amount: '280.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '280.00', currencyCode: 'USD' } },
    availableForSale: true,
    collections: { edges: [] },
  },
  {
    id: '3',
    handle: 'office',
    title: 'Office',
    description: 'Modern precision and clarity for the professional environment.',
    featuredImage: { url: '/products/office.png', altText: 'Office' },
    priceRange: { minVariantPrice: { amount: '220.00', currencyCode: 'USD' }, maxVariantPrice: { amount: '220.00', currencyCode: 'USD' } },
    availableForSale: true,
    collections: { edges: [] },
  }
];

export function useProducts() {
  const cacheKey = '/api/products';
  const initialData = fetchCache.has(cacheKey) ? fetchCache.get(cacheKey).products : null;

  const [products, setProducts] = useState<ShopifyProduct[]>(initialData || []);
  const [loading, setLoading] = useState(initialData === null);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    if (initialData) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetcher<{ products: ShopifyProduct[] }>('/api/products');
      if (data && data.products && data.products.length > 0) {
        setProducts(data.products);
      } else {
        setProducts(MOCK_PRODUCTS);
      }
    } catch (err) {
      console.warn('Failed to fetch from Shopify, falling back to mock data.', err);
      setProducts(MOCK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, error, refetch: load };
}
