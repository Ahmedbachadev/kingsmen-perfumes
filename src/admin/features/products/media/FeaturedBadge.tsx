import React from 'react';
import { Star } from 'lucide-react';

export const FeaturedBadge: React.FC = () => {
  return (
    <div className="absolute top-2 left-2 bg-neutral-900 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 shadow-sm z-10 pointer-events-none">
      <Star className="w-3 h-3 fill-current" />
      Featured
    </div>
  );
};
