
import { mockLocations } from "@/mock/data";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight, VerifiedIcon } from "lucide-react";

const LocationsNearby = () => {
  // In a real app, this would use geolocation to find actually nearby locations
  const nearbyLocations = mockLocations.slice(0, 3);
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          <span>Vibes Nearby</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nearbyLocations.map((location) => (
            <div key={location.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium flex items-center">
                  {location.name}
                  {location.verified && (
                    <VerifiedIcon className="h-3 w-3 ml-1 text-primary" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {location.city}, {location.state}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={`/location/${location.id}`}>
                  View Vibes
                </a>
              </Button>
            </div>
          ))}
        </div>
        <Button 
          variant="link" 
          className="mt-4 p-0 h-auto text-primary flex items-center" 
          asChild
        >
          <a href="/explore">
            <span>Explore all locations</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LocationsNearby;
