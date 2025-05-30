
import { updateTrendingLocations as updateTrendingLocationsComponent } from '@/components/TrendingLocations';
import { Location } from '@/types';
import { getTrendingLocationsForCity } from '@/mock/cityLocations';

// Function to update trending locations based on AI query results
export const updateTrendingLocations = (cityName: string, events: Location[] | null = null) => {
  // In a real implementation, this would update the global state or database
  console.log(`Updating trending locations for ${cityName}`);
  
  // If events are not provided, get them from the city data
  const locationsToUpdate = events || getTrendingLocationsForCity(cityName);
  
  // Call the function exported from TrendingLocations component
  updateTrendingLocationsComponent(cityName, locationsToUpdate);
};
