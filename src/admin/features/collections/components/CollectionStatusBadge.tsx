import React from 'react';
import { CheckCircle2, Clock, Archive } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface CollectionStatusBadgeProps {
  status: 'active' | 'draft' | 'archived';
  className?: string;
}

export function CollectionStatusBadge({ status, className }: CollectionStatusBadgeProps) {
  const config = {
    active: {
      label: 'Published',
      icon: CheckCircle2,
      colors: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      iconColor: 'text-emerald-500'
    },
    draft: {
      label: 'Draft',
      icon: Clock,
      colors: 'bg-amber-50 text-amber-700 border-amber-200/60',
      iconColor: 'text-amber-500'
    },
    archived: {
      label: 'Archived',
      icon: Archive,
      colors: 'bg-slate-100 text-slate-700 border-slate-200/60',
      iconColor: 'text-slate-500'
    }
  };

  const { label, icon: Icon, colors, iconColor } = config[status] || config.draft;

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
      colors,
      className
    )}>
      <Icon className={cn('w-3.5 h-3.5', iconColor)} />
      {label}
    </span>
  );
}
