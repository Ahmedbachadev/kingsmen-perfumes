import React, { useState } from 'react';
import type { ProductFilters as FilterType, DateRangePreset } from '../types';
import { startOfDay, endOfDay, subDays, startOfMonth, endOfMonth, startOfYear } from 'date-fns';
import { Filter, Calendar } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface ProductFiltersProps {
 filters: FilterType;
 onChange: (filters: FilterType) => void;
}

const presets: { label: string; value: DateRangePreset }[] = [
 { label: 'Today', value: 'today' },
 { label: 'Yesterday', value: 'yesterday' },
 { label: 'Last 7 Days', value: '7days' },
 { label: 'Last 30 Days', value: '30days' },
 { label: 'This Month', value: 'thisMonth' },
 { label: 'Last Month', value: 'lastMonth' },
 { label: 'This Year', value: 'thisYear' },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onChange }) => {
 const [showAdvanced, setShowAdvanced] = useState(false);

 const handleDatePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
 const preset = e.target.value as DateRangePreset;
 const now = new Date();
 let startDate = new Date();
 let endDate = new Date();

 switch (preset) {
 case 'today':
 startDate = startOfDay(now); endDate = endOfDay(now); break;
 case 'yesterday':
 startDate = startOfDay(subDays(now, 1)); endDate = endOfDay(subDays(now, 1)); break;
 case '7days':
 startDate = startOfDay(subDays(now, 7)); endDate = endOfDay(now); break;
 case '30days':
 startDate = startOfDay(subDays(now, 30)); endDate = endOfDay(now); break;
 case 'thisMonth':
 startDate = startOfMonth(now); endDate = endOfDay(now); break;
 case 'lastMonth':
 const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
 startDate = startOfMonth(lastMonth); endDate = endOfMonth(lastMonth); break;
 case 'thisYear':
 startDate = startOfYear(now); endDate = endOfDay(now); break;
 }

 onChange({ ...filters, dateRange: { preset, startDate, endDate } });
 };

 return (
 <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm mb-6">
 <div className="flex flex-wrap items-center justify-between gap-4">
 
 {/* Date Filter */}
 <div className="flex items-center gap-2">
 <Calendar className="w-4 h-4 text-neutral-500" />
 <select 
 className="bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-sm font-medium outline-none"
 value={filters.dateRange.preset}
 onChange={handleDatePresetChange}
 >
 {presets.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
 </select>
 </div>

 <button 
 onClick={() => setShowAdvanced(!showAdvanced)}
 className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
 >
 <Filter className="w-4 h-4" />
 {showAdvanced ? 'Hide Filters' : 'More Filters'}
 </button>
 </div>

 {showAdvanced && (
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-neutral-100 ">
 <div>
 <label className="block text-xs text-neutral-500 mb-1">Category</label>
 <select 
 className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-sm outline-none"
 value={filters.category || 'all'}
 onChange={(e) => onChange({ ...filters, category: e.target.value })}
 >
 <option value="all">All Categories</option>
 <option value="perfume">Perfume</option>
 <option value="cologne">Cologne</option>
 <option value="oil">Body Oil</option>
 </select>
 </div>
 <div>
 <label className="block text-xs text-neutral-500 mb-1">Collection</label>
 <select 
 className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-sm outline-none"
 value={filters.collection || 'all'}
 onChange={(e) => onChange({ ...filters, collection: e.target.value })}
 >
 <option value="all">All Collections</option>
 <option value="gentlemen">Gentlemen</option>
 <option value="ladies">Ladies</option>
 <option value="unisex">Unisex</option>
 </select>
 </div>
 <div>
 <label className="block text-xs text-neutral-500 mb-1">Status</label>
 <select 
 className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-sm outline-none"
 value={filters.status || 'all'}
 onChange={(e) => onChange({ ...filters, status: e.target.value })}
 >
 <option value="all">All Statuses</option>
 <option value="active">Active</option>
 <option value="draft">Draft</option>
 <option value="archived">Archived</option>
 </select>
 </div>
 </div>
 )}
 </div>
 );
};
