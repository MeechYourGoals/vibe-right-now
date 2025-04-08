
import { TripPlace } from "../TripPlace";
import { mockLocations } from "@/mock/locations";
import { getRandomPastDate } from "./tripPlacesUtils";

/**
 * Generates mock place data for a trip
 */
export const generateMockPlacesForTrip = (
  tripId: string,
  collaborators: Array<{ id: string; name: string; avatar: string }>,
  userColors: Array<{ id: string; color: string }>
): TripPlace[] => {
  // Ensure we have at least one collaborator and userColor
  if (!collaborators || collaborators.length === 0 || !userColors || userColors.length === 0) {
    console.error("Missing collaborators or userColors");
    return [];
  }

  // Number of mock places to generate
  const numPlaces = Number(tripId) % 2 === 0 ? 3 : 2;
  
  // Get a subset of mock locations for this trip
  const tripLocations = mockLocations.slice(0, numPlaces);
  
  return tripLocations.map((location, index) => {
    // Determine which collaborator added this place
    const collaboratorIndex = index % collaborators.length;
    const collaborator = collaborators[collaboratorIndex];
    
    // Determine user color (safely)
    const colorIndex = collaboratorIndex % userColors.length;
    const userColor = userColors[colorIndex]?.color || "#3b82f6"; // Default to blue if color not found
    
    return {
      id: `place_${tripId}_${index}`,
      place: location,
      addedBy: {
        id: collaborator?.id || "1",
        name: collaborator?.name || "User",
        avatar: collaborator?.avatar || "",
        colorCode: userColor
      },
      notes: index === 0 
        ? "This place has amazing views! We should definitely visit in the morning."
        : index === 1
          ? "I heard they have the best local cuisine here."
          : "Good spot for photos!",
      addedAt: getRandomPastDate()
    };
  });
};
