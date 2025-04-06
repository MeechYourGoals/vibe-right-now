
import { Location } from "@/types";
import LocationHeader from "./location-details/LocationHeader";
import LocationActions from "./location-details/LocationActions";
import RecentVibes from "./location-details/RecentVibes";

interface LocationDetailsSidebarProps {
  location: Location;
  onClose: () => void;
  onViewVibes: (locationId: string) => void;
}

const LocationDetailsSidebar = ({ location, onClose, onViewVibes }: LocationDetailsSidebarProps) => {
  return (
    <div className="absolute right-4 top-4 w-1/3 max-h-[70vh] bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg overflow-y-auto">
      <LocationHeader location={location} onClose={onClose} />
      <LocationActions location={location} onViewVibes={onViewVibes} />
      <RecentVibes location={location} />
    </div>
  );
};

export default LocationDetailsSidebar;
