
import React from 'react';
import { Grid } from "lucide-react";

interface EmptyStateProps {
  venueName: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ venueName }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Grid className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
      <p className="text-muted-foreground">
        Be the first to share what's happening at {venueName}!
      </p>
    </div>
  );
};

export default EmptyState;
