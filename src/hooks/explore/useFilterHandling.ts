
import { useState } from 'react';
import { Location } from '@/types';

export const useFilterHandling = () => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const applyFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  return {
    filteredLocations,
    setFilteredLocations,
    activeFilters,
    applyFilter,
    clearFilters
  };
};
