import React from 'react';
import { cn } from '../../../../utils/cn';

interface ProductStatusBadgeProps {
 status: 'active' | 'draft' | 'archived' | string;
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
 return (
 <span className={cn(
 "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase",
 status === 'active' && "bg-emerald-50 text-emerald-700 ",
 status === 'draft' && "bg-slate-100 text-slate-700 ",
 status === 'archived' && "bg-amber-50 text-amber-700 "
 )}>
 <span className={cn(
 "w-1.5 h-1.5 rounded-full",
 status === 'active' && "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
 status === 'draft' && "bg-slate-400",
 status === 'archived' && "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
 )} />
 {status}
 </span>
 );
}
