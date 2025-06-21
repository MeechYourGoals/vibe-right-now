
import { useState, useEffect } from 'react';
import { Location } from '@/types';
import { GeoCoordinates } from '@/types';

export const useNearbyLocations = (coordinates?: GeoCoordinates) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!coordinates) return;

    setIsLoading(true);
    // Mock implementation - replace with actual API call
    setTimeout(() => {
      setLocations([]);
      setIsLoading(false);
    }, 1000);
  }, [coordinates]);

  return { locations, isLoading };
};
