import React from 'react';
import { cn } from '../../admin/utils/cn';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 md:p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/20",
      className
    )}>
      <div className="w-16 h-16 bg-white dark:bg-neutral-900 shadow-sm rounded-2xl flex items-center justify-center text-neutral-400 mb-6 border border-neutral-100 dark:border-neutral-800">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-6">{description}</p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="flex items-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
        >
          {action.icon}
          {action.label}
        </button>
      )}
    </div>
  );
};
