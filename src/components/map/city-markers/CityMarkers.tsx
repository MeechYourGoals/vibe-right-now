
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { cityCoordinates } from '@/utils/locations/cityDatabase';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Create a special icon for city markers with a golden color
const cityIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" fill="%23F5D742" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="5" fill="%23FFB319" stroke="white" stroke-width="1"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

interface CityMarkersProps {
  onCitySelect?: (cityName: string) => void;
}

const CityMarkers: React.FC<CityMarkersProps> = ({ onCitySelect }) => {
  const navigate = useNavigate();
  
  const handleCityClick = (cityName: string) => {
    if (onCitySelect) {
      onCitySelect(cityName);
    }
    
    // Navigate to explore page with city as query param
    navigate(`/explore?q=${encodeURIComponent(cityName)}`);
  };
  
  return (
    <>
      {Object.values(cityCoordinates).map((city, index) => (
        <Marker 
          key={`city-${city.name}-${index}`}
          position={[city.lat, city.lng]}
          icon={cityIcon}
          eventHandlers={{
            click: () => {},
            mouseover: (e) => {
              e.target.openPopup();
            }
          }}
        >
          <Popup>
            <div className="p-2 min-w-[180px]">
              <h3 className="font-bold text-sm">{city.name}</h3>
              <p className="text-xs text-gray-600">{city.state ? `${city.state}, ` : ''}{city.country}</p>
              <Button 
                size="sm" 
                className="mt-2 text-xs py-0 h-7 w-full bg-gradient-vibe" 
                onClick={() => handleCityClick(city.name)}
              >
                View Vibes in {city.name}
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default CityMarkers;
