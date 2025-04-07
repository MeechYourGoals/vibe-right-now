
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Location } from "@/types";
import { TripPlace } from "../TripPlace";
import { mockLocations } from "@/mock/locations";

interface UseTripPlacesParams {
  tripId: string | undefined;
  collaborators: Array<{ id: string; name: string; avatar: string }>;
  userColors: Array<{ id: string; color: string }>;
}

export const useTripPlaces = ({ tripId, collaborators, userColors }: UseTripPlacesParams) => {
  const [places, setPlaces] = useState<TripPlace[]>([]);
  const [isAddPlaceDialogOpen, setIsAddPlaceDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  // Fetch trip places data
  useEffect(() => {
    if (!tripId) return;
    
    // Load stored places or generate mock data
    const storedPlaces = localStorage.getItem(`trip_places_${tripId}`);
    if (storedPlaces) {
      setPlaces(JSON.parse(storedPlaces));
    } else {
      // Generate mock data if no stored places
      const mockPlaces: TripPlace[] = collaborators.flatMap((user: any, index: number) => {
        // Each user adds 1-2 random places
        const numPlaces = Math.floor(Math.random() * 2) + 1;
        return Array(numPlaces).fill(0).map((_, i) => {
          const randomLocationIndex = Math.floor(Math.random() * mockLocations.length);
          return {
            id: `place_${user.id}_${i}`,
            place: mockLocations[randomLocationIndex],
            addedBy: {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              colorCode: userColors[index % userColors.length].color
            },
            notes: `Added by ${user.name}`,
            addedAt: new Date(Date.now() - Math.random() * 86400000 * 5) // Random date within last 5 days
          };
        });
      });
      
      setPlaces(mockPlaces);
      localStorage.setItem(`trip_places_${tripId}`, JSON.stringify(mockPlaces));
    }
  }, [tripId, collaborators, userColors]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Simple search from mock locations
    const results = mockLocations.filter(
      location => location.name.toLowerCase().includes(query.toLowerCase()) ||
                  location.city.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results.slice(0, 5)); // Limit to 5 results
  };
  
  const handleAddPlace = (selectedPlace: Location, notes: string) => {
    if (!tripId) return;

    // Get the first user (current user) color
    const userColor = userColors[0].color;
    
    const newPlace: TripPlace = {
      id: `place_${Date.now()}`,
      place: selectedPlace,
      addedBy: {
        id: "1", // Current user ID
        name: collaborators[0].name,
        avatar: collaborators[0].avatar,
        colorCode: userColor
      },
      notes: notes,
      addedAt: new Date()
    };
    
    const updatedPlaces = [...places, newPlace];
    setPlaces(updatedPlaces);
    
    // Save to localStorage
    localStorage.setItem(`trip_places_${tripId}`, JSON.stringify(updatedPlaces));
    
    // Reset form
    setSearchQuery("");
    setSearchResults([]);
    setIsAddPlaceDialogOpen(false);
    
    toast.success("Place added to trip!");
  };

  return {
    places,
    isAddPlaceDialogOpen,
    setIsAddPlaceDialogOpen,
    searchResults,
    handleSearch,
    handleAddPlace
  };
};
