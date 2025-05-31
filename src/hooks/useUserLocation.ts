
import { useState, useEffect } from 'react';

export interface UserLocationData {
  userLocation: GeolocationCoordinates | null;
  isLoading: boolean;
  error: string | null;
}

export const useUserLocation = (): UserLocationData => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setIsLoading(false);
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position.coords);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        let errorMessage = 'Failed to get location';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        
        setError(errorMessage);
        setIsLoading(false);
        console.warn('Geolocation error:', errorMessage);
      },
      options
    );
  }, []);

  return {
    userLocation,
    isLoading,
    error
  };
};
