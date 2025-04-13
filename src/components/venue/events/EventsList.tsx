
import React from "react";
import { EventItem as EventItemType } from "./types";
import EventListItem from "./EventListItem";
import { Skeleton } from "@/components/ui/skeleton";

interface EventsListProps {
  events: EventItemType[];
  loading?: boolean;
}

const EventsList: React.FC<EventsListProps> = ({ events, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-24 w-24 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between mt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400">No upcoming events found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
