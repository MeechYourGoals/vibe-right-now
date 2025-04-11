
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LocationSettingsProps {
  searchRadius: number[];
  setSearchRadius: (value: number[]) => void;
  distanceUnit: string;
  setDistanceUnit: (value: string) => void;
  showNearbyLocations: boolean;
  setShowNearbyLocations: (value: boolean) => void;
}

const LocationSettings = ({
  searchRadius,
  setSearchRadius,
  distanceUnit,
  setDistanceUnit,
  showNearbyLocations,
  setShowNearbyLocations
}: LocationSettingsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Location Settings</h3>
      
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="search-radius">Search Radius ({searchRadius})</Label>
            <span className="text-sm text-muted-foreground">{searchRadius} {distanceUnit}</span>
          </div>
          <Slider
            id="search-radius"
            min={1}
            max={50}
            step={1}
            value={searchRadius}
            onValueChange={setSearchRadius}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="distance-unit">Distance Unit</Label>
          <Select value={distanceUnit} onValueChange={setDistanceUnit}>
            <SelectTrigger id="distance-unit">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="miles">Miles</SelectItem>
              <SelectItem value="kilometers">Kilometers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="nearby-locations">Show Nearby Locations</Label>
            <div className="text-xs text-muted-foreground">
              Display places close to your current location
            </div>
          </div>
          <Switch
            id="nearby-locations"
            checked={showNearbyLocations}
            onCheckedChange={setShowNearbyLocations}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSettings;
