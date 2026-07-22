import React from 'react';
import { Package, Clock, RefreshCw, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import type { OrderStats } from '../services/orderService';
import { formatCurrency } from '../../../../../utils/format';

interface OrderSummaryProps {
  stats: OrderStats;
  isLoading: boolean;
}

export function OrderSummary({ stats, isLoading }: OrderSummaryProps) {
  const cards = [
    {
      title: 'Total Orders',
      value: stats.total,
      icon: Package,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Processing',
      value: stats.processing,
      icon: RefreshCw,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Cancelled',
      value: stats.cancelled,
      icon: XCircle,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Today Revenue',
      value: formatCurrency(stats.todayRevenue),
      icon: DollarSign,
      color: 'bg-green-50 text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex flex-col items-center text-center justify-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${card.color}`}>
            <card.icon className="w-5 h-5" />
          </div>
          <h3 className="text-slate-500 text-xs font-medium mb-1 uppercase tracking-wider">{card.title}</h3>
          <div className="text-xl font-bold text-slate-900">
            {isLoading ? (
              <div className="h-7 w-16 bg-slate-200 animate-pulse rounded"></div>
            ) : (
              card.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
