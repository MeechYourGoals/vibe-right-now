
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { createUserIcon } from '../utils/mapUtils';

interface UserLocationMarkerProps {
  userLocation: GeolocationCoordinates;
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ userLocation }) => {
  const userIcon = createUserIcon();
  
  return (
    <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userIcon}>
      <Popup>
        <div className="px-1 py-1">
          <p className="font-medium text-center">You are here</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default UserLocationMarker;
