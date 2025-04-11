
import React from 'react';
import { AlertTriangle, Compass, Sparkles } from 'lucide-react';

interface MapLoadingStatesProps {
  loadError: boolean;
  isLoaded: boolean;
  isProcessingNLP?: boolean;
}

const MapLoadingStates: React.FC<MapLoadingStatesProps> = ({ loadError, isLoaded, isProcessingNLP }) => {
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

  if (isProcessingNLP) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center p-4">
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="h-6 w-6 text-primary mr-2" />
            <div className="animate-spin">
              <Compass className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="font-semibold text-lg">Analyzing with Natural Language API</h3>
          <p className="text-muted-foreground text-sm">
            Processing your query to find the best locations...
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
