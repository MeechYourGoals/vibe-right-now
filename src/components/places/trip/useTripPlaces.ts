
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Location } from "@/types";
import { TripPlace } from "../TripPlace";
import { loadStoredPlaces, savePlaces } from './tripPlacesUtils';
import { generateMockPlacesForTrip } from './tripPlacesMockData';
import { searchLocations } from './tripPlacesSearch';

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
    const storedPlaces = loadStoredPlaces(tripId);
    if (storedPlaces) {
      setPlaces(storedPlaces);
    } else {
      // Generate mock places based on trip ID
      const mockPlaces = generateMockPlacesForTrip(tripId, collaborators, userColors);
      
      setPlaces(mockPlaces);
      savePlaces(tripId, mockPlaces);
    }
  }, [tripId, collaborators, userColors]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchLocations(query);
    setSearchResults(results);
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
    savePlaces(tripId, updatedPlaces);
    
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
