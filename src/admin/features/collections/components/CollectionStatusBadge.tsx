import React from 'react';
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
