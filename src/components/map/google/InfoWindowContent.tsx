import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Location, BusinessHours } from "@/types";

interface InfoWindowContentProps {
  location: Location;
  onNavigate: () => void;
  onBook: () => void;
  onClose: () => void;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({
  location,
  onNavigate,
  onBook,
  onClose
}) => {
  const formatBusinessHours = (hours: BusinessHours | undefined) => {
    if (!hours) return 'Hours not available';
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' }) as keyof BusinessHours;
    const todayHours = hours[today];
    
    if (typeof todayHours === 'string') {
      return todayHours;
    } else if (typeof todayHours === 'object' && todayHours.open && todayHours.close) {
      return `${todayHours.open} - ${todayHours.close}`;
    }
    
    return 'Closed today';
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">{location.name}</h3>
      <p className="text-sm text-muted-foreground">{location.address}, {location.city}, {location.state}</p>
      <p className="text-sm text-muted-foreground">{formatBusinessHours(location.hours)}</p>
      <div className="mt-4 flex space-x-2">
        <Button size="sm" onClick={onNavigate}>
          Navigate
        </Button>
        <Button size="sm" variant="secondary" onClick={onBook}>
          Book Now
        </Button>
        <Link to={`/venue/${location.id}`} onClick={onClose}>
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InfoWindowContent;
