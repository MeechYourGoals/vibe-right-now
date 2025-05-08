
import { Location } from "@/types";

// List of predefined vibes for the explore search functionality
const vibeOptions = [
  "Chill", "Energetic", "Cozy", "Trendy", "Romantic", "Family-friendly", 
  "Casual", "Upscale", "Nightowl", "Foodie", "Social", "Quiet", 
  "Artsy", "Outdoorsy", "Historic", "Modern", "Local"
];

// Generate random vibes for a location
export const generateRandomVibes = (count: number = 3): string[] => {
  // Shuffle vibes and pick a random number of them
  return vibeOptions
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(count, vibeOptions.length));
};

// Check if location matches vibe
export const locationMatchesVibe = (location: Location, vibe: string): boolean => {
  if (!location.vibes) return false;
  
  return location.vibes.some(v => 
    v.toLowerCase() === vibe.toLowerCase()
  );
};

// Get all available vibes for filtering
export const getAllVibes = (): string[] => {
  return [...vibeOptions];
};

// Get recommended vibes based on user preferences
export const getRecommendedVibes = (userPreferences?: string[]): string[] => {
  if (userPreferences && userPreferences.length > 0) {
    // Return user preferences + some random ones to make it up to 5
    const additionalVibes = vibeOptions
      .filter(vibe => !userPreferences.includes(vibe))
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.max(0, 5 - userPreferences.length));
    
    return [...userPreferences, ...additionalVibes];
  }
  
  // Return random vibes if no user preferences
  return vibeOptions
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
};
