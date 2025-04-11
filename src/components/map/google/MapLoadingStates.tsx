
import React from 'react';
import { AlertTriangle, Compass } from 'lucide-react';

interface MapLoadingStatesProps {
  loadError: boolean;
  isLoaded: boolean;
}

const MapLoadingStates: React.FC<MapLoadingStatesProps> = ({ loadError, isLoaded }) => {
  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center p-4">
          <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <h3 className="font-semibold text-lg">Unable to load map</h3>
          <p className="text-muted-foreground text-sm">
            There was a problem loading the map. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="animate-spin">
          <Compass className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return null;
};

export default MapLoadingStates;
