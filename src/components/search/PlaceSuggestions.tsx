
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Star, MapPin } from "lucide-react";
import { Location } from "@/types";

interface PlaceSuggestionsProps {
  showSuggestions: boolean;
  premiumPlaces: Array<Location & { isPremium?: boolean }>;
  onPlaceSelect: (placeName: string) => void;
}

const PlaceSuggestions: React.FC<PlaceSuggestionsProps> = ({
  showSuggestions,
  premiumPlaces,
  onPlaceSelect,
}) => {
  return (
    <Collapsible open={showSuggestions} className="w-full">
      <CollapsibleContent className="overflow-hidden">
        <Card className="mt-1 w-full p-2 shadow-md border border-border">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground px-2 py-1 flex items-center">
              Featured Venues <Star className="h-3 w-3 text-amber-500 ml-1 fill-amber-500" />
            </p>
            {premiumPlaces.map((place) => (
              <div 
                key={place.id} 
                className={`flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer my-1 ${place.isPremium ? 'bg-amber-500/10 border border-amber-500/30' : ''}`}
                onClick={() => onPlaceSelect(place.name)}
              >
                <div className={`h-8 w-8 flex items-center justify-center rounded-md ${place.isPremium ? 'bg-amber-500/20' : 'bg-primary/10'}`}>
                  <MapPin className={`h-4 w-4 ${place.isPremium ? 'text-amber-500' : 'text-primary'}`} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-medium flex items-center">
                    {place.name}
                    {place.isPremium && <Star className="h-3 w-3 text-amber-500 ml-1 fill-amber-500" />}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {place.city}, {place.state}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PlaceSuggestions;
