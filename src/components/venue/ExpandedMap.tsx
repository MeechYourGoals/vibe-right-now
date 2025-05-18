
import { Button } from "@/components/ui/button";
import { Minimize } from "lucide-react";
import { Location } from "@/types";
import GoogleMapComponent from "@/components/map/google/GoogleMap";

interface ExpandedMapProps {
  venue: Location;
  toggleMapExpansion: () => void;
}

const ExpandedMap = ({ venue, toggleMapExpansion }: ExpandedMapProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{venue.name} Location</h2>
        <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
          <Minimize className="h-4 w-4" />
          Close Map
        </Button>
      </div>
      <div className="h-[85vh] rounded-lg overflow-hidden">
        <GoogleMapComponent
          userLocation={null}
          locations={[venue]}
          searchedCity={venue.city}
          mapStyle="default"
          selectedLocation={null}
          onLocationSelect={() => {}}
          userAddressLocation={null}
        />
      </div>
    </div>
  );
};

export default ExpandedMap;
