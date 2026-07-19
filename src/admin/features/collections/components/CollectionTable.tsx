import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Star, GripVertical, Image as ImageIcon } from 'lucide-react';
import { CollectionStatusBadge } from './CollectionStatusBadge';
import type { Collection } from '../types/collection';

interface Props {
  collections: Collection[];
  onDelete: (id: string) => void;
}

export const CollectionTable: React.FC<Props> = ({ collections, onDelete }) => {
  if (collections.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-neutral-200">
        <ImageIcon className="mx-auto h-12 w-12 text-neutral-300" />
        <h3 className="mt-2 text-sm font-semibold text-neutral-900">No collections found</h3>
        <p className="mt-1 text-sm text-neutral-500">Get started by creating a new collection.</p>
        <div className="mt-6">
          <Link
            to="/admin/collections/new"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800"
          >
            Add Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Collection</th>
                <th className="px-6 py-4 font-medium">Products</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Display Order</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {collections.map((collection) => (
                <tr key={collection.id} className="hover:bg-neutral-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {collection.featured_image ? (
                        <img 
                          src={collection.featured_image} 
                          alt={collection.name}
                          className="w-12 h-12 rounded-lg object-cover bg-neutral-100"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-neutral-400" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/admin/collections/${collection.id}`}
                            className="font-medium text-neutral-900 hover:text-neutral-600"
                          >
                            {collection.name}
                          </Link>
                          {collection.featured && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-neutral-500 text-xs mt-0.5">/{collection.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {collection.products_count || 0} products
                  </td>
                  <td className="px-6 py-4">
                    <CollectionStatusBadge status={collection.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-500">
                      <GripVertical className="w-4 h-4 text-neutral-400" />
                      {collection.sort_order}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        to={`/admin/collections/${collection.id}`}
                        className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to archive this collection?')) {
                            onDelete(collection.id);
                          }
                        }}
                        className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                        title="Archive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <div className="flex gap-4">
              {collection.featured_image ? (
                <img 
                  src={collection.featured_image} 
                  alt={collection.name}
                  className="w-20 h-20 rounded-lg object-cover bg-neutral-100"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-8 h-8 text-neutral-400" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-neutral-900 truncate">{collection.name}</h3>
                    {collection.featured && <Star className="w-3 h-3 text-yellow-500 fill-current shrink-0" />}
                  </div>
                </div>
                <p className="text-sm text-neutral-500 truncate mb-2">/{collection.slug}</p>
                <div className="flex items-center justify-between">
                  <CollectionStatusBadge status={collection.status} />
                  <span className="text-sm text-neutral-500">{collection.products_count || 0} products</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-end gap-3">
              <Link
                to={`/admin/collections/${collection.id}`}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-700 bg-neutral-50 rounded hover:bg-neutral-100"
              >
                <Edit className="w-4 h-4" /> Edit
              </Link>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to archive this collection?')) {
                    onDelete(collection.id);
                  }
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
