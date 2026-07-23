import React, { useState } from 'react';
import {
 AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
 LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import type { RevenueTrendDataPoint, PaymentStatusDataPoint } from '../types';
import { cn } from '../../../../utils/cn';

interface FinancialChartsProps {
 charts: {
 trend: RevenueTrendDataPoint[];
 paymentStatus: PaymentStatusDataPoint[];
 };
 isLoading: boolean;
}

type ChartTab = 'revenue' | 'profit' | 'payments';

export const FinancialCharts: React.FC<FinancialChartsProps> = ({ charts, isLoading }) => {
 const [activeTab, setActiveTab] = useState<ChartTab>('revenue');

 if (isLoading) {
 return <div className="h-[400px] w-full bg-neutral-100 rounded-xl animate-pulse mb-6" />;
 }

 const renderChart = () => {
 switch (activeTab) {
 case 'revenue':
 return (
 <ResponsiveContainer width="100%" height="100%">
 <AreaChart data={charts.trend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
 <defs>
 <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
 <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
 <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
 tickFormatter={(value) => `$${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
 dx={-10}
 />
 <RechartsTooltip 
 contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
 itemStyle={{ color: '#171717' }}
 formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
 />
 <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" />
 </AreaChart>
 </ResponsiveContainer>
 );

 case 'profit':
 return (
 <ResponsiveContainer width="100%" height="100%">
 <LineChart data={charts.trend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
 tickFormatter={(value) => `Rs${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
 dx={-10}
 />
 <RechartsTooltip 
 contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
 itemStyle={{ color: '#171717', fontSize: '12px' }}
 formatter={(value: number, name: string) => [`Rs${value.toFixed(2)}`, name === 'profit' ? 'Est. Profit' : 'Revenue']}
 />
 <Line type="monotone" dataKey="revenue" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" />
 <Line type="monotone" dataKey="profit" stroke="#16a34a" strokeWidth={3} dot={false} />
 </LineChart>
 </ResponsiveContainer>
 );

 case 'payments':
 return (
 <div className="flex items-center h-full">
 <div className="flex-1 h-full">
 <ResponsiveContainer width="100%" height="100%">
 <PieChart>
 <Pie
 data={charts.paymentStatus}
 cx="50%"
 cy="50%"
 innerRadius={80}
 outerRadius={110}
 paddingAngle={2}
 dataKey="value"
 >
 {charts.paymentStatus.map((entry, index) => (
 <Cell key={`cell-${index}`} fill={entry.color} />
 ))}
 </Pie>
 <RechartsTooltip 
 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
 formatter={(value: number) => [`Rs${value.toFixed(2)}`, 'Amount']}
 />
 </PieChart>
 </ResponsiveContainer>
 </div>
 <div className="w-1/3 flex flex-col justify-center gap-4">
 {charts.paymentStatus.map((item) => (
 <div key={item.name} className="flex items-center gap-3">
 <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
 <div>
 <div className="text-sm font-medium text-neutral-900 ">{item.name}</div>
 <div className="text-xs text-neutral-500">Rs{item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
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
 <h3 className="text-lg font-bold text-neutral-900 ">Financial Trends</h3>
 <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
 {(['revenue', 'profit', 'payments'] as ChartTab[]).map((tab) => (
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
 {tab.replace('revenue', 'Revenue').replace('profit', 'Profit Trend').replace('payments', 'Payment Status')}
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
