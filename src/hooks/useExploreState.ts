import { useState, useCallback } from 'react';
import { Location, EventItem } from '@/types';
import useQueryProcessing from './useQueryProcessing';

const useExploreState = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [cityFilter, setCityFilter] = useState('all');

  const { processQuery } = useQueryProcessing();

  const setInitialLocations = useCallback((initialLocations: Location[]) => {
    setLocations(initialLocations);
    setFilteredLocations(initialLocations);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setCurrentCategory(category);
  }, []);

  const handleCityFilterChange = useCallback((city: string) => {
    setCityFilter(city);
  }, []);

  const handleDateChange = useCallback((date: Date | undefined) => {
    setSelectedDate(date);
  }, []);

  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setFilteredLocations(locations);
      return;
    }

    setLoading(true);
    try {
      const results = await processQuery(
        query,
        currentCategory,
        setEvents as React.Dispatch<React.SetStateAction<Location[]>>,
        selectedDate,
        cityFilter
      );
      setFilteredLocations(results || []);
    } catch (error) {
      console.error('Search error:', error);
      setFilteredLocations([]);
    } finally {
      setLoading(false);
    }
  }, [locations, currentCategory, processQuery, selectedDate, cityFilter]);

  return {
    locations,
    filteredLocations,
    events,
    loading,
    currentCategory,
    searchQuery,
    selectedDate,
    cityFilter,
    setInitialLocations,
    handleCategoryChange,
    handleSearchQueryChange,
    handleSearch,
    handleDateChange,
    handleCityFilterChange
  };
};

export default useExploreState;
