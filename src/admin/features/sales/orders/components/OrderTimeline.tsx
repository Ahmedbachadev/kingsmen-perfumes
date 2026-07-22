import React from 'react';
import { Clock, CheckCircle, Package, Truck, Info, XCircle, CreditCard, User } from 'lucide-react';
import type { OrderTimeline as OrderTimelineType } from '../services/orderService';
import { formatDate } from '../../../../../utils/format';
import { cn } from '../../../../utils/cn';

interface OrderTimelineProps {
  timeline: OrderTimelineType[];
}

export function OrderTimeline({ timeline }: OrderTimelineProps) {
  const getIconForStatus = (type: string, value: string) => {
    if (type === 'note') return <Info className="w-4 h-4 text-slate-500" />;
    
    if (type === 'payment_status') {
      if (value === 'paid') return <CreditCard className="w-4 h-4 text-emerald-500" />;
      if (value === 'failed') return <XCircle className="w-4 h-4 text-red-500" />;
      return <CreditCard className="w-4 h-4 text-slate-500" />;
    }

    switch (value) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'processing': return <Package className="w-4 h-4 text-indigo-500" />;
      case 'packed': return <Package className="w-4 h-4 text-purple-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-cyan-500" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getBgForStatus = (type: string, value: string) => {
    if (type === 'note') return 'bg-slate-100 border-slate-200';
    if (type === 'payment_status') {
      if (value === 'paid') return 'bg-emerald-100 border-emerald-200';
      if (value === 'failed') return 'bg-red-100 border-red-200';
      return 'bg-slate-100 border-slate-200';
    }

    switch (value) {
      case 'pending': return 'bg-yellow-100 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 border-blue-200';
      case 'processing': return 'bg-indigo-100 border-indigo-200';
      case 'packed': return 'bg-purple-100 border-purple-200';
      case 'shipped': return 'bg-cyan-100 border-cyan-200';
      case 'delivered': return 'bg-emerald-100 border-emerald-200';
      case 'cancelled': return 'bg-red-100 border-red-200';
      default: return 'bg-slate-100 border-slate-200';
    }
  };

  if (!timeline || timeline.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-8 text-center text-slate-500">
        No timeline events found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
      <h3 className="font-semibold text-slate-900 mb-6 flex items-center gap-2">
        <Clock className="w-4 h-4 text-slate-500" />
        Order Timeline
      </h3>

      <div className="relative border-l border-slate-200 ml-3 space-y-6">
        {timeline.map((event, index) => (
          <div key={event.id} className="relative pl-6">
            <span 
              className={cn(
                'absolute -left-3.5 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border ring-4 ring-white',
                getBgForStatus(event.status_type, event.status_value)
              )}
            >
              {getIconForStatus(event.status_type, event.status_value)}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
              <h4 className="text-sm font-medium text-slate-900 capitalize">
                {event.status_type.replace('_', ' ')}: {event.status_value}
              </h4>
              <time className="text-xs text-slate-500 whitespace-nowrap">
                {formatDate(event.created_at)}
              </time>
            </div>
            {event.note && (
              <p className="text-sm text-slate-600 mt-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                {event.note}
              </p>
            )}
            {event.created_by && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                <User className="w-3 h-3" />
                Updated by staff
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
