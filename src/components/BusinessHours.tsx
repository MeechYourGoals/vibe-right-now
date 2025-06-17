
import { useState } from "react";
import { Location } from "@/types";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { generateBusinessHours, getTodaysHours } from "@/utils/businessHoursUtils";

interface BusinessHoursProps {
  venue: Location;
}

const BusinessHours = ({ venue }: BusinessHoursProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Ensure venue has hours data
  if (!venue.hours) {
    venue.hours = generateBusinessHours(venue);
  }
  
  const todaysHours = getTodaysHours(venue);
  
  const formatHours = (hours: { open: string; close: string; closed?: boolean; } | string) => {
    if (typeof hours === 'string') {
      return hours;
    }
    if (hours.closed) {
      return 'Closed';
    }
    return `${hours.open} - ${hours.close}`;
  };
  
  return (
    <div className="mt-2">
      <div className="flex items-center text-sm">
        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
        <span className="text-muted-foreground">Today:</span>
        <span className="ml-1 font-medium">{todaysHours}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 ml-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      
      {isExpanded && venue.hours && (
        <div className="mt-2 text-sm grid grid-cols-2 gap-1">
          {Object.entries(venue.hours).filter(([key]) => key !== 'isOpenNow' && key !== 'timezone').map(([day, hours]) => (
            <div key={day} className="flex justify-between pr-2">
              <span className="text-muted-foreground capitalize">{day}:</span>
              <span>{formatHours(hours)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessHours;
