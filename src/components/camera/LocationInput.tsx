
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface LocationInputProps {
  location: string;
  isCheckingLocation: boolean;
  locationVerified: boolean;
  onLocationChange: (value: string) => void;
  onVerifyLocation: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  location,
  isCheckingLocation,
  locationVerified,
  onLocationChange,
  onVerifyLocation
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <div className="flex gap-2">
        <Input 
          id="location"
          placeholder="Search for a venue..."
          className="bg-background/50"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        />
        <Button 
          variant="outline"
          disabled={!location.trim() || isCheckingLocation}
          onClick={onVerifyLocation}
          className={isCheckingLocation ? "opacity-50" : ""}
        >
          {isCheckingLocation ? "Checking..." : "Verify"}
        </Button>
      </div>
      {locationVerified && (
        <p className="text-xs text-green-500 flex items-center">
          <span className="bg-green-500 h-2 w-2 rounded-full mr-1"></span>
          Location verified - You're within range!
        </p>
      )}
    </div>
  );
};

export default LocationInput;
