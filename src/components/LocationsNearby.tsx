
import { Location } from "@/types";
import LocationCard from "./LocationCard";
import { mockLocations } from "@/mock/locations";

interface LocationsNearbyProps {
  category?: string;
  searchQuery?: string;
}

export const LocationsNearby: React.FC<LocationsNearbyProps> = ({ 
  category = "all",
  searchQuery = "" 
}) => {
  const filteredLocations = mockLocations.filter(location => {
    if (category === "all") return true;
    return location.type?.toLowerCase() === category.toLowerCase();
  }).filter(location => {
    if (!searchQuery) return true;
    return location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           location.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (filteredLocations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No locations found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredLocations.map((location: Location) => (
        <LocationCard key={location.id} location={location} />
      ))}
    </div>
  );
};
