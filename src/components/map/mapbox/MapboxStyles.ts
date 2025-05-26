
/**
 * Get the appropriate Mapbox style URL based on the selected style
 */
export const getMapboxStyle = (mapStyle: "default" | "terrain" | "satellite"): string => {
  return mapStyle === 'satellite' 
    ? 'mapbox://styles/mapbox/satellite-streets-v12'
    : mapStyle === 'terrain' 
      ? 'mapbox://styles/mapbox/outdoors-v12' 
      : 'mapbox://styles/mapbox/streets-v12';
};

/**
 * CSS for marker animations
 */
export const getMarkerStyles = (): string => {
  return `
    @keyframes pulse {
      0% { transform: translate(-5px, -5px) scale(1); opacity: 1; }
      100% { transform: translate(-5px, -5px) scale(1.5); opacity: 0; }
    }
    
    .location-marker-container {
      position: relative;
      width: 20px;
      height: 20px;
    }
    
    .location-marker-label {
      position: absolute;
      bottom: -24px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 11px;
      pointer-events: none;
    }
    
    .location-marker-name {
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      background-color: rgba(var(--primary), 0.8);
      color: white;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 11px;
      pointer-events: none;
    }
  `;
};
