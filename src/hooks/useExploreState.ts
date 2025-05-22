import { useState, useEffect } from 'react';
import { mockLocations } from '@/mock/data';
import { Location } from '@/types';

const useExploreState = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Simulate fetching locations (replace with actual API call)
    setTimeout(() => {
      try {
        setLocations(mockLocations);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch locations');
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, []);

  const applyFilters = (locations: Location[]): Location[] => {
    let filteredLocations = [...locations];

    // Search term filtering
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredLocations = filteredLocations.filter(location =>
        location.name.toLowerCase().includes(term) ||
        location.city.toLowerCase().includes(term) ||
        location.address.toLowerCase().includes(term)
      );
    }
    
    // Category filtering
    if (selectedCategory !== 'all') {
      filteredLocations = filteredLocations.filter(location => {
        // Check if location has categories property and it contains our category
        if (location.categories) {
          return location.categories.includes(selectedCategory);
        }
        // Fallback to type
        return location.type.toLowerCase().includes(selectedCategory.toLowerCase());
      });
    }

    return filteredLocations;
  };

  const applySorting = (locations: Location[]): Location[] => {
    let sortedLocations = [...locations];

    switch (sortBy) {
      case 'name':
        sortedLocations.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        sortedLocations.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'checkins':
        sortedLocations.sort((a, b) => (b.checkins || 0) - (a.checkins || 0));
        break;
      default:
        // For relevance, we'll just return the locations as is
        break;
    }

    return sortedLocations;
  };

  const filteredAndSortedLocations = applySorting(applyFilters(locations));

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortByChange = (sortByOption: string) => {
    setSortBy(sortByOption);
  };

  return {
    locations: filteredAndSortedLocations,
    searchTerm,
    selectedCategory,
    sortBy,
    isLoading,
    error,
    handleSearch,
    handleCategoryChange,
    handleSortByChange
  };
};

export default useExploreState;
