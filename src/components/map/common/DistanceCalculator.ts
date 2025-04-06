
/**
 * Calculate distance between two points in miles
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance < 1 ? `${(distance * 10).toFixed(1)} mi` : `${distance.toFixed(1)} mi`;
};

/**
 * Get reference point for distance calculation from user location or address
 */
export const getReferencePoint = (
  userAddressLocation: [number, number] | null,
  userLocation: GeolocationCoordinates | null
): { lat: number; lng: number } | null => {
  if (userAddressLocation) {
    return { lat: userAddressLocation[1], lng: userAddressLocation[0] };
  } else if (userLocation) {
    return { lat: userLocation.latitude, lng: userLocation.longitude };
  }
  return null;
};
