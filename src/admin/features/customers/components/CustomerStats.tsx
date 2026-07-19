import React from 'react';
import { Users, UserPlus, UserCheck, Mail } from 'lucide-react';
import type { CustomerStats as StatsType } from '../types/customer';

interface Props {
  stats: StatsType;
  loading: boolean;
}

export const CustomerStats: React.FC<Props> = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'New Customers (30d)',
      value: stats.newCustomers,
      icon: UserPlus,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Returning Customers',
      value: stats.returningCustomers,
      icon: UserCheck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.newsletterSubscribers,
      icon: Mail,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-neutral-200 animate-pulse">
            <div className="h-10 w-10 bg-neutral-100 rounded-lg mb-4"></div>
            <div className="h-4 bg-neutral-100 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-neutral-100 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bgColor} ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm font-medium text-neutral-500 mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold text-neutral-900">
              {card.value.toLocaleString()}
            </h3>
          </div>
        );
      })}
    </div>
  );
};
