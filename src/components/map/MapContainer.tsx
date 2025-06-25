
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import GoogleMapComponent, { GoogleMapHandle } from "./google/GoogleMapComponent";
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
  showAllCities = true
}: MapContainerProps) => {
  const isMobile = useIsMobile();
  const mapRef = useRef<GoogleMapHandle>(null);
  
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
        ref={mapRef}
        userLocation={userLocation}
        locations={locations}
        searchedCity={searchedCity}
        mapStyle={mapStyle}
        selectedLocation={selectedLocation}
        onLocationSelect={onLocationSelect}
        showDistances={showDistances}
        userAddressLocation={userAddressLocation}
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
          {nearbyCount} Vibes within 10 miles of you
          {showDistances && (
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
          onClick={() => mapRef.current?.resize()}
        >
          Expand Map
        </Button>
      )}
    </div>
  );
};

export default MapContainer;
