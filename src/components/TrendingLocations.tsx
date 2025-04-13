
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationCard from "@/components/LocationCard";
import { Flame } from "lucide-react";
import { Location } from "@/types";
import { mockLocations } from "@/mock/locations";
import { PalantirAIPService } from "@/services/PalantirAIPService";

const TrendingLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingLocations = async () => {
      try {
        // Try to get trending locations from Palantir AIP
        const palantirTrending = await PalantirAIPService.getTrendingLocations(
          sessionStorage.getItem('selectedCity') || undefined,
          3
        );
        
        if (palantirTrending.length > 0) {
          console.log('Using Palantir AIP trending locations');
          setLocations(palantirTrending);
        } else {
          // Fall back to mock trending locations if Palantir AIP fails
          console.log('Falling back to mock trending locations');
          setLocations(mockLocations.slice(5, 8));
        }
      } catch (error) {
        console.error('Error fetching trending locations:', error);
        // Fall back to mock data
        setLocations(mockLocations.slice(5, 8));
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrendingLocations();
  }, []);

  const handleViewVibes = (locationId: string) => {
    window.location.href = `/venue/${locationId}`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Flame className="h-4 w-4 mr-2 text-orange-500" />
            Loading Trending Vibes...
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 px-3 py-2 grid grid-cols-1 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[120px] bg-muted/50 rounded-md animate-pulse"></div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Flame className="h-4 w-4 mr-2 text-orange-500" />
          Trending Vibes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 px-3 py-2 grid grid-cols-1 gap-2">
        {locations.map((location) => (
          <LocationCard 
            key={location.id} 
            location={location} 
            onViewVibes={handleViewVibes} 
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingLocations;
