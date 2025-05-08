
import React from 'react';

export const SkeletonVenueAssistant: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-3/6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mt-6 mx-auto"></div>
    </div>
  );
};
