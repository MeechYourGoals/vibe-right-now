
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import { Location } from "@/types";

interface LocationHeaderProps {
  location: Location;
  onClose: () => void;
}

const LocationHeader = ({ location, onClose }: LocationHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">{location.name}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-sm text-muted-foreground flex items-center mb-4">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{location.address}, {location.city}, {location.state}</span>
      </div>
    </>
  );
};

export default LocationHeader;
