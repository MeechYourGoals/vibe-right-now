
import { Location } from "@/types";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";

// Function to get random items from an array
export const getRandomItems = <T>(items: T[], count: number): T[] => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Add any other utility functions from the original file here
export const getCitySpecificContent = (location: Location) => {
  return `Experience the unique atmosphere of ${location.name} in ${location.city}`;
};

export const getMediaForLocationMock = (location: Location) => {
  // Use our central media utility for consistency
  return getMediaForLocation(location);
};

export const getAdditionalTags = (location: Location) => {
  const commonTags = ['Trendy', 'Popular', 'Local Favorite', 'Hidden Gem'];
  
  const typeTags: Record<string, string[]> = {
    restaurant: ['Romantic', 'Outdoor Seating', 'Great View', 'Family Friendly'],
    bar: ['Happy Hour', 'Craft Beer', 'Cocktails', 'Live Music', 'Sports Bar'],
    event: ['Live Music', 'Festival', 'Exhibition', 'Conference', 'Workshop'],
    attraction: ['Historic', 'Family Friendly', 'Guided Tours', 'Scenic'],
    sports: ['Stadium', 'Arena', 'Field', 'Court', 'Family Friendly']
  };
  
  const typeSpecificTags = typeTags[location.type] || [];
  return getRandomItems([...commonTags, ...typeSpecificTags], 3);
};
