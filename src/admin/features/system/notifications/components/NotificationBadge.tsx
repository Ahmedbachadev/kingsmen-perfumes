import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { supabase } from '../../../../../lib/supabase';
import { NotificationService } from '../services/notification.service';
import { cn } from '../../../../utils/cn';
import { Link } from 'react-router-dom';

export const NotificationBadge: React.FC = () => {
 const [unreadCount, setUnreadCount] = useState(0);

 useEffect(() => {
 fetchUnreadCount();

 const channel = supabase
 .channel('admin_badge_changes')
 .on(
 'postgres_changes',
 { event: '*', schema: 'public', table: 'admin_notifications' },
 () => {
 fetchUnreadCount();
 }
 )
 .subscribe();

 return () => {
 supabase.removeChannel(channel);
 };
 }, []);

 const fetchUnreadCount = async () => {
 try {
 const { data } = await NotificationService.getNotifications(100);
 const unread = data?.filter(n => !n.is_read).length || 0;
 setUnreadCount(unread);
 } catch (error) {
 console.error('Failed to fetch unread count');
 }
 };

 return (
 <Link 
 to="/admin/notifications"
 className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-100"
 title="Notifications"
 >
 <Bell className="w-5 h-5" />
 {unreadCount > 0 && (
 <span className={cn(
 "absolute top-1.5 right-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-white ",
 unreadCount > 9 ? "h-3 w-3" : ""
 )}>
 {/* Optional: we could show count if we want, but a dot is cleaner */}
 </span>
 )}
 </Link>
 );
};
