
import { processVenueQuery } from '../venueQueryProcessor';

/**
 * Handle venue-specific queries with Gemini
 */
export const handleVenueQuery = async (
  inputValue: string, 
  isProPlan: boolean
): Promise<string> => {
  console.log('Processing venue query with Gemini:', inputValue);
  return await processVenueQuery(inputValue, isProPlan);
};
