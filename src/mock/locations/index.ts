
import { Location } from "@/types";
import { restaurantLocations } from "./restaurants";
import { barLocations } from "./bars";
import { eventLocations } from "./events";
import { attractionLocations } from "./attractions";
import { sportsLocations } from "./sports";
import { otherLocations } from "./others";

// Combine all locations for backward compatibility
export const mockLocations: Location[] = [
  ...restaurantLocations,
  ...barLocations,
  ...eventLocations,
  ...attractionLocations,
  ...sportsLocations,
  ...otherLocations
];

// Export everything from the locations module
export {
  restaurantLocations,
  barLocations,
  eventLocations,
  attractionLocations,
  sportsLocations,
  otherLocations
};

