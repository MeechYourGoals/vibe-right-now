
import React from 'react';

export const SkeletonVenueHeader: React.FC = () => {
  return (
    <div className="relative">
      <div className="h-48 md:h-64 w-full rounded-lg overflow-hidden bg-gray-200 animate-pulse"></div>
      
      <div className="relative z-10 px-4 py-4 md:py-0 md:-mt-16">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
