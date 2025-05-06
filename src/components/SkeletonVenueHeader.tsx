
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonVenueHeader: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
      
      <div className="flex space-x-2 mt-2">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-5 w-16" />
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4 h-64">
        <Skeleton className="col-span-2 h-full" />
        <div className="grid grid-rows-2 gap-2 h-full">
          <Skeleton className="h-full" />
          <Skeleton className="h-full" />
        </div>
      </div>
    </div>
  );
};
