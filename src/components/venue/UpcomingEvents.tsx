
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EventHeader from "./events/EventHeader";
import EventsList from "./events/EventsList";
import { upcomingEvents } from "./events/eventsData";

const UpcomingEvents = () => {
  return (
    <Card className="bg-amber-950 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <EventHeader />
      </CardHeader>
      <CardContent>
        <EventsList events={upcomingEvents} />
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
