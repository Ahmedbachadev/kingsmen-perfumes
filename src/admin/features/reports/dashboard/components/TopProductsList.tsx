import React from 'react';
import type { TopProduct } from '../types';

interface TopProductsListProps {
 products: TopProduct[];
 isLoading?: boolean;
}

export const TopProductsList: React.FC<TopProductsListProps> = ({ products, isLoading }) => {
 if (isLoading) {
 return (
 <div className="space-y-4">
 {[1, 2, 3].map((i) => (
 <div key={i} className="flex items-center justify-between animate-pulse">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-neutral-200 rounded-lg" />
 <div className="h-4 w-24 bg-neutral-200 rounded" />
 </div>
 <div className="h-4 w-16 bg-neutral-200 rounded" />
 </div>
 ))}
 </div>
 );
 }

 if (!products || products.length === 0) {
 return (
 <div className="flex items-center justify-center h-full text-neutral-500 text-sm py-8">
 No product data available.
 </div>
 );
 }

 const maxRevenue = Math.max(...products.map(p => p.revenue));

 return (
 <div className="space-y-5">
 {products.map((product, index) => (
 <div key={product.id} className="relative">
 <div className="flex items-center justify-between text-sm mb-1">
 <span className="font-medium text-neutral-900 truncate pr-4">
 {index + 1}. {product.title}
 </span>
 <span className="font-semibold text-neutral-900 whitespace-nowrap">
 ${product.revenue.toLocaleString()}
 </span>
 </div>
 
 <div className="flex items-center gap-3">
 <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
 <div 
 className="h-full bg-blue-500 rounded-full"
 style={{ width: `${(product.revenue / maxRevenue) * 100}%` }}
 />
 </div>
 <span className="text-xs text-neutral-500 w-16 text-right">
 {product.sold} sales
 </span>
 </div>
 </div>
 ))}
 </div>
 );
};
