import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import type { DateRange, DateFilter } from '../types';
import { subDays, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear } from 'date-fns';

interface DateRangePickerProps {
 value: DateFilter;
 onChange: (filter: DateFilter) => void;
}

const ranges: { label: string; value: DateRange }[] = [
 { label: 'Today', value: 'today' },
 { label: 'Yesterday', value: 'yesterday' },
 { label: 'Last 7 Days', value: '7days' },
 { label: 'Last 30 Days', value: '30days' },
 { label: 'This Month', value: 'thisMonth' },
 { label: 'Last Month', value: 'lastMonth' },
 { label: 'This Year', value: 'thisYear' },
];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const handleClickOutside = (event: MouseEvent) => {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
 setIsOpen(false);
 }
 };
 document.addEventListener('mousedown', handleClickOutside);
 return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const handleSelect = (range: DateRange) => {
 const now = new Date();
 let startDate = new Date();
 let endDate = new Date();

 switch (range) {
 case 'today':
 startDate = startOfDay(now);
 endDate = endOfDay(now);
 break;
 case 'yesterday':
 startDate = startOfDay(subDays(now, 1));
 endDate = endOfDay(subDays(now, 1));
 break;
 case '7days':
 startDate = startOfDay(subDays(now, 7));
 endDate = endOfDay(now);
 break;
 case '30days':
 startDate = startOfDay(subDays(now, 30));
 endDate = endOfDay(now);
 break;
 case 'thisMonth':
 startDate = startOfMonth(now);
 endDate = endOfDay(now);
 break;
 case 'lastMonth':
 const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
 startDate = startOfMonth(lastMonth);
 endDate = endOfMonth(lastMonth);
 break;
 case 'thisYear':
 startDate = startOfYear(now);
 endDate = endOfDay(now);
 break;
 }

 onChange({ range, startDate, endDate });
 setIsOpen(false);
 };

 const currentLabel = ranges.find(r => r.value === value.range)?.label || 'Custom';

 return (
 <div className="relative" ref={dropdownRef}>
 <button
 onClick={() => setIsOpen(!isOpen)}
 className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors shadow-sm"
 >
 <CalendarIcon className="w-4 h-4 text-neutral-500" />
 {currentLabel}
 <ChevronDown className="w-4 h-4 text-neutral-500 ml-1" />
 </button>

 {isOpen && (
 <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden">
 <div className="py-1">
 {ranges.map((range) => (
 <button
 key={range.value}
 onClick={() => handleSelect(range.value)}
 className={cn(
 "w-full text-left px-4 py-2 text-sm transition-colors",
 value.range === range.value
 ? "bg-neutral-100 text-neutral-900 font-medium"
 : "text-neutral-600 hover:bg-neutral-50"
 )}
 >
 {range.label}
 </button>
 ))}
 </div>
 </div>
 )}
 </div>
 );
};
