
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import LocationCard from "./LocationCard";
import { getTrendingLocationsForCity } from "@/mock/cityLocations";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

interface TrendingLocationsProps {
  city?: string | null;
}

const TrendingLocations = ({ city }: TrendingLocationsProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let trendingLocations: Location[];
      
      if (city) {
        // Get trending locations for the specified city
        trendingLocations = getTrendingLocationsForCity(city);
        
        // If no locations found for this city, fall back to random locations
        if (trendingLocations.length === 0) {
          trendingLocations = mockLocations
            .filter(loc => loc.trending)
            .slice(0, 3);
        }
      } else {
        // Get random trending locations if no city is specified
        trendingLocations = mockLocations
          .filter(loc => loc.trending)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
      }
      
      setLocations(trendingLocations);
      setLoading(false);
    }, 1000);
  }, [city]);
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trending Right Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-md overflow-hidden">
                <Skeleton className="h-24 w-full" />
                <div className="mt-2 space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">
          {city ? `Trending in ${city}` : "Trending Right Now"}
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/explore?category=trending">
            See All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {locations.map((location) => (
            <LocationCard 
              key={location.id} 
              location={location}
              vibes={location.vibes || ["Trendy", "Busy"]} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingLocations;
