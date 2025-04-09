
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface PreferencesTabProps {
  onSave: () => void;
  isVenueMode?: boolean;
}

const PreferencesTab = ({ onSave, isVenueMode = false }: PreferencesTabProps) => {
  const [distanceUnit, setDistanceUnit] = useState("miles");
  const [searchRadius, setSearchRadius] = useState([10]);
  const [showNearbyLocations, setShowNearbyLocations] = useState(true);
  const [autoplayVideos, setAutoplayVideos] = useState(false);
  
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Preferences</h2>
      
      <div className="space-y-6">
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
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Content Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoplay">Autoplay Videos</Label>
                <div className="text-xs text-muted-foreground">
                  Automatically play videos in feed
                </div>
              </div>
              <Switch
                id="autoplay"
                checked={autoplayVideos}
                onCheckedChange={setAutoplayVideos}
              />
            </div>
            
            {isVenueMode ? (
              <div className="space-y-2">
                <Label htmlFor="default-post-view">Default Post View</Label>
                <Select defaultValue="grid">
                  <SelectTrigger id="default-post-view">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                    <SelectItem value="map">Map</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="content-language">Content Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="content-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        
        {isVenueMode && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Venue Display Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="featured-posts">Featured Posts</Label>
                  <div className="text-xs text-muted-foreground">
                    Show featured posts at the top of your profile
                  </div>
                </div>
                <Switch
                  id="featured-posts"
                  defaultChecked={true}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business-category">Business Category</Label>
                <Select defaultValue="restaurant">
                  <SelectTrigger id="business-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="bar">Bar/Nightlife</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        <Button onClick={onSave} className="w-full">Save Preferences</Button>
      </div>
    </div>
  );
};

export default PreferencesTab;
