
import React from "react";
import { Calendar, MapPin, Clock, ExternalLink, Music, Mic, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventItem } from "./types";
import { formatDate } from "@/lib/utils";

interface EventListItemProps {
  event: EventItem;
}

const EventListItem = ({ event }: EventListItemProps) => {
  // Format date for display
  const formattedDate = event.date ? new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }) : '';

  // Select icon based on event type
  const getEventIcon = () => {
    switch(event.type) {
      case "music":
        return <Music className="h-4 w-4 text-primary" />;
      case "comedy":
        return <Mic className="h-4 w-4 text-primary" />;
      default:
        return <Calendar className="h-4 w-4 text-primary" />;
    }
  };

  // Get color class based on event type
  const getEventColorClass = () => {
    switch(event.type) {
      case "music":
        return "bg-purple-50 border-purple-200 hover:bg-purple-100";
      case "comedy":
        return "bg-blue-50 border-blue-200 hover:bg-blue-100";
      default:
        return "bg-amber-50 border-amber-200 hover:bg-amber-100";
    }
  };

  return (
    <div className={`p-4 rounded-md border ${getEventColorClass()} transition-colors`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 p-2 bg-white rounded-md shadow-sm">
            {getEventIcon()}
          </div>
          <div>
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.description}</p>
            
            <div className="mt-2 flex flex-col space-y-1">
              <span className="text-xs flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formattedDate}
              </span>
              <span className="text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {event.time}
              </span>
              <span className="text-xs flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {event.location}
              </span>
              {event.price && (
                <span className="text-xs flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {event.price}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {event.ticketUrl && (
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs"
            onClick={() => window.open(event.ticketUrl, '_blank')}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Buy Tickets
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventListItem;
