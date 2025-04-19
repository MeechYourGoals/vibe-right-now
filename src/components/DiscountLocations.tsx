
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import LocationCard from "./LocationCard";
import { getLocationsByCity } from "@/mock/cityLocations";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

interface DiscountLocationsProps {
  city?: string | null;
}

const DiscountLocations = ({ city }: DiscountLocationsProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let availableLocations: Location[];
      
      if (city) {
        // Get locations for the specified city
        availableLocations = getLocationsByCity(city);
      } else {
        // Use all locations if no city is specified
        availableLocations = mockLocations;
      }
      
      // Filter to locations with discounts (for demo, we're randomly assigning discounts)
      const discountLocations = availableLocations
        .map(location => ({
          ...location,
          discountAmount: Math.floor(Math.random() * 30) + 10
        }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      setLocations(discountLocations);
      setLoading(false);
    }, 1200);
  }, [city]);
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Special Deals</CardTitle>
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
  
  if (locations.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">
          {city ? `Deals in ${city}` : "Special Deals"}
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/explore?category=deals">
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
              vibes={location.vibes || ["Discount", "Value"]}
              discount={location.discountAmount || 15}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscountLocations;
