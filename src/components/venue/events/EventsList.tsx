
import React from "react";
import { Button } from "@/components/ui/button";
import EventListItem from "./EventListItem";
import { EventItem } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

interface EventsListProps {
  events: EventItem[];
  showViewAll?: boolean;
  isLoading?: boolean;
}

const EventsList = ({ events, showViewAll = true, isLoading = false }: EventsListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-4/5 bg-gray-700" />
            <Skeleton className="h-4 w-3/5 bg-gray-700" />
            <Skeleton className="h-4 w-2/5 bg-gray-700" />
          </div>
        ))}
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
    </div>
  );
};

export default EventsList;
