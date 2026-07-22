export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export type NotificationType = 
 | 'support'
 | 'order'
 | 'inventory'
 | 'customer'
 | 'marketing'
 | 'system';

export interface AdminNotification {
 id: string;
 type: NotificationType;
 title: string;
 description: string;
 priority: NotificationPriority;
 is_read: boolean;
 link?: string | null;
 created_at: string;
}
