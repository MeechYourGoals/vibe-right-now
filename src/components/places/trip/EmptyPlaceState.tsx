
import React from 'react';
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyPlaceStateProps {
  onAddPlace: () => void;
}

export const EmptyPlaceState: React.FC<EmptyPlaceStateProps> = ({ onAddPlace }) => {
  return (
    <div className="text-center py-12 border border-dashed rounded-lg">
      <MapPin className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No places added yet</h3>
      <p className="text-muted-foreground mb-4">Start adding places to visit during your trip!</p>
      <Button 
        variant="outline" 
        onClick={onAddPlace}
        className="mt-2"
      >
        Add Place
      </Button>
    </div>
  );
};
