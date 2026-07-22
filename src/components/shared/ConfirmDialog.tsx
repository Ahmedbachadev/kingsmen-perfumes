import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '../../admin/utils/cn';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false
}) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500';
      case 'primary':
        return 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 focus:ring-neutral-900 dark:focus:ring-white';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'danger': return 'text-red-600 bg-red-100 dark:bg-red-500/10';
      case 'warning': return 'text-amber-600 bg-amber-100 dark:bg-amber-500/10';
      case 'primary': return 'text-blue-600 bg-blue-100 dark:bg-blue-500/10';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div 
        className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity" 
        onClick={!isLoading ? onClose : undefined}
      />
      
      <div 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-6 overflow-hidden border border-neutral-200 dark:border-neutral-800 transform transition-all"
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="sm:flex sm:items-start">
          <div className={`mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${getIconStyles()}`}>
            <AlertTriangle className="h-6 w-6 sm:h-5 sm:w-5" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-lg font-semibold leading-6 text-neutral-900 dark:text-white" id="dialog-title">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 sm:flex sm:flex-row-reverse gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "w-full inline-flex justify-center rounded-lg px-4 py-2.5 sm:py-2 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto transition-colors disabled:opacity-50",
              getVariantStyles()
            )}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : confirmLabel}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="mt-3 inline-flex w-full justify-center rounded-lg bg-white dark:bg-neutral-950 px-4 py-2.5 sm:py-2 text-sm font-semibold text-neutral-900 dark:text-white shadow-sm ring-1 ring-inset ring-neutral-300 dark:ring-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 sm:mt-0 sm:w-auto disabled:opacity-50 transition-colors"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
