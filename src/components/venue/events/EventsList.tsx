
import React from "react";
import { Button } from "@/components/ui/button";
import EventListItem from "./EventListItem";
import { EventItem } from "./types";

interface EventsListProps {
  events: EventItem[];
  showViewAll?: boolean;
}

const EventsList = ({ events, showViewAll = true }: EventsListProps) => {
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
    </div>
  );
};

export default EventsList;
