import React, { memo, useState } from 'react';
import { MoreHorizontal, Edit, Trash2, ExternalLink, Image as ImageIcon, Star } from 'lucide-react';
import { ProductStatusBadge } from './ProductStatusBadge';
import { cn } from '../../../../utils/cn';
import type { ProductWithRelations } from '../../../../../services/supabase/products.service';

interface ProductRowProps {
 product: ProductWithRelations;
 onEdit: (id: string) => void;
 onDelete: (id: string) => void;
}

export const ProductRow = memo(function ProductRow({ product, onEdit, onDelete }: ProductRowProps) {
 const [showMenu, setShowMenu] = useState(false);

 const formatPrice = (price: number) => {
 return new Intl.NumberFormat('en-PK', {
 style: 'currency',
 currency: 'PKR',
 minimumFractionDigits: 0,
 }).format(price);
 };

 const isLowStock = product.inventory <= (product.low_stock_threshold || 5);

 return (
 <tr className="group hover:bg-slate-50/50 transition-colors duration-200">
 <td className="px-4 py-3">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60 flex-shrink-0 relative group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300">
 {product.images?.[0] ? (
 <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
 ) : (
 <ImageIcon className="w-4 h-4 text-slate-400" />
 )}
 {product.is_featured && (
 <div className="absolute top-0 right-0 p-0.5 bg-amber-500 rounded-bl-xl backdrop-blur-md">
 <Star className="w-2 h-2 text-white fill-white" />
 </div>
 )}
 </div>
 <div className="min-w-0">
 <p className="text-sm font-semibold text-slate-900 truncate max-w-[200px]" title={product.name}>
 {product.name}
 </p>
 <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5 tracking-wide">{product.variants?.[0]?.sku || 'No SKU'}</p>
 </div>
 </div>
 </td>
 <td className="px-4 py-3">
 <span className="text-sm font-medium text-slate-600 ">
 {product.collection?.name || '—'}
 </span>
 </td>
 <td className="px-4 py-3">
 <span className="text-sm font-medium text-slate-600 bg-slate-100/80 px-2 py-1 rounded-lg">
 {product.category?.name || '—'}
 </span>
 </td>
 <td className="px-4 py-3">
 <div className="flex items-center gap-2">
 <span className="text-sm font-semibold text-slate-900 ">
 {formatPrice(product.sale_price ?? product.regular_price)}
 </span>
 {product.sale_price && (
 <span className="text-xs font-medium text-slate-400 line-through">
 {formatPrice(product.regular_price)}
 </span>
 )}
 </div>
 </td>
 <td className="px-4 py-3">
 <span className={cn(
 "text-sm font-medium px-2 py-1 rounded-lg",
 isLowStock 
 ? "text-rose-700 bg-rose-50 " 
 : "text-slate-700 bg-slate-100/80 "
 )}>
 {product.inventory}
 </span>
 </td>
 <td className="px-4 py-3">
 <ProductStatusBadge status={product.status || 'draft'} />
 </td>
 <td className="px-4 py-3 text-sm font-medium text-slate-500 whitespace-nowrap">
 {new Date(product.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
 </td>
 <td className="px-4 py-3 text-right">
 <div className="relative inline-block text-left">
 <button
 onClick={() => setShowMenu(!showMenu)}
 onBlur={() => setTimeout(() => setShowMenu(false), 200)}
 className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-all duration-200 ease-out opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-sm border border-transparent hover:border-slate-200/60"
 >
 <MoreHorizontal className="w-4 h-4" />
 </button>
 
 {showMenu && (
 <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-30 py-1.5 overflow-hidden transform origin-top-right transition-all duration-200 ease-out">
 <button
 onClick={() => {}} // Placeholder for storefront link
 className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
 >
 <ExternalLink className="w-4 h-4 text-slate-400" />
 View on Store
 </button>
 <button
 onClick={() => onEdit(product.id)}
 className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
 >
 <Edit className="w-4 h-4 text-slate-400" />
 Edit Product
 </button>
 <div className="h-px bg-slate-100 my-1.5"></div>
 <button
 onClick={() => onDelete(product.id)}
 className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
 >
 <Trash2 className="w-4 h-4" />
 Delete
 </button>
 </div>
 )}
 </div>
 </td>
 </tr>
 );
});
