
import { Location } from "@/types";
import { TripPlace } from "../TripPlace";

/**
 * Generates a unique ID for a new place
 */
export const generatePlaceId = (): string => {
  return `place_${Date.now()}`;
};

/**
 * Loads trip places from localStorage or returns null if not found
 */
export const loadStoredPlaces = (tripId: string): TripPlace[] | null => {
  const storedPlaces = localStorage.getItem(`trip_places_${tripId}`);
  return storedPlaces ? JSON.parse(storedPlaces) : null;
};

/**
 * Saves trip places to localStorage
 */
export const savePlaces = (tripId: string, places: TripPlace[]): void => {
  localStorage.setItem(`trip_places_${tripId}`, JSON.stringify(places));
};

/**
 * Get a random date in the past (for mock data)
 */
export const getRandomPastDate = (maxDaysAgo: number = 5): Date => {
  return new Date(Date.now() - Math.random() * 86400000 * maxDaysAgo);
};
