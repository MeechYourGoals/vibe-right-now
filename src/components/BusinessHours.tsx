
import { useState } from "react";
import { BusinessHours as BusinessHoursType, Location } from "@/types";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { generateBusinessHours, getTodaysHours } from "@/utils/businessHoursUtils";

interface BusinessHoursProps {
  venue: Location;
}

const BusinessHours = ({ venue }: BusinessHoursProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Ensure venue has hours data
  const hours = venue.hours || generateBusinessHours();
  
  const todaysHours = getTodaysHours(hours);
  
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
            <span>{typeof hours.monday === 'string' ? hours.monday : `${hours.monday.open} - ${hours.monday.close}`}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Tuesday:</span>
            <span>{typeof hours.tuesday === 'string' ? hours.tuesday : `${hours.tuesday.open} - ${hours.tuesday.close}`}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Wednesday:</span>
            <span>{typeof hours.wednesday === 'string' ? hours.wednesday : `${hours.wednesday.open} - ${hours.wednesday.close}`}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Thursday:</span>
            <span>{typeof hours.thursday === 'string' ? hours.thursday : `${hours.thursday.open} - ${hours.thursday.close}`}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Friday:</span>
            <span>{typeof hours.friday === 'string' ? hours.friday : `${hours.friday.open} - ${hours.friday.close}`}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Saturday:</span>
            <span>{typeof hours.saturday === 'string' ? hours.saturday : `${hours.saturday.open} - ${hours.saturday.close}`}</span>
          </div>
          <div className="flex justify-between pr-2">
            <span className="text-muted-foreground">Sunday:</span>
            <span>{typeof hours.sunday === 'string' ? hours.sunday : `${hours.sunday.open} - ${hours.sunday.close}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessHours;
