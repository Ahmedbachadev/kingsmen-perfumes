import React, { useState } from 'react';
import {
 BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
 AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import type { SalesPerProductDataPoint, InventoryTrendDataPoint, CollectionPerformanceDataPoint } from '../types';
import { cn } from '../../../../utils/cn';

interface ProductChartsProps {
 charts: {
 salesPerProduct: SalesPerProductDataPoint[];
 inventoryTrend: InventoryTrendDataPoint[];
 collectionPerformance: CollectionPerformanceDataPoint[];
 };
 isLoading: boolean;
}

type ChartTab = 'sales' | 'inventory' | 'collections';

export const ProductCharts: React.FC<ProductChartsProps> = ({ charts, isLoading }) => {
 const [activeTab, setActiveTab] = useState<ChartTab>('sales');

 if (isLoading) {
 return <div className="h-[400px] w-full bg-neutral-100 rounded-xl animate-pulse mb-6" />;
 }

 const renderChart = () => {
 switch (activeTab) {
 case 'sales':
 return (
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={charts.salesPerProduct} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="" />
 <XAxis 
 dataKey="product" 
 axisLine={false}
 tickLine={false}
 tick={{ fontSize: 11, fill: '#6b7280' }}
 angle={-45}
 textAnchor="end"
 height={60}
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
 <p className="text-sm text-neutral-500">
 Revenue: <span className="font-semibold text-emerald-600">${payload[0].value?.toLocaleString()}</span>
 </p>
 <p className="text-sm text-neutral-500">
 Sold: <span className="font-semibold text-blue-600">{payload[0].payload.sold} units</span>
 </p>
 </div>
 );
 }
 return null;
 }} 
 />
 <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
 </BarChart>
 </ResponsiveContainer>
 );

 case 'inventory':
 return (
 <ResponsiveContainer width="100%" height="100%">
 <AreaChart data={charts.inventoryTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
 <defs>
 <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
 <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
 <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
 dx={-10}
 />
 <RechartsTooltip 
 contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
 itemStyle={{ color: '#171717' }}
 />
 <Area type="monotone" dataKey="balance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBalance)" />
 </AreaChart>
 </ResponsiveContainer>
 );

 case 'collections':
 return (
 <div className="flex items-center h-full">
 <div className="flex-1 h-full">
 <ResponsiveContainer width="100%" height="100%">
 <PieChart>
 <Pie
 data={charts.collectionPerformance}
 cx="50%"
 cy="50%"
 innerRadius={80}
 outerRadius={110}
 paddingAngle={2}
 dataKey="value"
 >
 {charts.collectionPerformance.map((entry, index) => (
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
 {charts.collectionPerformance.map((item) => (
 <div key={item.name} className="flex items-center gap-3">
 <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
 <div>
 <div className="text-sm font-medium text-neutral-900 ">{item.name}</div>
 <div className="text-xs text-neutral-500">Rs {item.value.toLocaleString()}</div>
 </div>
 </div>
 ))}
 </div>
 </div>
 );
 }
 };

 return (
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm mb-6">
 <div className="flex items-center justify-between mb-6">
 <h3 className="text-lg font-bold text-neutral-900 ">Performance Overview</h3>
 <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
 {(['sales', 'inventory', 'collections'] as ChartTab[]).map((tab) => (
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
 {tab.replace('sales', 'Sales per Product').replace('inventory', 'Inventory Trend').replace('collections', 'By Collection')}
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
