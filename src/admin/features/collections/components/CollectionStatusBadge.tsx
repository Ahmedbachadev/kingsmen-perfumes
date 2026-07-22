import React from 'react';
<<<<<<< HEAD
import type { CollectionStatus } from '../types/collection';

export const CollectionStatusBadge: React.FC<{ status: CollectionStatus }> = ({ status }) => {
  switch (status) {
    case 'published':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Published
        </span>
      );
    case 'draft':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Draft
        </span>
      );
    case 'archived':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Archived
        </span>
      );
    default:
      return null;
  }
};
=======
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
>>>>>>> 3fef0dc (production ready version with admin panel)
