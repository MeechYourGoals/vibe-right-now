
import { useState, useCallback } from 'react';
import { mockLocations } from '@/mock/locations';
import { Location } from '@/types';

export const useQueryProcessing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Location[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const processQuery = useCallback(async (query: string, vibes: string[], users: string[]) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredResults = mockLocations;
      
      // Filter by query
      if (query.trim()) {
        filteredResults = filteredResults.filter(location =>
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.description?.toLowerCase().includes(query.toLowerCase()) ||
          location.address.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Filter by vibes (simplified for mock data)
      if (vibes.length > 0) {
        filteredResults = filteredResults.filter(location =>
          location.vibeScore && location.vibeScore > 8
        );
      }
      
      setResults(filteredResults);
      setTotalResults(filteredResults.length);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error processing query:', error);
      setResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  return {
    isLoading,
    results,
    currentPage,
    totalResults,
    processQuery,
    loadMore
  };
};
