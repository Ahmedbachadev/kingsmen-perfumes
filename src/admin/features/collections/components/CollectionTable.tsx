import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, MoreHorizontal, Image as ImageIcon, Star, Trash2 } from 'lucide-react';
import { CollectionStatusBadge } from './CollectionStatusBadge';
import { cn } from '../../../utils/cn';
import type { CollectionWithCounts } from '../services/collectionService';

interface CollectionTableProps {
  collections: CollectionWithCounts[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export function CollectionTable({ collections, isLoading, onDelete }: CollectionTableProps) {
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);

  if (isLoading && collections.length === 0) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="w-16 h-12 bg-slate-100 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-100 rounded w-1/4"></div>
              <div className="h-3 bg-slate-100 rounded w-1/6"></div>
            </div>
            <div className="h-6 w-20 bg-slate-100 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100">
          <ImageIcon className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-1">No collections found</h3>
        <p className="text-sm text-slate-500 mb-6">Create a collection to group your products together.</p>
        <Link
          to="/admin/catalog/collections/new"
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition-colors"
        >
          Create Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="w-full text-left text-sm text-slate-600 hidden md:table">
        <thead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 border-b border-slate-200/60">
          <tr>
            <th className="px-6 py-3 font-medium">Collection</th>
            <th className="px-6 py-3 font-medium text-center">Products</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Updated</th>
            <th className="px-6 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {collections.map(collection => (
            <tr key={collection.id} className="group hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60 flex-shrink-0">
                    {collection.image_url ? (
                      <img src={collection.image_url} alt={collection.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-slate-400" />
                    )}
                    {collection.is_featured && (
                      <div className="absolute top-0 right-0 p-0.5 bg-amber-500 rounded-bl-lg">
                        <Star className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Link to={`/admin/catalog/collections/${collection.id}`} className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                      {collection.name}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">/{collection.slug}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium tabular-nums">
                  {collection.products_count}
                </span>
              </td>
              <td className="px-6 py-4">
                <CollectionStatusBadge status={collection.status} />
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-medium text-slate-500">
                  {new Date(collection.updated_at).toLocaleDateString(undefined, {
                    month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 relative">
                  <Link
                    to={`/admin/catalog/collections/${collection.id}`}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === collection.id ? null : collection.id)}
                    onBlur={() => setTimeout(() => setActiveMenuId(null), 200)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenuId === collection.id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200/60 rounded-xl shadow-lg z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                      <Link
                        to={`/admin/catalog/collections/${collection.id}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Collection
                      </Link>
                      <button
                        onClick={() => onDelete(collection.id)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-3 p-4">
        {collections.map(collection => (
          <div key={collection.id} className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm relative">
            {collection.is_featured && (
              <div className="absolute top-0 right-0 p-1.5 bg-amber-500 rounded-bl-xl rounded-tr-2xl z-10">
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
            )}
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60 flex-shrink-0">
                {collection.image_url ? (
                  <img src={collection.image_url} alt={collection.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 truncate pr-6">{collection.name}</h4>
                <p className="text-[11px] text-slate-500 truncate mb-2">/{collection.slug}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <CollectionStatusBadge status={collection.status} />
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    {collection.products_count} items
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => onDelete(collection.id)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <Link
                to={`/admin/catalog/collections/${collection.id}`}
                className="flex items-center justify-center gap-1.5 flex-1 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
