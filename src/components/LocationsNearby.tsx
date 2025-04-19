
import { Location } from "@/types";
import LocationCard from "./LocationCard";
import { mockLocations } from "@/mock/locations";
import { useState, useEffect } from "react";
import { cityCoordinates } from "@/utils/locations";
import { getLocationsByCity, getNearbyLocations } from "@/mock/cityLocations";
import { Skeleton } from "./ui/skeleton";

interface LocationsNearbyProps {
  category?: string;
  searchQuery?: string;
}

export const LocationsNearby: React.FC<LocationsNearbyProps> = ({ 
  category = "all",
  searchQuery = "" 
}) => {
  const [loading, setLoading] = useState(true);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let locations: Location[] = [];
      
      // Check if searchQuery matches a city name
      if (searchQuery) {
        // Convert both to lowercase for case-insensitive comparison
        const cityKey = Object.keys(cityCoordinates).find(key => 
          cityCoordinates[key].name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        if (cityKey) {
          // If the search query is a city, get locations from that city
          const cityName = cityCoordinates[cityKey].name;
          locations = getLocationsByCity(cityName);
          console.log(`Found ${locations.length} locations in ${cityName}`);
        } else {
          // If it's not a city, filter locations by name or description
          locations = mockLocations.filter(location => 
            location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (location.description && location.description.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        }
      } else {
        // If no search query, show all locations
        locations = mockLocations;
      }
      
      // Apply category filter
      if (category !== "all" && category !== "events") {
        locations = locations.filter(location => 
          location.type?.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Add some random vibes to each location for display
      const vibeOptions = [
        "Cozy", "Lively", "Romantic", "Energetic", "Chill", 
        "Upscale", "Casual", "Friendly", "Intimate", "Crowded"
      ];
      
      locations = locations.map(location => ({
        ...location,
        vibes: location.vibes || Array(Math.floor(Math.random() * 3) + 1)
          .fill(0)
          .map(() => vibeOptions[Math.floor(Math.random() * vibeOptions.length)])
      }));
      
      setFilteredLocations(locations);
      setLoading(false);
    }, 1000);
  }, [category, searchQuery]);

  const renderSkeletons = () => {
    return Array(4).fill(0).map((_, index) => (
      <div key={`skeleton-${index}`} className="rounded-md overflow-hidden">
        <Skeleton className="h-40 w-full" />
        <div className="space-y-2 mt-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-8 w-full mt-2" />
        </div>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSkeletons()}
      </div>
    );
  }

  if (filteredLocations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No locations found for "{searchQuery}" in {category !== "all" ? category : "any category"}</p>
        <p className="text-sm text-muted-foreground mt-2">Try another search term or browse popular places below</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredLocations.map((location: Location) => (
        <LocationCard 
          key={location.id} 
          location={location} 
          vibes={location.vibes}
          featured={Math.random() > 0.8} // Randomly mark some locations as featured
          discount={Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 10 : undefined} // Random discount for some locations
        />
      ))}
    </div>
  );
};
