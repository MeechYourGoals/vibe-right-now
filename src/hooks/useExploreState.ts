
import { useState, useEffect } from 'react';
import { Location, EventItem } from '@/types';
import { toast } from 'sonner';

interface UseExploreStateProps {
  initialLocations?: Location[];
  initialEvents?: EventItem[];
  isEventMode?: boolean;
}

const useExploreState = ({ 
  initialLocations = [], 
  initialEvents = [], 
  isEventMode = false 
}: UseExploreStateProps = {}) => {
  const [locations, setLocations] = useState<Location[]>(initialLocations);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<{start: Date | null, end: Date | null}>({
    start: null,
    end: null
  });
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  
  // Generic function to handle errors
  const handleError = (error: any) => {
    const errorMessage = error?.message || 'An error occurred while fetching data.';
    setError(errorMessage);
    toast.error(errorMessage);
    console.error('Explore error:', error);
    setIsLoading(false);
  };
  
  // Function to search locations
  const searchLocations = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just filter existing locations
      const filteredLocations = initialLocations.filter(location => 
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        (location.city && location.city.toLowerCase().includes(query.toLowerCase())) ||
        (location.categories && location.categories.some(category => 
          category.toLowerCase().includes(query.toLowerCase())
        ))
      );
      
      setLocations(filteredLocations);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };
  
  // Function to search events - fixed type issues
  const searchEvents = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just filter existing events
      const filteredEvents = initialEvents.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.venue.toLowerCase().includes(query.toLowerCase()) ||
        event.description?.toLowerCase().includes(query.toLowerCase())
      );
      
      setEvents(filteredEvents);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };
  
  // Function to filter by vibe/category
  const filterByVibes = (vibes: string[]) => {
    setSelectedVibes(vibes);
    
    if (vibes.length === 0) {
      // Reset to original list if no vibes selected
      setLocations(initialLocations);
      return;
    }
    
    const filteredLocations = initialLocations.filter(location => {
      // Check if location has at least one of the selected vibes/categories
      return vibes.some(vibe => 
        location.categories?.includes(vibe) || 
        location.vibes?.includes(vibe)
      );
    });
    
    setLocations(filteredLocations);
  };
  
  // Function to filter by date range
  const filterByDateRange = (start: Date | null, end: Date | null) => {
    setSelectedDateRange({ start, end });
    
    // Implement date filtering logic here
    // This would typically be more complex with real data
    // For now, just a placeholder
  };
  
  // Function to filter by city
  const filterByCity = (city: string | null) => {
    setSelectedCity(city);
    
    if (!city) {
      // Reset to original list if no city selected
      setLocations(initialLocations);
      return;
    }
    
    const filteredLocations = initialLocations.filter(location => 
      location.city?.toLowerCase() === city.toLowerCase()
    );
    
    setLocations(filteredLocations);
  };
  
  // Handle search based on mode
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setLocations(initialLocations);
      setEvents(initialEvents);
      return;
    }
    
    if (isEventMode) {
      searchEvents(query);
    } else {
      searchLocations(query);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedVibes([]);
    setSelectedDateRange({ start: null, end: null });
    setSelectedCity(null);
    setLocations(initialLocations);
    setEvents(initialEvents);
  };
  
  return {
    locations,
    events,
    isLoading,
    error,
    searchQuery,
    selectedVibes,
    selectedDateRange,
    selectedCity,
    setLocations,
    setEvents: setEvents as React.Dispatch<React.SetStateAction<EventItem[]>>,
    handleSearch,
    filterByVibes,
    filterByDateRange,
    filterByCity,
    resetFilters
  };
};

export default useExploreState;
