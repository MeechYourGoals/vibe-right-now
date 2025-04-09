
import React from "react";
import { Button } from "@/components/ui/button";
import EventListItem from "./EventListItem";
import { EventItem } from "./types";

interface EventsListProps {
  events: EventItem[];
}

const EventsList = ({ events }: EventsListProps) => {
  return (
    <div className="space-y-4">
      {events.map(event => (
        <EventListItem key={event.id} event={event} />
      ))}
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full text-amber-200 hover:text-white hover:bg-amber-900"
      >
        View All Events
      </Button>
    </div>
  );
};

export default EventsList;
