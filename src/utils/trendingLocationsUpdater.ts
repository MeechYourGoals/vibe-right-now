
import { Location } from "@/types";
import { eventBus, updateTrendingLocations } from "@/components/TrendingLocations";

// Function to update trending locations from external components
export const updateTrendingLocationsFromVernon = (cityName: string, events: Location[]) => {
  updateTrendingLocations(cityName, events);
};

// Export event bus for components that need to listen for updates
export const locationEventBus = eventBus;
