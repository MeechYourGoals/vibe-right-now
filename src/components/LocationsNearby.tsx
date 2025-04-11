
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Location } from '@/types';
import { mockLocations } from '@/mock/data';
import { getNearbyLocations } from '@/mock/cityLocations';

const LocationsNearby = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>(mockLocations.slice(0, 4));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          
          // Get nearby locations based on user position
          const locations = getNearbyLocations(
            position.coords.latitude,
            position.coords.longitude,
            4
          );
          
          setNearbyLocations(locations);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          <span>Near You</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {nearbyLocations.map((location) => (
            <div key={location.id} className="p-3 border rounded-lg hover:bg-accent/10 transition-colors">
              <div className="font-medium">{location.name}</div>
              <div className="text-sm text-muted-foreground flex justify-between items-center">
                <span>{location.type} • {location.address}</span>
                <Button variant="ghost" size="sm" className="h-7 px-2" asChild>
                  <a href={`/venue/${location.id}`}>View</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationsNearby;
