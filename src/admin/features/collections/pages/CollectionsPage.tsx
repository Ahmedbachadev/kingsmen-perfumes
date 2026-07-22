import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import { Search, Plus, Filter, LayoutGrid } from 'lucide-react';
import { CollectionTable } from '../components/CollectionTable';
import { useCollections } from '../hooks/useCollections';

export default function CollectionsPage() {
  const {
    collections,
    stats,
    isLoading,
    isStatsLoading,
    search,
    setSearch,
    status,
    setStatus,
    isFeatured,
    setIsFeatured,
    hasFilters,
    clearFilters,
>>>>>>> 3fef0dc (production ready version with admin panel)
    deleteCollection
  } = useCollections();

  return (
<<<<<<< HEAD
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
=======
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Collections</h1>
          <p className="text-slate-500 mt-1">Manage your curated product collections</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/catalog/collections/new"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="w-4 h-4" />
            Create Collection
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Collections', value: stats.total, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Published', value: stats.published, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Drafts', value: stats.draft, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Featured', value: stats.featured, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="text-sm font-medium text-slate-500 mb-1">{stat.label}</div>
            <div className="flex items-baseline gap-2">
              {isStatsLoading ? (
                <div className="h-8 w-12 bg-slate-100 rounded animate-pulse"></div>
              ) : (
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search collections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl transition-all duration-300 text-sm"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="bg-transparent border-none text-sm text-slate-700 py-1 pl-2 pr-8 focus:ring-0 cursor-pointer appearance-none outline-none font-medium"
              >
                <option value="all">All Status</option>
                <option value="active">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
              <select
                value={isFeatured}
                onChange={(e) => setIsFeatured(e.target.value as any)}
                className="bg-transparent border-none text-sm text-slate-700 py-1 pl-2 pr-8 focus:ring-0 cursor-pointer appearance-none outline-none font-medium"
              >
                <option value="all">All Types</option>
                <option value="true">Featured</option>
                <option value="false">Standard</option>
              </select>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        <CollectionTable 
          collections={collections}
          isLoading={isLoading}
          onDelete={deleteCollection}
        />
      </div>
    </div>
  );
}
>>>>>>> 3fef0dc (production ready version with admin panel)
