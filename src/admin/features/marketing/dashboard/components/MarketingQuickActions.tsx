import React from 'react';
import type { MarketingAction } from '../types';
import { Zap, Ticket, Image, Mail, Package, Layers } from 'lucide-react';

export const MarketingQuickActions: React.FC = () => {
 const handleAction = (actionId: string) => {
 // For now, alert or mock modal open
 alert(`Triggered action: ${actionId}. Full forms coming soon!`);
 };

 const actions: MarketingAction[] = [
 {
 id: 'create_coupon',
 title: 'Create Coupon',
 description: 'Generate discount codes for campaigns.',
 icon: 'ticket',
 action: () => handleAction('create_coupon')
 },
 {
 id: 'create_banner',
 title: 'Create Banner',
 description: 'Update the homepage promotional hero.',
 icon: 'image',
 action: () => handleAction('create_banner')
 },
 {
 id: 'send_newsletter',
 title: 'Send Newsletter',
 description: 'Broadcast email to your subscriber list.',
 icon: 'mail',
 action: () => handleAction('send_newsletter')
 },
 {
 id: 'feature_product',
 title: 'Feature Product',
 description: 'Pin a product to the top of its collection.',
 icon: 'package',
 action: () => handleAction('feature_product')
 },
 {
 id: 'feature_collection',
 title: 'Feature Collection',
 description: 'Highlight a collection on the homepage.',
 icon: 'layers',
 action: () => handleAction('feature_collection')
 }
 ];

 const getIconComponent = (iconString: string) => {
 switch (iconString) {
 case 'ticket': return <Ticket className="w-5 h-5 text-emerald-600 " />;
 case 'image': return <Image className="w-5 h-5 text-blue-600 " />;
 case 'mail': return <Mail className="w-5 h-5 text-purple-600 " />;
 case 'package': return <Package className="w-5 h-5 text-amber-600 " />;
 case 'layers': return <Layers className="w-5 h-5 text-pink-600 " />;
 default: return <Zap className="w-5 h-5 text-neutral-600 " />;
 }
 };

 return (
 <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
 <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
 <Zap className="w-5 h-5 text-neutral-500" />
 Quick Actions
 </h3>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
 {actions.map((action) => (
 <button
 key={action.id}
 onClick={action.action}
 className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all text-left group"
 >
 <div className="p-2.5 rounded-lg bg-neutral-100 group-hover:scale-110 transition-transform">
 {getIconComponent(action.icon)}
 </div>
 <div>
 <h4 className="text-sm font-semibold text-neutral-900 mb-0.5">{action.title}</h4>
 <p className="text-xs text-neutral-500 line-clamp-2">{action.description}</p>
 </div>
 </button>
 ))}
 </div>
 </div>
 );
};
