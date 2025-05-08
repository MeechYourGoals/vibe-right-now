
import React, { useState } from 'react';
import { Location } from '@/types';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import GoogleMapComponent from './map/google/GoogleMapComponent';
import { mockLocations } from '@/mock/data';

interface NearbyVibesMapProps {
  locations?: Location[];
  isRealData?: boolean;
  height?: number;
}

const NearbyVibesMap = ({ 
  locations = mockLocations.slice(0, 10),
  isRealData = false,
  height = 300
}: NearbyVibesMapProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const navigate = useNavigate();

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleViewVibe = () => {
    if (selectedLocation) {
      navigate(`/venue/${selectedLocation.id}`);
    }
  };

  return (
    <>
      <div 
        className="relative rounded-lg overflow-hidden border border-border/40 bg-muted/20" 
        style={{ height: `${height}px` }}
      >
        <GoogleMapComponent
          userLocation={null}
          locations={locations}
          searchedCity=""
          mapStyle="default"
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          userAddressLocation={null}
        />
        
        <div className="absolute bottom-3 right-3 flex gap-2">
          <Button 
            size="sm" 
            variant="secondary" 
            className="bg-white/80 hover:bg-white shadow-md"
            onClick={() => navigate("/explore")}
          >
            <Maximize2 className="h-4 w-4 mr-1" />
            View in Explore
          </Button>
        </div>
        
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/80 px-3 py-1.5 rounded-md shadow-md text-sm">
            Map showing {locations.length} locations
          </div>
        </div>
      </div>

      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="sm:max-w-[90vw] h-[80vh] p-0 overflow-hidden">
          <div className="relative h-full w-full">
            <GoogleMapComponent
              userLocation={null}
              locations={locations}
              searchedCity=""
              mapStyle="default"
              selectedLocation={selectedLocation}
              onLocationSelect={handleLocationSelect}
              userAddressLocation={null}
              showAllCities={true}
            />
            
            <div className="absolute top-3 right-3">
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/80 hover:bg-white shadow-md"
                onClick={() => setIsExpanded(false)}
              >
                <Minimize2 className="h-4 w-4 mr-1" />
                Minimize
              </Button>
            </div>
            
            {selectedLocation && (
              <div className="absolute bottom-3 left-3 bg-white/90 p-3 rounded-md shadow-md max-w-xs">
                <h3 className="font-medium">{selectedLocation.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                <p className="text-xs mt-1">{selectedLocation.city}, {selectedLocation.state || selectedLocation.country}</p>
                <Button 
                  size="sm" 
                  className="mt-2 w-full" 
                  onClick={handleViewVibe}
                >
                  View Venue
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NearbyVibesMap;
