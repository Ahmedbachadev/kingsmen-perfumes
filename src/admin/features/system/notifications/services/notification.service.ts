import { supabase } from '../../../../../lib/supabase';
import type { AdminNotification } from '../types';

export const NotificationService = {
 async getNotifications(limit = 50, offset = 0) {
 const { data, error, count } = await supabase
 .from('admin_notifications')
 .select('*', { count: 'exact' })
 .order('created_at', { ascending: false })
 .range(offset, offset + limit - 1);

 if (error) {
 console.error('Error fetching notifications:', error);
 throw error;
 }

 return { data: data as AdminNotification[], count };
 },

 async markAsRead(id: string) {
 const { error } = await supabase
 .from('admin_notifications')
 .update({ is_read: true })
 .eq('id', id);

 if (error) {
 console.error('Error marking notification as read:', error);
 throw error;
 }
 },

 async markAllAsRead() {
 const { error } = await supabase
 .from('admin_notifications')
 .update({ is_read: true })
 .eq('is_read', false);

 if (error) {
 console.error('Error marking all as read:', error);
 throw error;
 }
 },

 async deleteNotification(id: string) {
 const { error } = await supabase
 .from('admin_notifications')
 .delete()
 .eq('id', id);

 if (error) {
 console.error('Error deleting notification:', error);
 throw error;
 }
 },

 // Note: we can subscribe to changes in the UI component
};
