
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MapPin, VerifiedIcon, Check, Globe } from "lucide-react";
import { Location } from "@/types";

interface LocationsGridProps {
  locations: Location[];
  locationTags: Record<string, string[]>;
  isRealData?: boolean;
}

const LocationsGrid = ({ locations, locationTags, isRealData = false }: LocationsGridProps) => {
  if (locations.length === 0) {
    return (
      <div className="col-span-full text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No locations found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {locations.map((location) => {
        const isRealLocation = isRealData && location.verified;
        return (
          <Card 
            key={location.id} 
            className={`vibe-card-hover ${isRealLocation ? 'border-green-400' : ''}`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold flex items-center">
                  {location.name}
                  {location.verified && (
                    <VerifiedIcon className="h-4 w-4 ml-1 text-primary" />
                  )}
                  {isRealLocation && (
                    <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-300">
                      <Check className="h-3 w-3 mr-1" /> Real
                    </Badge>
                  )}
                </h3>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Badge variant="outline" className="cursor-help">
                      {location.type}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">More Tags</h4>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="outline" className="bg-primary/10">
                          {location.type}
                        </Badge>
                        {locationTags[location.id]?.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-muted/40">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              
              <div className="text-sm text-muted-foreground mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {location.address}, {location.city}, {location.state}
                </span>
              </div>
              
              {isRealLocation && location.website && (
                <div className="mb-3 text-sm flex items-center">
                  <Globe className="h-4 w-4 mr-1 text-green-600" />
                  <a 
                    href={location.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline truncate"
                  >
                    Official Website
                  </a>
                </div>
              )}
              
              <Button className={`w-full ${isRealLocation ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' : 'bg-gradient-vibe'}`} asChild>
                <Link to={`/venue/${location.id}`}>View Vibes</Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default LocationsGrid;
