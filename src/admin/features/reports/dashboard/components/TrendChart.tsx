import React from 'react';
import {
 AreaChart,
 Area,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 ResponsiveContainer
} from 'recharts';
import type { TrendDataPoint } from '../types';

interface TrendChartProps {
 data: TrendDataPoint[];
 metric: 'revenue' | 'orders';
 isLoading?: boolean;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, metric, isLoading }) => {
 if (isLoading) {
 return (
 <div className="h-[300px] w-full bg-neutral-100 rounded-xl animate-pulse" />
 );
 }

 if (!data || data.length === 0) {
 return (
 <div className="h-[300px] w-full flex items-center justify-center text-neutral-500">
 No data available for this period.
 </div>
 );
 }

 const formatYAxis = (value: number) => {
 if (metric === 'revenue') {
 if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
 return `$${value}`;
 }
 return value.toString();
 };

 const CustomTooltip = ({ active, payload, label }: any) => {
 if (active && payload && payload.length) {
 return (
 <div className="bg-white border border-neutral-200 p-3 rounded-lg shadow-lg">
 <p className="text-sm text-neutral-500 mb-1">{label}</p>
 <p className="text-sm font-semibold text-neutral-900 ">
 {metric === 'revenue' ? '$' : ''}
 {payload[0].value.toLocaleString()}
 {metric !== 'revenue' ? ' orders' : ''}
 </p>
 </div>
 );
 }
 return null;
 };

 return (
 <div className="h-[300px] w-full mt-4">
 <ResponsiveContainer width="100%" height="100%">
 <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
 <defs>
 <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
 <stop offset="5%" stopColor={metric === 'revenue' ? '#3b82f6' : '#8b5cf6'} stopOpacity={0.3}/>
 <stop offset="95%" stopColor={metric === 'revenue' ? '#3b82f6' : '#8b5cf6'} stopOpacity={0}/>
 </linearGradient>
 </defs>
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
 tickFormatter={formatYAxis}
 dx={-10}
 />
 <Tooltip content={<CustomTooltip />} />
 <Area
 type="monotone"
 dataKey={metric}
 stroke={metric === 'revenue' ? '#3b82f6' : '#8b5cf6'}
 strokeWidth={2}
 fillOpacity={1}
 fill="url(#colorMetric)"
 />
 </AreaChart>
 </ResponsiveContainer>
 </div>
 );
};
