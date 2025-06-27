
import { Coordinates } from '@/types/coordinates';

export const geocodeAddress = async (address: string): Promise<Coordinates | null> => {
  try {
    if (typeof google !== 'undefined' && google.maps) {
      const geocoder = new google.maps.Geocoder();
      
      return new Promise((resolve) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
            const location = results[0].geometry.location;
            resolve({
              lat: location.lat(),
              lng: location.lng()
            });
          } else {
            console.error('Geocoding failed:', status);
            resolve(null);
          }
        });
      });
    } else {
      // Fallback: return a mock coordinate for testing
      console.warn('Google Maps not available, using mock coordinates');
      return {
        lat: 40.7128,
        lng: -74.0060
      };
    }
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};
