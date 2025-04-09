
import { searchQueryHandler } from './searchQueryHandler';
import { venueQueryHandler } from './venueQueryHandler';
import { bookingQueryHandler } from './bookingQueryHandler';

export const processQuery = async (
  query: string,
  isVenueMode: boolean,
  isProPlan: boolean,
  setIsSearching: (isSearching: boolean) => void
) => {
  // Set searching state on
  setIsSearching(true);
  
  // Detect query type
  if (query.toLowerCase().includes('book') || query.toLowerCase().includes('reservation')) {
    return await bookingQueryHandler(query, isProPlan);
  } else if (isVenueMode) {
    return await venueQueryHandler(query, isProPlan);
  } else {
    return await searchQueryHandler(query, isProPlan);
  }
};
