import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../../lib/supabase';
import type { AdminNotification } from '../types';
import { NotificationService } from '../services/notification.service';
import { NotificationItem } from './NotificationItem';
import { NotificationFilters, type FilterOption } from './NotificationFilters';
import { CheckCheck, Inbox } from 'lucide-react';

export const NotificationList: React.FC = () => {
 const [notifications, setNotifications] = useState<AdminNotification[]>([]);
 const [filter, setFilter] = useState<FilterOption>('all');
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 fetchNotifications();

 // Subscribe to realtime changes
 const channel = supabase
 .channel('admin_notifications_changes')
 .on(
 'postgres_changes',
 { event: '*', schema: 'public', table: 'admin_notifications' },
 (payload) => {
 // Instead of complex optimistic updates, we simply refetch to ensure consistency
 // For a high volume app we'd handle insert/update/delete specifically
 fetchNotifications();
 }
 )
 .subscribe();

 return () => {
 supabase.removeChannel(channel);
 };
 }, []);

 const fetchNotifications = async () => {
 try {
 const { data } = await NotificationService.getNotifications(100);
 setNotifications(data || []);
 } catch (error) {
 console.error('Failed to fetch notifications');
 } finally {
 setLoading(false);
 }
 };

 const handleMarkAsRead = async (id: string) => {
 try {
 // Optimistic update
 setNotifications(prev => 
 prev.map(n => n.id === id ? { ...n, is_read: true } : n)
 );
 await NotificationService.markAsRead(id);
 } catch (error) {
 // Revert on error (could implement full rollback here)
 fetchNotifications();
 }
 };

 const handleDelete = async (id: string) => {
 try {
 setNotifications(prev => prev.filter(n => n.id !== id));
 await NotificationService.deleteNotification(id);
 } catch (error) {
 fetchNotifications();
 }
 };

 const handleMarkAllAsRead = async () => {
 try {
 setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
 await NotificationService.markAllAsRead();
 } catch (error) {
 fetchNotifications();
 }
 };

 const filteredNotifications = notifications.filter(n => {
 if (filter === 'all') return true;
 if (filter === 'unread') return !n.is_read;
 return n.type === filter;
 });

 return (
 <div className="w-full max-w-4xl mx-auto">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
 <div>
 <h1 className="text-2xl font-bold text-neutral-900 ">Inbox</h1>
 <p className="text-sm text-neutral-500 mt-1">
 Operational alerts and business events
 </p>
 </div>
 <button
 onClick={handleMarkAllAsRead}
 className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
 >
 <CheckCheck className="w-4 h-4" />
 Mark all as read
 </button>
 </div>

 <NotificationFilters currentFilter={filter} onFilterChange={setFilter} />

 <div className="space-y-3">
 {loading ? (
 // Skeletons
 Array.from({ length: 5 }).map((_, i) => (
 <div key={i} className="animate-pulse flex gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50">
 <div className="w-10 h-10 rounded-full bg-neutral-200" />
 <div className="flex-1 space-y-2 py-1">
 <div className="h-4 bg-neutral-200 rounded w-1/4" />
 <div className="h-3 bg-neutral-200 rounded w-3/4" />
 </div>
 </div>
 ))
 ) : filteredNotifications.length > 0 ? (
 filteredNotifications.map((notification) => (
 <NotificationItem
 key={notification.id}
 notification={notification}
 onMarkAsRead={handleMarkAsRead}
 onDelete={handleDelete}
 />
 ))
 ) : (
 <div className="flex flex-col items-center justify-center py-20 text-center px-4">
 <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
 <Inbox className="w-8 h-8 text-neutral-400" />
 </div>
 <h3 className="text-lg font-medium text-neutral-900 mb-1">
 All caught up
 </h3>
 <p className="text-neutral-500 max-w-sm">
 You don't have any notifications that match this filter. Take a break!
 </p>
 </div>
 )}
 </div>
 </div>
 );
};
