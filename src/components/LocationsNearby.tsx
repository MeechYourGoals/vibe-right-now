
import { useEffect, useState, useMemo } from "react";
import { mockLocations } from "@/mock/locations";
import LocationCard from "@/components/LocationCard";
import { Location } from "@/types";
import { useNearbyLocations } from "@/hooks/useNearbyLocations";

export const LocationsNearby = ({ category = "", searchQuery = "" }) => {
  const { 
    nearbyLocations, 
    loading,
    setSearchedCity,
  } = useNearbyLocations();

  // Use a combination of category and search query to filter locations
  const filteredLocations = useMemo(() => {
    // Guard against null or undefined nearbyLocations
    if (!nearbyLocations) {
      return [];
    }
    
    let filtered = [...nearbyLocations];
    
    if (category) {
      filtered = filtered.filter(loc => loc.type.toLowerCase() === category.toLowerCase());
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(loc => 
        loc.name.toLowerCase().includes(query) ||
        loc.city.toLowerCase().includes(query) ||
        loc.type.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [nearbyLocations, category, searchQuery]);

  // Update search query in the hook when it changes in props
  useEffect(() => {
    if (searchQuery) {
      setSearchedCity(searchQuery);
    }
  }, [searchQuery, setSearchedCity]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {filteredLocations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      ) : (
        <p>No locations found.</p>
      )}
    </div>
  );
};
