
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { MapPin, VerifiedIcon, Check, Globe, Star } from "lucide-react";
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

  // Group locations into real (verified) and mock
  const realLocations = locations.filter(loc => isRealData && loc.verified);
  const mockLocations = locations.filter(loc => !(isRealData && loc.verified));

  return (
    <div className="space-y-6">
      {realLocations.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-300">
              <Check className="h-3 w-3 mr-1" /> Real Data
            </Badge>
            Verified Places
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {realLocations.map((location) => (
              <LocationCard 
                key={location.id} 
                location={location}
                locationTags={locationTags}
                isRealLocation={true}
              />
            ))}
          </div>
        </div>
      )}

      {mockLocations.length > 0 && (
        <div className={realLocations.length > 0 ? "mt-8" : ""}>
          {realLocations.length > 0 && (
            <h3 className="text-lg font-medium mb-3">
              Other Suggested Places
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockLocations.map((location) => (
              <LocationCard 
                key={location.id} 
                location={location}
                locationTags={locationTags}
                isRealLocation={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface LocationCardProps {
  location: Location;
  locationTags: Record<string, string[]>;
  isRealLocation: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, locationTags, isRealLocation }) => {
  return (
    <Card 
      className={`vibe-card-hover ${isRealLocation ? 'border-green-400 shadow-sm' : ''}`}
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
        
        {location.rating && (
          <div className="mb-3 flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(location.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">
              {location.rating.toFixed(1)}
            </span>
          </div>
        )}
        
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
        
        <Button 
          className={`w-full mt-2 ${isRealLocation ? 
            'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' : 
            'bg-gradient-vibe'}`} 
          asChild
        >
          <Link to={`/venue/${location.id}`}>View Vibes</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocationsGrid;
