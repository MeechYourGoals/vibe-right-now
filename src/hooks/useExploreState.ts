
import { useState, useCallback } from 'react';
import { useLocationData } from './explore/useLocationData';
import { useCityDetection } from './explore/useCityDetection';
import { useFilterHandling } from './explore/useFilterHandling';

export const useExploreState = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVibe, setSelectedVibe] = useState('all');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentView, setCurrentView] = useState('locations');
  const [events, setEvents] = useState<any[]>([]);
  
  const {
    locations,
    filteredLocations,
    loading,
    setLocations,
    setFilteredLocations,
    setLoading
  } = useLocationData();
  
  const { detectedCity, setDetectedCity } = useCityDetection();
  
  const {
    handleSearch,
    handleCategoryChange,
    handleVibeChange,
    handleDateChange
  } = useFilterHandling({
    locations,
    setFilteredLocations,
    selectedCategory,
    selectedVibe,
    selectedDate,
    setSelectedCategory,
    setSelectedVibe,
    setSelectedDate,
    detectedCity
  });

  const handleSearchSubmit = useCallback((query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  }, [handleSearch]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    handleCategoryChange(category);
  }, [handleCategoryChange]);

  const handleVibeSelect = useCallback((vibe: string) => {
    setSelectedVibe(vibe);
    handleVibeChange(vibe);
  }, [handleVibeChange]);

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setSelectedDate(date);
    handleDateChange(date);
  }, [handleDateChange]);

  const handleEventsUpdate = useCallback((newEvents: any[]) => {
    setEvents(newEvents);
  }, []);

  return {
    // State
    searchQuery,
    selectedCategory,
    selectedVibe,
    selectedDate,
    isFilterVisible,
    currentView,
    detectedCity,
    locations,
    filteredLocations,
    events,
    loading,
    
    // Actions
    setSearchQuery,
    setIsFilterVisible,
    setCurrentView,
    setDetectedCity,
    setLocations,
    setFilteredLocations,
    setLoading,
    handleSearchSubmit,
    handleCategorySelect,
    handleVibeSelect,
    handleDateSelect,
    handleEventsUpdate
  };
};
