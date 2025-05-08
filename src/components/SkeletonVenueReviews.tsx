
import React from 'react';

export const SkeletonVenueReviews: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
      
      <div className="h-16 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
      
      <div className="h-10 w-full bg-gray-200 rounded animate-pulse mt-6"></div>
    </div>
  );
};
