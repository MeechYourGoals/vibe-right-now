
import React from 'react';

export const SkeletonVenueMap: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div className="aspect-square w-full bg-gray-200 rounded-md animate-pulse"></div>
      
      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-2"></div>
    </div>
  );
};
