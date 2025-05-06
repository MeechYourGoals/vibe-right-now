
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const SkeletonVenueReviews: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-14 mb-1" />
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} className="h-4 w-4 mx-0.5" />
              ))}
            </div>
            <Skeleton className="h-3 w-20 mt-1" />
          </div>
          
          <div className="space-y-1 flex-1 ml-8">
            {[5, 4, 3, 2, 1].map(i => (
              <div key={i} className="flex items-center">
                <div className="w-3">
                  <Skeleton className="h-3 w-3" />
                </div>
                <Skeleton className="h-3 w-3 ml-1 mr-2" />
                <Skeleton className="h-2 flex-1" />
                <Skeleton className="h-3 w-8 ml-2" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="border-t pt-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full mr-2" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Skeleton key={star} className="h-4 w-4 mx-0.5" />
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
