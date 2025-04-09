
import { handleSearchQuery as searchQueryHandler } from './searchQueryHandler';
import { handleVenueQuery as venueQueryHandler } from './venueQueryHandler';
import { handleBookingQuery as bookingQueryHandler } from './bookingQueryHandler';

export {
  searchQueryHandler,
  venueQueryHandler,
  bookingQueryHandler
};

export const processQuery = async (
  query: string,
  isVenueMode: boolean,
  isProPlan: boolean,
  setIsSearching: (isSearching: boolean) => void
) => {
  try {
    // Detect query type based on content
    if (query.toLowerCase().includes('book') || query.toLowerCase().includes('reservation')) {
      return await bookingQueryHandler(query, isProPlan);
    } else if (isVenueMode) {
      return await venueQueryHandler(query, isProPlan);
    } else {
      return await searchQueryHandler(query, isProPlan);
    }
  } catch (error) {
    console.error('Error processing query:', error);
    return { 
      responseText: "I'm sorry, I encountered an error processing your request.", 
      paginationData: null 
    };
  }
};
