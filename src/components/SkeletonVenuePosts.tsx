
import React from 'react';

export const SkeletonVenuePosts: React.FC = () => {
  return (
    <div className="space-y-6">
      {[1, 2].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse mr-3"></div>
            <div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-1"></div>
            </div>
          </div>
          
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-3"></div>
          
          <div className="mb-3 rounded-md overflow-hidden">
            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
          </div>
          
          <div className="flex items-center">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse mr-4"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
