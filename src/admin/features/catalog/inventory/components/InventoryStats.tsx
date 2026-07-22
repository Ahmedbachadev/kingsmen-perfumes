import React from 'react';
import { Package, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { InventoryStats as InventoryStatsType } from '../services/inventoryService';

interface InventoryStatsProps {
  stats: InventoryStatsType;
  isLoading: boolean;
}

export function InventoryStats({ stats, isLoading }: InventoryStatsProps) {
  const cards = [
    {
      label: 'Total Products',
      value: stats.total,
      icon: Package,
      color: 'text-slate-600',
      iconBg: 'bg-slate-50',
    },
    {
      label: 'In Stock',
      value: stats.inStock,
      icon: CheckCircle,
      color: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
    {
      label: 'Low Stock',
      value: stats.lowStock,
      icon: AlertTriangle,
      color: 'text-amber-600',
      iconBg: 'bg-amber-50',
    },
    {
      label: 'Out of Stock',
      value: stats.outOfStock,
      icon: XCircle,
      color: 'text-rose-600',
      iconBg: 'bg-rose-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">{card.label}</h3>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.iconBg}`}
            >
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
          </div>
          <div>
            {isLoading ? (
              <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse"></div>
            ) : (
              <p className="text-2xl font-semibold tracking-tight text-slate-900">
                {card.value.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
