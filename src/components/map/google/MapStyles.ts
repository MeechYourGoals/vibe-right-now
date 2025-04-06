
/**
 * Map style configuration based on selected style
 */
export const getMapOptions = (mapStyle: "default" | "terrain" | "satellite") => {
  return {
    mapTypeId: mapStyle === 'satellite' 
      ? 'satellite' 
      : mapStyle === 'terrain' 
        ? 'terrain' 
        : 'roadmap',
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false
  };
};
