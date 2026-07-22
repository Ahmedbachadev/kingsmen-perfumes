import { useState, useCallback, useEffect } from 'react';
import { CollectionService, type CollectionWithCounts, type CollectionFilters, type CollectionStats, type Collection } from '../services/collectionService';

export function useCollections() {
  const [collections, setCollections] = useState<CollectionWithCounts[]>([]);
  const [stats, setStats] = useState<CollectionStats>({ total: 0, published: 0, draft: 0, featured: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CollectionFilters['status']>('all');
  const [isFeatured, setIsFeatured] = useState<CollectionFilters['is_featured']>('all');

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 20;

  // Derived state
  const hasFilters = search !== '' || status !== 'all' || isFeatured !== 'all';
  const totalPages = Math.ceil(totalCount / limit);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const loadStats = useCallback(async () => {
    try {
      setIsStatsLoading(true);
      const data = await CollectionService.getCollectionStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load collection stats:', err);
    } finally {
      setIsStatsLoading(false);
    }
  }, []);

  const loadCollections = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, count, stats: newStats } = await CollectionService.getCollections(
        { search: debouncedSearch, status, is_featured: isFeatured },
        { page, limit }
      );
      
      setCollections(data);
      setTotalCount(count);
      setStats(newStats);
      setIsStatsLoading(false);
    } catch (err) {
      console.error('Failed to load collections:', err);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, status, isFeatured, page]);

  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  const clearFilters = useCallback(() => {
    setSearch('');
    setStatus('all');
    setIsFeatured('all');
    setPage(1);
  }, []);

  const deleteCollection = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this collection?')) return false;
    
    try {
      await CollectionService.deleteCollection(id);
      loadCollections();
      return true;
    } catch (error) {
      console.error('Failed to delete collection:', error);
      alert('Failed to delete collection');
      return false;
    }
  }, [loadCollections]);

  return {
    collections,
    stats,
    isLoading,
    isStatsLoading,
    totalCount,
    page,
    totalPages,
    limit,
    search,
    status,
    isFeatured,
    hasFilters,
    setSearch,
    setStatus,
    setIsFeatured,
    setPage,
    clearFilters,
    refresh: loadCollections,
    loadStats,
    deleteCollection
  };
}
