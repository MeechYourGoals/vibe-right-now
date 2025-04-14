
import React from "react";
import { Button } from "@/components/ui/button";
import EventListItem from "./EventListItem";
import { EventItem } from "./types";
import { AlertCircle, Loader2 } from "lucide-react";

interface EventsListProps {
  events: EventItem[];
  showViewAll?: boolean;
  isLoading?: boolean;
  error?: string | null;
}

const EventsList = ({ 
  events, 
  showViewAll = true,
  isLoading = false,
  error = null 
}: EventsListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <Loader2 className="h-8 w-8 animate-spin mb-2 text-pro-light" />
        <p className="text-pro-light">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-red-300">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map(event => (
        <EventListItem key={event.id} event={event} />
      ))}
      
      {showViewAll && events.length > 0 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-pro-light hover:text-white hover:bg-pro-dark"
        >
          View All Events
        </Button>
      )}

      {events.length === 0 && !isLoading && (
        <div className="text-center py-4 text-pro-light">
          <p>No upcoming events found</p>
        </div>
      )}
    </div>
  );
};

export default EventsList;
