
import React from 'react';
import { Location } from '@/types';

interface SearchUtilsProps {
  onPlaceSelect: (place: Location) => void;
  onVenueSelect: (venue: Location) => void;
}

// This component provides utility functions for the search functionality
export const useSearchUtils = ({ onPlaceSelect, onVenueSelect }: SearchUtilsProps) => {
  const handleLocationSelect = (location: Location) => {
    if (location.type === 'city') {
      onPlaceSelect(location);
    } else {
      onVenueSelect(location);
    }
  };

  return {
    handleLocationSelect
  };
};

export default useSearchUtils;
