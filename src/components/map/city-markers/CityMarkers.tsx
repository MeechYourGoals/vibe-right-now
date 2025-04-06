
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { cityCoordinates } from '@/utils/locations/cityDatabase';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Create a special icon for city markers
const cityIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface CityMarkersProps {
  onCitySelect?: (cityName: string) => void;
}

const CityMarkers: React.FC<CityMarkersProps> = ({ onCitySelect }) => {
  const navigate = useNavigate();
  
  const handleCityClick = (cityName: string) => {
    if (onCitySelect) {
      onCitySelect(cityName);
    } else {
      // Navigate to explore page with city as query param
      navigate(`/explore?q=${encodeURIComponent(cityName)}`);
    }
  };
  
  return (
    <>
      {Object.values(cityCoordinates).map((city, index) => (
        <Marker 
          key={`city-${city.name}-${index}`}
          position={[city.lat, city.lng]}
          icon={cityIcon}
        >
          <Popup>
            <div className="p-2 min-w-[150px]">
              <h3 className="font-bold text-sm">{city.name}</h3>
              <p className="text-xs text-gray-600">{city.state ? `${city.state}, ` : ''}{city.country}</p>
              <Button 
                size="sm" 
                className="mt-2 text-xs py-0 h-7 w-full" 
                onClick={() => handleCityClick(city.name)}
              >
                Explore Vibes
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default CityMarkers;
