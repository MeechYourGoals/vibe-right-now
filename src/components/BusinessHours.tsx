
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
      
      {isExpanded && (
        <div className="mt-2 text-sm grid grid-cols-2 gap-1">
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Monday:</span>
            <span>{venue.hours.monday.open} - {venue.hours.monday.close}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Tuesday:</span>
            <span>{venue.hours.tuesday.open} - {venue.hours.tuesday.close}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Wednesday:</span>
            <span>{venue.hours.wednesday.open} - {venue.hours.wednesday.close}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Thursday:</span>
            <span>{venue.hours.thursday.open} - {venue.hours.thursday.close}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Friday:</span>
            <span>{venue.hours.friday.open} - {venue.hours.friday.close}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Saturday:</span>
            <span>{venue.hours.saturday.open} - {venue.hours.saturday.close}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Sunday:</span>
            <span>{venue.hours.sunday.open} - {venue.hours.sunday.close}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessHours;
