import { useState, useEffect, useCallback } from 'react';
import * as collectionService from '../services/collectionService';
import type { Collection, CollectionStats, CollectionStatus } from '../types/collection';

export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [stats, setStats] = useState<CollectionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination & Filtering state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CollectionStatus | 'all'>('all');
  const [totalCount, setTotalCount] = useState(0);

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);
      
      const [collectionsData, statsData] = await Promise.all([
        collectionService.getCollections(page, limit, search, status),
        collectionService.getCollectionStats()
      ]);

      setCollections(collectionsData.collections);
      setTotalCount(collectionsData.count);
      setStats(statsData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch collections');
      console.error('Error fetching collections:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const deleteCollection = async (id: string) => {
    try {
      await collectionService.deleteCollection(id);
      await fetchCollections(); // Refresh list after deletion
      return true;
    } catch (err: any) {
      console.error('Error deleting collection:', err);
      return false;
    }
  };

  return {
    collections,
    stats,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch,
    status,
    setStatus,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    refresh: fetchCollections,
    deleteCollection
  };
};
