
import { processVenueQuery } from '../venueQueryProcessor';

/**
 * Handle venue-specific queries
 */
export const handleVenueQuery = async (
  inputValue: string, 
  isProPlan: boolean
): Promise<{ responseText: string, paginationData: any | null }> => {
  const responseText = await processVenueQuery(inputValue, isProPlan);
  return { responseText, paginationData: null };
};
