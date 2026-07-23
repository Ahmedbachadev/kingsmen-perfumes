import React, { useState } from 'react';
import {
 BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
 LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import type { CollectionChartDataPoint, CollectionGrowthDataPoint } from '../types';
import { cn } from '../../../../utils/cn';

interface CollectionChartsProps {
 charts: {
 distribution: CollectionChartDataPoint[];
 growth: CollectionGrowthDataPoint[];
 };
 isLoading: boolean;
}

type ChartTab = 'revenue' | 'orders' | 'growth';

export const CollectionCharts: React.FC<CollectionChartsProps> = ({ charts, isLoading }) => {
 const [activeTab, setActiveTab] = useState<ChartTab>('revenue');

 if (isLoading) {
 return <div className="h-[400px] w-full bg-neutral-100 rounded-xl animate-pulse mb-6" />;
 }

 // Get dynamic collection names for the line chart
 const collectionNames = charts.distribution.map(d => d.collection);

 const renderChart = () => {
 switch (activeTab) {
 case 'revenue':
 return (
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={charts.distribution} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="" />
 <XAxis 
 dataKey="collection" 
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
 <RechartsTooltip 
 cursor={{ fill: 'rgba(0,0,0,0.05)' }}
 content={({ active, payload, label }) => {
 if (active && payload && payload.length) {
 return (
 <div className="bg-white border border-neutral-200 p-3 rounded-lg shadow-lg">
 <p className="text-sm font-medium text-neutral-900 mb-1">{label}</p>
 <div className="flex justify-between items-center">
 <span className="text-sm text-neutral-600">Revenue:</span>
 <span className="font-semibold text-emerald-600">Rs {Number(payload[0].value).toLocaleString()}</span>
 </div>
 </div>
 );
 }
 return null;
 }} 
 />
 <Bar dataKey="revenue" radius={[4, 4, 0, 0]} maxBarSize={60}>
 {charts.distribution.map((entry, index) => (
 <Cell key={`cell-${index}`} fill={entry.color} />
 ))}
 </Bar>
 </BarChart>
 </ResponsiveContainer>
 );

 case 'orders':
 return (
 <div className="flex items-center h-full">
 <div className="flex-1 h-full">
 <ResponsiveContainer width="100%" height="100%">
 <PieChart>
 <Pie
 data={charts.distribution}
 cx="50%"
 cy="50%"
 innerRadius={80}
 outerRadius={110}
 paddingAngle={2}
 dataKey="orders"
 nameKey="collection"
 >
 {charts.distribution.map((entry, index) => (
 <Cell key={`cell-${index}`} fill={entry.color} />
 ))}
 </Pie>
 <RechartsTooltip 
 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
 />
 </PieChart>
 </ResponsiveContainer>
 </div>
 <div className="w-1/3 flex flex-col justify-center gap-4">
 {charts.distribution.map((item) => (
 <div key={item.collection} className="flex items-center gap-3">
 <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
 <div>
 <div className="text-sm font-medium text-neutral-900 ">{item.collection}</div>
 <div className="text-xs text-neutral-500">{item.orders.toLocaleString()} Orders</div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );

 case 'growth':
 return (
 <ResponsiveContainer width="100%" height="100%">
 <LineChart data={charts.growth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
 <RechartsTooltip 
 contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
 itemStyle={{ color: '#171717', fontSize: '12px' }}
 formatter={(value: number) => [`$${value.toFixed(0)}`, undefined]}
 />
 {collectionNames.map((name, index) => {
 const color = charts.distribution.find(d => d.collection === name)?.color || '#000';
 return (
 <Line 
 key={name}
 type="monotone" 
 dataKey={name} 
 stroke={color} 
 strokeWidth={2}
 dot={false}
 />
 );
 })}
 </LineChart>
 </ResponsiveContainer>
 );
 }
 };

 return (
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm mb-6">
 <div className="flex items-center justify-between mb-6">
 <h3 className="text-lg font-bold text-neutral-900 ">Performance Charts</h3>
 <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
 {(['revenue', 'orders', 'growth'] as ChartTab[]).map((tab) => (
 <button
 key={tab}
 onClick={() => setActiveTab(tab)}
 className={cn(
 "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors",
 activeTab === tab 
 ? "bg-white text-neutral-900 shadow-sm" 
 : "text-neutral-500 hover:text-neutral-700"
 )}
 >
 {tab.replace('revenue', 'Collection Revenue').replace('orders', 'Collection Orders').replace('growth', 'Collection Growth')}
 </button>
 ))}
 </div>
 </div>

 <div className="h-[350px] w-full">
 {renderChart()}
 </div>
 </div>
 );
};
