
import React from 'react';
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyTripStateProps {
  onCreateTrip: () => void;
}

export const EmptyTripState: React.FC<EmptyTripStateProps> = ({ onCreateTrip }) => {
  return (
    <div className="text-center py-12 border border-dashed rounded-lg">
      <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No trips planned yet</h3>
      <p className="text-muted-foreground mb-4">Create your first trip and start saving places to visit!</p>
      <Button 
        variant="outline" 
        onClick={onCreateTrip}
        className="mt-2"
      >
        Create Trip
      </Button>
    </div>
  );
};
