
import { useState } from 'react';
import { Location } from '@/types';

export const useFilterHandling = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 0,
    distance: 50
  });

  const applyFilters = (locations: Location[]) => {
    return locations.filter(location => {
      if (filters.category !== 'all' && location.category !== filters.category) {
        return false;
      }
      if (filters.rating > 0 && (location.rating || 0) < filters.rating) {
        return false;
      }
      return true;
    });
  };

  return {
    filters,
    setFilters,
    applyFilters
  };
};
