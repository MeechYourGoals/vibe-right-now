
import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarDays } from "lucide-react";

const EventHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="flex items-center text-amber-100">
        <CalendarDays className="mr-2 h-5 w-5 text-amber-400" />
        Upcoming Events
      </CardTitle>
      <Button 
        variant="outline" 
        size="sm" 
        className="border-amber-700 text-amber-100 hover:bg-amber-900 hover:text-white"
      >
        <Calendar className="mr-2 h-4 w-4" />
        Create Event
      </Button>
    </div>
  );
};

export default EventHeader;
