import React from 'react';
import { Construction } from 'lucide-react';

export const EmptyStateCard: React.FC = () => {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-8 md:p-12 flex flex-col items-center justify-center text-center max-w-2xl mx-auto shadow-sm">
      <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
        <Construction className="w-8 h-8 text-neutral-400" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2 tracking-tight">
        Module In Development
      </h3>
      <p className="text-neutral-500 max-w-md">
        This module will be implemented in the next phase. The foundation and architecture are ready.
      </p>
    </div>
  );
};
