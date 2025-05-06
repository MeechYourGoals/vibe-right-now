
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const SkeletonVenueAbout: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mt-0.5 mr-2" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mt-0.5 mr-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mt-0.5 mr-2" />
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="flex items-start">
              <Skeleton className="h-4 w-4 mt-0.5 mr-2" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <div className="flex flex-wrap gap-1">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
