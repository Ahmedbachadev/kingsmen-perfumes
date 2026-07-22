import React from 'react';
import { cn } from '../../../../utils/cn';
import type { NotificationType } from '../types';

export type FilterOption = NotificationType | 'all' | 'unread';

interface NotificationFiltersProps {
 currentFilter: FilterOption;
 onFilterChange: (filter: FilterOption) => void;
}

const filters: { label: string; value: FilterOption }[] = [
 { label: 'All', value: 'all' },
 { label: 'Unread', value: 'unread' },
 { label: 'Orders', value: 'order' },
 { label: 'Inventory', value: 'inventory' },
 { label: 'Customers', value: 'customer' },
 { label: 'Marketing', value: 'marketing' },
 { label: 'System', value: 'system' },
];

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
 currentFilter,
 onFilterChange,
}) => {
 return (
 <div className="flex flex-wrap gap-2 mb-6">
 {filters.map((filter) => (
 <button
 key={filter.value}
 onClick={() => onFilterChange(filter.value)}
 className={cn(
 "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
 currentFilter === filter.value
 ? "bg-neutral-900 text-white shadow-sm"
 : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
 )}
 >
 {filter.label}
 </button>
 ))}
 </div>
 );
};
