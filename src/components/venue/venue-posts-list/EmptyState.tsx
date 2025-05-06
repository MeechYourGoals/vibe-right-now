
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
  venueName: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ venueName }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-primary/10 p-6 mb-4">
        <PlusCircle className="h-12 w-12 text-primary/70" />
      </div>
      <h3 className="text-xl font-medium mb-2">No posts yet</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Be the first to share your experience at {venueName}!
      </p>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Post
      </Button>
    </div>
  );
};

export default EmptyState;
