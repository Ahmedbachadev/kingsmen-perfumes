import React, { useState } from 'react';
import {
 BarChart,
 Bar,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 ResponsiveContainer
} from 'recharts';
import type { RevenueDataPoint } from '../types';
import { cn } from '../../../../utils/cn';

interface SalesChartsProps {
 charts: {
 daily: RevenueDataPoint[];
 weekly: RevenueDataPoint[];
 monthly: RevenueDataPoint[];
 yearly: RevenueDataPoint[];
 };
 isLoading: boolean;
}

type ChartInterval = 'daily' | 'weekly' | 'monthly' | 'yearly';

export const SalesCharts: React.FC<SalesChartsProps> = ({ charts, isLoading }) => {
 const [interval, setInterval] = useState<ChartInterval>('daily');

 if (isLoading) {
 return <div className="h-[400px] w-full bg-neutral-100 rounded-xl animate-pulse mb-6" />;
 }

 const data = charts[interval];

 return (
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm mb-6">
 <div className="flex items-center justify-between mb-6">
 <h3 className="text-lg font-bold text-neutral-900 ">Revenue Overview</h3>
 <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
 {(['daily', 'weekly', 'monthly', 'yearly'] as ChartInterval[]).map((int) => (
 <button
 key={int}
 onClick={() => setInterval(int)}
 className={cn(
 "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors",
 interval === int 
 ? "bg-white text-neutral-900 shadow-sm" 
 : "text-neutral-500 hover:text-neutral-700"
 )}
 >
 {int}
 </button>
 ))}
 </div>
 </div>

 <div className="h-[300px] w-full">
 {data.length === 0 ? (
 <div className="h-full flex items-center justify-center text-neutral-500 text-sm">
 No data available.
 </div>
 ) : (
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="" />
 <XAxis 
 dataKey="date" 
 axisLine={false}
 tickLine={false}
 tick={{ fontSize: 12, fill: '#6b7280' }}
 dy={10}
 />
 <YAxis 
 axisLine={false}
 tickLine={false}
 tick={{ fontSize: 12, fill: '#6b7280' }}
 tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
 dx={-10}
 />
 <Tooltip 
 cursor={{ fill: 'rgba(0,0,0,0.05)' }}
 content={({ active, payload, label }) => {
 if (active && payload && payload.length) {
 return (
 <div className="bg-white border border-neutral-200 p-3 rounded-lg shadow-lg">
 <p className="text-sm text-neutral-500 mb-1">{label}</p>
 <p className="text-sm font-semibold text-neutral-900 ">
 ${payload[0].value.toLocaleString()}
 </p>
 </div>
 );
 }
 return null;
 }} 
 />
 <Bar 
 dataKey="revenue" 
 fill="#3b82f6" 
 radius={[4, 4, 0, 0]}
 maxBarSize={40}
 />
 </BarChart>
 </ResponsiveContainer>
 )}
 </div>
 </div>
 );
};
