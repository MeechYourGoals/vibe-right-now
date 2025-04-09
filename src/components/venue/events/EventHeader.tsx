
import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays } from "lucide-react";

const EventHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="flex items-center text-amber-100">
        <CalendarDays className="mr-2 h-5 w-5 text-pro-light" />
        Upcoming Events
      </CardTitle>
      <Button 
        variant="outline" 
        size="sm" 
        className="border-pro-dark text-amber-100 hover:bg-pro-dark hover:text-white"
      >
        <Calendar className="mr-2 h-4 w-4" />
        Create Event
      </Button>
    </div>
  );
};

export default EventHeader;
