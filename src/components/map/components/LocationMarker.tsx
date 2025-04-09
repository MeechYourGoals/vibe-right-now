
import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Location } from '@/types';
import { createCustomIcon, calculateDistance, shareVenue } from '../utils/mapUtils';

interface LocationMarkerProps {
  location: Location;
  isSelected: boolean;
  userLocation?: GeolocationCoordinates | null;
  userAddressLocation?: [number, number] | null;
  showDistances?: boolean;
  onLocationSelect: (location: Location) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({
  location,
  isSelected,
  userLocation,
  userAddressLocation,
  showDistances = false,
  onLocationSelect
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const icon = createCustomIcon(location.type, isSelected, isHovered);
  
  let distance: number | null = null;
  if (showDistances && userLocation) {
    distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      location.lat,
      location.lng
    );
  } else if (showDistances && userAddressLocation) {
    distance = calculateDistance(
      userAddressLocation[0],
      userAddressLocation[1],
      location.lat,
      location.lng
    );
  }
  
  const handleShareVenue = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await shareVenue(location);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  
  return (
    <Marker
      position={[location.lat, location.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onLocationSelect(location),
        mouseover: () => setIsHovered(true),
        mouseout: () => setIsHovered(false)
      }}
    >
      <Popup>
        <div className="p-1">
          <h3 className="font-semibold text-base">{location.name}</h3>
          <p className="text-sm text-muted-foreground">{location.address}, {location.city}</p>
          {distance !== null && (
            <p className="text-sm mt-1 font-medium">
              <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                {distance.toFixed(1)} miles away
              </span>
            </p>
          )}
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={() => window.location.href = `/venue/${location.id}`}
            >
              View Venue
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="px-2"
              onClick={handleShareVenue}
              title="Share this venue"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
