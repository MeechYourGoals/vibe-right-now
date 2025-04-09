
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import { EventItem } from "./types";

interface EventListItemProps {
  event: EventItem;
}

const EventListItem = ({ event }: EventListItemProps) => {
  return (
    <div className="flex flex-col space-y-2 pb-4 border-b border-pro-dark last:border-0">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-amber-100">{event.title}</h3>
          <div className="flex items-center text-sm text-pro-light mt-1">
            <Calendar className="mr-1 h-3 w-3" />
            <span>{event.date}</span>
            <Clock className="ml-2 mr-1 h-3 w-3" />
            <span>{event.time}</span>
          </div>
        </div>
        <Badge variant="outline" className="bg-pro-dark text-amber-100 border-pro-dark">
          {event.attendees} RSVP
        </Badge>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center text-sm text-pro-light">
          <Users className="mr-1 h-3 w-3" />
          <span>{event.attendees} attendees</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-pro-dark text-amber-100 hover:bg-pro-dark hover:text-white"
        >
          Manage
        </Button>
      </div>
    </div>
  );
};

export default EventListItem;
