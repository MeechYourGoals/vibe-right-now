
import { useEffect } from 'react';

// This component is deprecated - use GoogleMap instead
interface OpenStreetMapProps {
  userLocation?: any;
  locations?: any[];
  searchedCity?: string;
  mapStyle?: string;
  onLocationSelect?: (location: any) => void;
  selectedLocation?: any;
  userAddressLocation?: any;
  showAllCities?: boolean;
}

const OpenStreetMap = (props: OpenStreetMapProps) => {
  // Accept all props to avoid TypeScript errors but don't use them
  const {
    userLocation,
    locations,
    searchedCity,
    mapStyle,
    onLocationSelect,
    selectedLocation,
    userAddressLocation,
    showAllCities
  } = props;

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-white">
      <p>Map component deprecated - use Google Maps instead</p>
    </div>
  );
};

export default OpenStreetMap;
