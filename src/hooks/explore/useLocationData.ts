
import { useState, useEffect } from 'react';
import { Location } from '@/types';
import { generateLocationsByCity } from '@/utils/explore/locationGenerators';

export const useLocationData = (city: string = 'Los Angeles') => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        // Generate mock locations for the specified city
        const generatedLocations = generateLocationsByCity(city, 'CA');
        setLocations(generatedLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [city]);

  return {
    locations,
    loading,
    setLocations
  };
};
