
import { useState, useEffect } from "react";
import { User, Location } from "@/types";
import { mockLocations } from "@/mock/locations";

export const useUserVenues = (user: User | null) => {
  const [followedVenues, setFollowedVenues] = useState<Location[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<Location[]>([]);
  const [wantToVisitPlaces, setWantToVisitPlaces] = useState<Location[]>([]);
  
  useEffect(() => {
    if (!user) return;
    
    // Get deterministic venues as "followed venues" based on username
    const usernameCharCode = user.username.charCodeAt(0);
    const venueCount = 3 + (usernameCharCode % 5); // 3-7 venues
    
    const filteredLocations = mockLocations.filter(location => !!location.type);
    const followedVenuesList = [];
    
    for (let i = 0; i < venueCount; i++) {
      const index = (usernameCharCode + i * 3) % filteredLocations.length;
      followedVenuesList.push(filteredLocations[index]);
    }
    
    setFollowedVenues(followedVenuesList);
    
    // Get deterministic venues for "visited" and "want to visit" sections
    const visitedCount = 4 + (usernameCharCode % 4); // 4-7 visited places
    const wantToVisitCount = 3 + (usernameCharCode % 5); // 3-7 want to visit places
    
    const visitedList = [];
    const wantToVisitList = [];
    
    for (let i = 0; i < visitedCount; i++) {
      const index = (usernameCharCode + i * 7) % filteredLocations.length;
      visitedList.push(filteredLocations[index]);
    }
    
    for (let i = 0; i < wantToVisitCount; i++) {
      const index = (usernameCharCode + i * 11) % filteredLocations.length;
      // Ensure no duplicates between visited and want to visit
      if (!visitedList.some(loc => loc.id === filteredLocations[index].id)) {
        wantToVisitList.push(filteredLocations[index]);
      }
    }
    
    setVisitedPlaces(visitedList);
    setWantToVisitPlaces(wantToVisitList);
  }, [user]);
  
  return {
    followedVenues,
    visitedPlaces,
    wantToVisitPlaces
  };
};
