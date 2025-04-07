
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Location } from "@/types";
import { getRideServiceUrl, getOfficialUrl, getActionButtonText } from "@/utils/locationUtils";
import { useNavigate } from "react-router-dom";

interface LocationCardProps {
  location: Location;
  onViewVibes: (locationId: string) => void;
}

const LocationCard = ({ location, onViewVibes }: LocationCardProps) => {
  const navigate = useNavigate();

  const handleViewVibes = () => {
    navigate(`/venue/${location.id}`);
  };

  return (
    <Card className="hover:bg-muted/20 transition-colors">
      <CardContent className="p-3">
        <div className="font-medium text-sm truncate">{location.name}</div>
        <div className="text-xs text-muted-foreground flex items-center mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{location.city}</span>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-7 text-xs"
            onClick={handleViewVibes}
          >
            View Vibes
          </Button>
          <a 
            href={getRideServiceUrl(location)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" size="sm" className="w-full h-7 text-xs">
              Order a Ride
            </Button>
          </a>
          <a 
            href={getOfficialUrl(location)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" size="sm" className="w-full h-7 text-xs">
              {getActionButtonText(location.type)}
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
