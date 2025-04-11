
import React from 'react';
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MapLoadingStatesProps {
  loadError: boolean;
  isLoaded: boolean;
  onReload?: () => void;
}

export const MapLoadingStates: React.FC<MapLoadingStatesProps> = ({ 
  loadError, 
  isLoaded,
  onReload = () => window.location.reload()
}) => {
  if (loadError) {
    toast.error("Error loading maps");
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <p>Error loading Google Maps</p>
          <Button 
            variant="outline" 
            onClick={onReload}
            className="mt-2"
          >
            Reload
          </Button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20">
        <div className="animate-spin">
          <Compass className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    );
  }
  
  return null;
};

export default MapLoadingStates;
