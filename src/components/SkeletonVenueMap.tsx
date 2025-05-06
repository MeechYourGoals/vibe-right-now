
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonVenueMap: React.FC = () => {
  return (
    <div className="mt-4 rounded-md overflow-hidden">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-1" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="text-right">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      
      <Skeleton className="h-48 w-full rounded-md" />
    </div>
  );
};
