
import { SearchCoordinator } from './search';

/**
 * Handle general search queries and location-based queries
 */
export const handleSearchQuery = async (
  inputValue: string,
  paginationState: Record<string, number>
): Promise<string> => {
  return SearchCoordinator.processSearchQuery(inputValue, paginationState);
};
