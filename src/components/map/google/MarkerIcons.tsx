
import { Location } from "@/types";

// Helper function to create SVG marker icons
export const createLocationMarkerIcon = (locationType: string): string => {
  const typeColors: Record<string, string> = {
    restaurant: 'ff6b6b',
    bar: '6b66ff',
    sports: '66ff6b',
    event: 'ffbb66',
    attraction: 'ffbb66',
    default: 'ffbb66'
  };
  
  const color = typeColors[locationType] || typeColors.default;
  
  return `data:image/svg+xml;charset=UTF-8,
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="%23${color}" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="5" fill="%23ffffff" stroke="%23${color}" stroke-width="1" opacity="0.4"/>
    </svg>`;
};

export const createUserMarkerIcon = (isAddress: boolean = false): string => {
  const color = isAddress ? 'F97316' : 'ff9900';
  
  return `data:image/svg+xml;charset=UTF-8,
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="%23${color}" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="white" stroke="%23${color}" stroke-width="1" opacity="0.8"/>
    </svg>`;
};
