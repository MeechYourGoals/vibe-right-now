
import React from 'react';

export const SkeletonVenueAbout: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
      
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
        
        <div className="flex flex-col space-y-3 mt-4">
          <div className="flex items-start">
            <div className="h-5 w-5 bg-gray-200 rounded mr-2 shrink-0"></div>
            <div className="h-5 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-200 rounded mr-2 shrink-0"></div>
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-200 rounded mr-2 shrink-0"></div>
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gray-200 rounded mr-2 shrink-0"></div>
            <div className="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
