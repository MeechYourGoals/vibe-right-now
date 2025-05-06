
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const SkeletonVenueAssistant: React.FC = () => {
  return (
    <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/50 dark:to-background">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Skeleton className="h-5 w-5 mr-2" />
          <Skeleton className="h-5 w-40" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          
          <div className="space-y-2">
            <Skeleton className="h-3 w-40" />
            <ul className="space-y-1">
              <li className="flex items-center">
                <Skeleton className="h-3 w-3 mr-2" />
                <Skeleton className="h-3 w-32" />
              </li>
              <li className="flex items-center">
                <Skeleton className="h-3 w-3 mr-2" />
                <Skeleton className="h-3 w-28" />
              </li>
              <li className="flex items-center">
                <Skeleton className="h-3 w-3 mr-2" />
                <Skeleton className="h-3 w-36" />
              </li>
            </ul>
          </div>
          
          <Skeleton className="h-9 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};
