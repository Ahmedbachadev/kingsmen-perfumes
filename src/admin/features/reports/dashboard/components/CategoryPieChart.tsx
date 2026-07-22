import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategorySales } from '../types';

interface CategoryPieChartProps {
 data: CategorySales[];
 isLoading?: boolean;
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data, isLoading }) => {
 if (isLoading) {
 return (
 <div className="h-[250px] w-full bg-neutral-100 rounded-xl animate-pulse" />
 );
 }

 if (!data || data.length === 0) {
 return (
 <div className="h-[250px] w-full flex items-center justify-center text-neutral-500 text-sm">
 No category data available.
 </div>
 );
 }

 return (
 <div className="h-[250px] w-full flex items-center">
 <div className="flex-1 h-full">
 <ResponsiveContainer width="100%" height="100%">
 <PieChart>
 <Pie
 data={data}
 cx="50%"
 cy="50%"
 innerRadius={60}
 outerRadius={80}
 paddingAngle={2}
 dataKey="value"
 >
 {data.map((entry, index) => (
 <Cell key={`cell-${index}`} fill={entry.color} />
 ))}
 </Pie>
 <Tooltip 
 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
 itemStyle={{ color: '#171717' }}
 />
 </PieChart>
 </ResponsiveContainer>
 </div>
 
 <div className="w-1/3 flex flex-col justify-center gap-3">
 {data.map((category) => (
 <div key={category.name} className="flex items-center gap-2 text-sm">
 <div 
 className="w-3 h-3 rounded-full flex-shrink-0" 
 style={{ backgroundColor: category.color }}
 />
 <div className="flex flex-col">
 <span className="text-neutral-600 font-medium">
 {category.name}
 </span>
 <span className="text-neutral-900 font-semibold">
 {category.value}%
 </span>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
};
