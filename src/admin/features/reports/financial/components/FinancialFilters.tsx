import React from 'react';
import type { FinancialFilters as FilterType, DateRangePreset } from '../types';
import { startOfDay, endOfDay, subDays, startOfMonth, endOfMonth, startOfYear } from 'date-fns';
import { Calendar } from 'lucide-react';

interface FinancialFiltersProps {
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

export const FinancialFilters: React.FC<FinancialFiltersProps> = ({ filters, onChange }) => {
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
 <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm mb-6 flex flex-wrap items-center gap-4">
 
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

 </div>
 );
};
