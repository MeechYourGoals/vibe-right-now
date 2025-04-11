
/**
 * Gets the reference point for distance calculation (user address or current location)
 */
export const getReferencePoint = (
  userAddressLocation: [number, number] | null, 
  userLocation: GeolocationCoordinates | null
): { lat: number, lng: number } | null => {
  if (userAddressLocation) {
    return { 
      lat: userAddressLocation[1], 
      lng: userAddressLocation[0] 
    };
  } else if (userLocation) {
    return { 
      lat: userLocation.latitude, 
      lng: userLocation.longitude 
    };
  }
  return null;
};

/**
 * Calculates distance between two points in miles 
 * Uses the Haversine formula
 */
export const calculateDistance = (
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): string => {
  const R = 3958.8; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  // Format the distance nicely
  if (distance < 0.1) {
    return "nearby";
  } else if (distance < 10) {
    return `${distance.toFixed(1)} mi`;
  } else {
    return `${Math.round(distance)} mi`;
  }
};

/**
 * Converts degrees to radians
 */
const toRad = (value: number): number => {
  return value * Math.PI / 180;
};
