
/**
 * Creates SVG marker icons for different location types
 */
export const createLocationMarkerIcon = (locationType: string): string => {
  // Define colors for different location types
  const typeColors: Record<string, { fill: string, stroke: string }> = {
    restaurant: { fill: '#FF5733', stroke: '#CC4429' },
    bar: { fill: '#8A2BE2', stroke: '#6E23B5' },
    event: { fill: '#3CB371', stroke: '#2E8857' },
    attraction: { fill: '#1E90FF', stroke: '#1872CC' },
    sports: { fill: '#FF8C00', stroke: '#CC7000' },
    other: { fill: '#808080', stroke: '#666666' }
  };

  // Get the colors for this location type (or use 'other' as fallback)
  const colors = typeColors[locationType] || typeColors.other;
  
  // Create SVG marker with the appropriate colors
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
      <path d="M12 0C5.383 0 0 5.383 0 12c0 9 12 24 12 24s12-15 12-24c0-6.617-5.383-12-12-12z" 
            fill="${colors.fill}" stroke="${colors.stroke}" stroke-width="1"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>
  `);
};

/**
 * Creates a marker icon for user location
 */
export const createUserMarkerIcon = (isSearchedAddress: boolean): string => {
  const color = isSearchedAddress ? '#4CAF50' : '#2196F3';
  const innerColor = isSearchedAddress ? '#81C784' : '#64B5F6';
  
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="5" fill="${innerColor}" stroke="white" stroke-width="1"/>
    </svg>
  `);
};
