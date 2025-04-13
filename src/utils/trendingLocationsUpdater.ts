
import { PalantirAIPService } from '@/services/PalantirAIPService';
import { Location } from '@/types';
import { getTrendingLocationsForCity } from '@/mock/cityLocations';

// Rename the function to match the import in the file
export const updateTrendingLocations = async (cityName: string, events: Location[] | null = null) => {
  // In a real implementation, this would update the global state or database
  console.log(`Updating trending locations for ${cityName}`);
  
  // If events are not provided, get them from the city data
  const locationsToUpdate = events || getTrendingLocationsForCity(cityName);
  
  // Try to get trending locations from Palantir AIP
  try {
    const palantirTrending = await PalantirAIPService.getTrendingLocations(cityName, 3);
    return palantirTrending.length > 0 ? palantirTrending : locationsToUpdate;
  } catch (error) {
    console.error('Error fetching trending locations:', error);
    return locationsToUpdate;
  }
};

