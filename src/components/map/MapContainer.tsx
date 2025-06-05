
import React from "react";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import GoogleMapComponent from "./google/GoogleMapComponent";
import LocationDetailsSidebar from "./LocationDetailsSidebar";
import { Location } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface MapContainerProps {
  loading: boolean;
  isExpanded: boolean;
  userLocation: GeolocationCoordinates | null;
  locations: Location[];
  searchedCity: string;
  mapStyle: "default" | "terrain" | "satellite";
  selectedLocation: Location | null;
  showDistances: boolean;
  userAddressLocation: [number, number] | null;
  onLocationSelect: (location: Location) => void;
  onCloseLocation: () => void;
  nearbyCount: number;
  onToggleDistances: () => void;
  showAllCities?: boolean;
  realPlaceCenter?: { lat: number; lng: number };
}

const MapContainer = ({
  loading,
  isExpanded,
  userLocation,
  locations,
  searchedCity,
  mapStyle,
  selectedLocation,
  showDistances,
  userAddressLocation,
  onLocationSelect,
  onCloseLocation,
  nearbyCount,
  onToggleDistances,
  showAllCities = true,
  realPlaceCenter
}: MapContainerProps) => {
  const isMobile = useIsMobile();
  
  if (loading) {
    return (
      <div className={`bg-muted/20 rounded-lg flex items-center justify-center ${isExpanded ? "h-[85vh]" : isMobile ? "h-80" : "h-80"}`}>
        <div className="animate-spin">
          <Compass className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative ${isExpanded ? "h-[85vh]" : isMobile ? "h-80" : "h-80"} rounded-lg overflow-hidden transition-all`} style={{ zIndex: 1 }}>
      <GoogleMapComponent
        userLocation={userLocation}
        locations={locations}
        searchedCity={searchedCity}
        mapStyle={mapStyle}
        selectedLocation={selectedLocation}
        onLocationSelect={onLocationSelect}
        showDistances={showDistances}
        userAddressLocation={userAddressLocation}
        showAllCities={showAllCities}
        realPlaceCenter={realPlaceCenter}
      />
      
      {isExpanded && selectedLocation && (
        <LocationDetailsSidebar
          location={selectedLocation}
          onClose={onCloseLocation}
          onViewVibes={(id) => window.location.href = `/venue/${id}`}
        />
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-3 glass-effect bg-background/70 backdrop-blur-sm">
        <p className="text-sm">
          {realPlaceCenter ? "Real place from Google Maps" : `${nearbyCount} Vibes within 10 miles of you`}
          {showDistances && !realPlaceCenter && (
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto ml-2" 
              onClick={onToggleDistances}
            >
              Hide distances
            </Button>
          )}
        </p>
      </div>
      
      {/* Add resize button on mobile */}
      {isMobile && !isExpanded && (
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm" 
          onClick={() => window.resizeMap && window.resizeMap()}
        >
          Expand Map
        </Button>
      )}
    </div>
  );
};

export default MapContainer;
