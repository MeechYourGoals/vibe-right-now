
import { useState, useEffect, useMemo } from 'react';
import { mockLocations } from '@/mock/data';
import { Location } from '@/types';

// Create a new hook for explore state
export const useExploreState = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Add additional state properties needed by Explore.tsx
  const [activeTab, setActiveTab] = useState('all');
  const [searchedCity, setSearchedCity] = useState('');
  const [searchedState, setSearchedState] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [locationTags, setLocationTags] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading data from an API
    const loadLocations = async () => {
      try {
        setIsLoading(true);
        // Use a timeout to simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Add missing lat/lng fields if needed
        const locationsWithCoords = mockLocations.map(location => {
          if (!location.lat || !location.lng) {
            return {
              ...location,
              lat: Math.random() * 180 - 90, // Generate random lat
              lng: Math.random() * 360 - 180, // Generate random lng
              // Ensure location has type property with a valid value
              type: location.type || "restaurant"
            };
          }
          return location;
        });
        
        setLocations(locationsWithCoords);
        setError('');
      } catch (err) {
        setError('Failed to load locations');
        console.error('Error loading locations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, []);

  // Filtering logic
  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      // Filter by category
      if (selectedCategory !== 'all' && location.type !== selectedCategory) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          location.name.toLowerCase().includes(term) ||
          location.city.toLowerCase().includes(term) ||
          (location.address && location.address.toLowerCase().includes(term))
        );
      }
      
      return true;
    });
  }, [locations, selectedCategory, searchTerm]);

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle sorting
  const handleSortByChange = (sortByOption: string) => {
    setSortBy(sortByOption);
  };

  return {
    locations,
    searchTerm,
    selectedCategory,
    sortBy,
    isLoading,
    error,
    handleSearch,
    handleCategoryChange,
    handleSortByChange,
    // Add the missing properties needed by Explore.tsx
    activeTab,
    searchedCity,
    searchedState,
    searchCategory,
    filteredLocations,
    locationTags,
    setActiveTab,
    setSearchedCity,
    setSearchedState,
    setSearchCategory,
    setLocationTags
  };
};

export default useExploreState;
