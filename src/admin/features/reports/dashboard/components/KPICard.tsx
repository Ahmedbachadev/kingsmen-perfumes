import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface KPICardProps {
 title: string;
 value: string | number;
 change: number;
 prefix?: string;
 suffix?: string;
 isLoading?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
 title,
 value,
 change,
 prefix = '',
 suffix = '',
 isLoading = false
}) => {
 const isPositive = change > 0;
 const isNegative = change < 0;
 const isNeutral = change === 0;

 return (
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
 <h3 className="text-sm font-medium text-neutral-500 mb-2">
 {title}
 </h3>
 
 {isLoading ? (
 <div className="space-y-3">
 <div className="h-8 w-24 bg-neutral-200 rounded animate-pulse" />
 <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse" />
 </div>
 ) : (
 <>
 <div className="flex items-baseline gap-1">
 <span className="text-3xl font-bold text-neutral-900 ">
 {prefix}{typeof value === 'number' && prefix === '$' ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value.toLocaleString()}{suffix}
 </span>
 </div>

 <div className="mt-2 flex items-center gap-1.5 text-sm">
 <span className={cn(
 "flex items-center font-medium",
 isPositive ? "text-emerald-600 " :
 isNegative ? "text-red-600 " :
 "text-neutral-500"
 )}>
 {isPositive && <TrendingUp className="w-4 h-4 mr-1" />}
 {isNegative && <TrendingDown className="w-4 h-4 mr-1" />}
 {isNeutral && <Minus className="w-4 h-4 mr-1" />}
 {Math.abs(change)}%
 </span>
 <span className="text-neutral-500 ">
 vs previous period
 </span>
 </div>
 </>
 )}
 </div>
 );
};
