
import { mockLocations } from "@/mock/locations";

export const updateTrendingLocations = () => {
  // Mock function to update trending locations
  console.log('Updating trending locations...');
  return mockLocations.slice(0, 5);
};
