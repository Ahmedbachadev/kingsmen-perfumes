import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
 Bell, 
 ShoppingCart, 
 Package, 
 Users, 
 Megaphone, 
 AlertTriangle,
 CheckCircle2,
 X
} from 'lucide-react';
import type { AdminNotification, NotificationPriority, NotificationType } from '../types';
import { cn } from '../../../../utils/cn';

interface NotificationItemProps {
 notification: AdminNotification;
 onMarkAsRead: (id: string) => void;
 onDelete: (id: string) => void;
}

const getIconForType = (type: NotificationType) => {
 switch (type) {
 case 'order': return <ShoppingCart className="w-5 h-5" />;
 case 'inventory': return <Package className="w-5 h-5" />;
 case 'customer': return <Users className="w-5 h-5" />;
 case 'marketing': return <Megaphone className="w-5 h-5" />;
 case 'system': return <AlertTriangle className="w-5 h-5" />;
 case 'support': return <Bell className="w-5 h-5" />;
 default: return <Bell className="w-5 h-5" />;
 }
};

const getPriorityStyles = (priority: NotificationPriority) => {
 switch (priority) {
 case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
 case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
 case 'medium': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
 case 'low': return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20';
 default: return 'bg-neutral-500/10 text-neutral-500 border-neutral-500/20';
 }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
 notification, 
 onMarkAsRead, 
 onDelete 
}) => {
 return (
 <div className={cn(
 "group relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-200",
 "hover:shadow-md hover:bg-neutral-50/50",
 notification.is_read 
 ? "bg-white border-neutral-200 opacity-70" 
 : "bg-blue-50/30 border-blue-100 shadow-sm"
 )}>
 {/* Priority Indicator Line */}
 {!notification.is_read && (
 <div className={cn(
 "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full",
 notification.priority === 'critical' ? 'bg-red-500' :
 notification.priority === 'high' ? 'bg-orange-500' :
 notification.priority === 'medium' ? 'bg-blue-500' : 'bg-neutral-400'
 )} />
 )}

 {/* Icon */}
 <div className={cn(
 "flex-shrink-0 p-2.5 rounded-full border",
 getPriorityStyles(notification.priority)
 )}>
 {getIconForType(notification.type)}
 </div>

 {/* Content */}
 <div className="flex-1 min-w-0 pt-0.5">
 <div className="flex items-start justify-between gap-2">
 <h4 className={cn(
 "text-sm font-semibold truncate",
 notification.is_read ? "text-neutral-700 " : "text-neutral-900 "
 )}>
 {notification.title}
 </h4>
 <span className="text-xs text-neutral-500 whitespace-nowrap">
 {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
 </span>
 </div>
 
 <p className="mt-1 text-sm text-neutral-600 line-clamp-2">
 {notification.description}
 </p>

 {notification.link && (
 <a 
 href={notification.link} 
 className="inline-block mt-2 text-xs font-medium text-blue-600 hover:underline"
 >
 View Details &rarr;
 </a>
 )}
 </div>

 {/* Actions */}
 <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
 {!notification.is_read && (
 <button 
 onClick={() => onMarkAsRead(notification.id)}
 className="p-1.5 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
 title="Mark as read"
 >
 <CheckCircle2 className="w-4 h-4" />
 </button>
 )}
 <button 
 onClick={() => onDelete(notification.id)}
 className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
 title="Delete notification"
 >
 <X className="w-4 h-4" />
 </button>
 </div>
 </div>
 );
};
