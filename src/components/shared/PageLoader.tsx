import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] p-8">
      <div className="w-10 h-10 border-4 border-neutral-200 dark:border-neutral-800 border-t-neutral-900 dark:border-t-white rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-neutral-500 animate-pulse">Loading...</p>
    </div>
  );
};
