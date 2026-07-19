import { useMemo } from 'react';
import { useProducts } from './useProducts';

export function useSearch(query: string) {
  const { products, loading, error } = useProducts();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return products.filter(product => {
      const matchTitle = product.title.toLowerCase().includes(lowerQuery);
      const matchDesc = product.description.toLowerCase().includes(lowerQuery);
      const matchHandle = product.handle.toLowerCase().includes(lowerQuery);
      
      // We check title, description (acting as notes/collections), and handle.
      return matchTitle || matchDesc || matchHandle;
    });
  }, [query, products]);

  return { results, loading, error };
}
