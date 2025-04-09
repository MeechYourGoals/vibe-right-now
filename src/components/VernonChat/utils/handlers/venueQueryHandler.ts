
import { processVenueQuery } from '../venueQueryProcessor';

/**
 * Handle venue-specific queries
 */
export const handleVenueQuery = async (
  inputValue: string, 
  isProPlan: boolean
): Promise<string> => {
  return await processVenueQuery(inputValue, isProPlan);
};
