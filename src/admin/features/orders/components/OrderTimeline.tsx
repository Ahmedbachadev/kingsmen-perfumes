import React from 'react';
import type { OrderTimelineEvent } from '../types/order';
import { Clock, CheckCircle2, Package, Truck, XCircle, FileText } from 'lucide-react';

interface Props {
  events?: OrderTimelineEvent[];
}

export const OrderTimeline: React.FC<Props> = ({ events = [] }) => {
  const getIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'processing': return <CheckCircle2 className="w-4 h-4 text-indigo-600" />;
      case 'packed': return <Package className="w-4 h-4 text-purple-600" />;
      case 'shipped': return <Truck className="w-4 h-4 text-green-600" />;
      case 'delivered': return <CheckCircle2 className="w-4 h-4 text-teal-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-neutral-500" />;
    }
  };

  const getBgColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 border-yellow-200';
      case 'processing': return 'bg-indigo-100 border-indigo-200';
      case 'packed': return 'bg-purple-100 border-purple-200';
      case 'shipped': return 'bg-green-100 border-green-200';
      case 'delivered': return 'bg-teal-100 border-teal-200';
      case 'cancelled': return 'bg-red-100 border-red-200';
      default: return 'bg-neutral-100 border-neutral-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
      <h2 className="text-base font-semibold text-neutral-900 mb-6">Timeline</h2>
      
      {events.length === 0 ? (
        <p className="text-sm text-neutral-500 text-center py-4">No events found.</p>
      ) : (
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent">
          {events.map((event, index) => (
            <div key={event.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${getBgColor(event.status)} z-10`}>
                {getIcon(event.status)}
              </div>
              
              {/* Content */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border border-neutral-100 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-neutral-900 text-sm">{event.title}</h3>
                </div>
                {event.description && (
                  <p className="text-sm text-neutral-500 mb-2">{event.description}</p>
                )}
                <time className="text-xs text-neutral-400 font-medium">
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  }).format(new Date(event.created_at))}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
