import React from 'react';
import { Package, CheckCircle2, AlertTriangle, Star } from 'lucide-react';
import type { ProductStats as ProductStatsType } from '../types/product';

interface ProductStatsProps {
  stats: ProductStatsType | null;
  loading: boolean;
}

export const ProductStats: React.FC<ProductStatsProps> = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Products',
      value: stats?.total ?? 0,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      title: 'Active Products',
      value: stats?.active ?? 0,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100'
    },
    {
      title: 'Out of Stock',
      value: stats?.outOfStock ?? 0,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      title: 'Featured',
      value: stats?.featured ?? 0,
      icon: Star,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500 mb-1">{card.title}</p>
                {loading ? (
                  <div className="h-8 w-16 bg-neutral-200 animate-pulse rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-neutral-900">{card.value}</p>
                )}
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${card.bgColor} ${card.borderColor} ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
