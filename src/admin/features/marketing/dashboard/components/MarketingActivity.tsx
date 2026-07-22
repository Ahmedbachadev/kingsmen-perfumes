import React from 'react';
import type { MarketingActivityItem } from '../types';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Mail, Ticket, Megaphone, Activity } from 'lucide-react';

interface MarketingActivityProps {
 feed: MarketingActivityItem[];
 isLoading: boolean;
}

export const MarketingActivity: React.FC<MarketingActivityProps> = ({ feed, isLoading }) => {
 if (isLoading) {
 return (
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
 <div className="h-6 w-32 bg-neutral-100 rounded animate-pulse mb-6" />
 <div className="space-y-4">
 {[1, 2, 3, 4, 5].map(i => (
 <div key={i} className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-neutral-100 animate-pulse shrink-0" />
 <div className="flex-1 space-y-2">
 <div className="h-4 w-3/4 bg-neutral-100 rounded animate-pulse" />
 <div className="h-3 w-1/2 bg-neutral-100 rounded animate-pulse" />
 </div>
 </div>
 ))}
 </div>
 </div>
 );
 }

 const getIcon = (type: string) => {
 switch (type) {
 case 'newsletter': return <Mail className="w-4 h-4 text-purple-600 " />;
 case 'coupon': return <Ticket className="w-4 h-4 text-emerald-600 " />;
 case 'campaign': return <Megaphone className="w-4 h-4 text-blue-600 " />;
 default: return <Activity className="w-4 h-4 text-neutral-600 " />;
 }
 };

 const getBgColor = (type: string) => {
 switch (type) {
 case 'newsletter': return 'bg-purple-50 ';
 case 'coupon': return 'bg-emerald-50 ';
 case 'campaign': return 'bg-blue-50 ';
 default: return 'bg-neutral-50 ';
 }
 };

 return (
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
 <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
 <Activity className="w-5 h-5 text-neutral-500" />
 Recent Activity
 </h3>

 <div className="space-y-6">
 {feed.map((item, index) => (
 <div key={item.id} className="relative flex gap-4">
 {/* Timeline connector */}
 {index !== feed.length - 1 && (
 <div className="absolute top-8 left-4 -ml-px h-full w-0.5 bg-neutral-100 " />
 )}
 
 <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${getBgColor(item.type)}`}>
 {getIcon(item.type)}
 </div>
 
 <div className="flex-1 pt-1 pb-4">
 <div className="flex items-center justify-between mb-1">
 <p className="text-sm font-medium text-neutral-900 ">{item.title}</p>
 <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
 {formatDistanceToNow(parseISO(item.timestamp), { addSuffix: true })}
 </span>
 </div>
 <p className="text-sm text-neutral-600 ">
 {item.description}
 </p>
 </div>
 </div>
 ))}

 {feed.length === 0 && (
 <div className="text-center py-8 text-neutral-500 text-sm">
 No recent activity found.
 </div>
 )}
 </div>
 </div>
 );
};
