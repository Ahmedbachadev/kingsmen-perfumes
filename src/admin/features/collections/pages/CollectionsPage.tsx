import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter } from 'lucide-react';
import { useCollections } from '../hooks/useCollections';
import { CollectionTable } from '../components/CollectionTable';

export const CollectionsPage = () => {
  const { 
    collections, 
    stats, 
    loading, 
    search, 
    setSearch, 
    status, 
    setStatus,
    page,
    setPage,
    totalPages,
    deleteCollection
  } = useCollections();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Collections</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage and curate your branded collections.</p>
        </div>
        <Link
          to="/admin/collections/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Collection
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Total Collections</p>
          <p className="text-2xl font-semibold text-neutral-900">{stats?.total || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Published</p>
          <p className="text-2xl font-semibold text-neutral-900">{stats?.published || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Drafts</p>
          <p className="text-2xl font-semibold text-neutral-900">{stats?.draft || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
          <p className="text-sm text-neutral-500 mb-1">Featured</p>
          <p className="text-2xl font-semibold text-neutral-900">{stats?.featured || 0}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-neutral-400" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <CollectionTable 
            collections={collections} 
            onDelete={deleteCollection}
          />
          
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="flex items-center px-4 text-sm text-neutral-500">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
