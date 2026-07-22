import React from 'react';
import { ShoppingCart, User, Package } from 'lucide-react';
import type { ActivityItem } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivityFeedProps {
 activities: ActivityItem[];
 isLoading?: boolean;
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities, isLoading }) => {
 if (isLoading) {
 return (
 <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
 {[1, 2, 3].map((i) => (
 <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-pulse">
 <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-neutral-200 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm" />
 <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-neutral-100 bg-neutral-50 ">
 <div className="h-4 w-1/2 bg-neutral-200 rounded mb-2" />
 <div className="h-3 w-3/4 bg-neutral-200 rounded" />
 </div>
 </div>
 ))}
 </div>
 );
 }

 if (!activities || activities.length === 0) {
 return (
 <div className="flex items-center justify-center h-full text-neutral-500 text-sm py-8">
 No recent activity to display.
 </div>
 );
 }

 const getIcon = (type: ActivityItem['type']) => {
 switch (type) {
 case 'order': return <ShoppingCart className="w-4 h-4 text-blue-500" />;
 case 'customer': return <User className="w-4 h-4 text-emerald-500" />;
 case 'inventory': return <Package className="w-4 h-4 text-orange-500" />;
 }
 };

 return (
 <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
 {activities.map((item, index) => (
 <div key={item.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
 {/* Icon */}
 <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-neutral-100 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
 {getIcon(item.type)}
 </div>
 
 {/* Card */}
 <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
 <div className="flex items-center justify-between mb-1">
 <h4 className="font-semibold text-sm text-neutral-900 ">
 {item.title}
 </h4>
 <time className="text-xs text-neutral-500">
 {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
 </time>
 </div>
 <p className="text-sm text-neutral-600 ">
 {item.description}
 </p>
 </div>
 </div>
 ))}
 </div>
 );
};
