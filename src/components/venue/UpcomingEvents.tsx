
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Calendar, Users, Clock } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Friday Night DJ Set",
    date: "2025-04-11",
    time: "9:00 PM - 2:00 AM",
    attendees: 134,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Saturday Brunch Special",
    date: "2025-04-12",
    time: "11:00 AM - 3:00 PM",
    attendees: 87,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Wine Tasting Event",
    date: "2025-04-15",
    time: "6:00 PM - 9:00 PM",
    attendees: 42,
    status: "upcoming"
  }
];

const UpcomingEvents = () => {
  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-gray-100">
          <CalendarDays className="mr-2 h-5 w-5 text-primary" />
          Upcoming Events
        </CardTitle>
        <Button variant="outline" size="sm" className="border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white">
          <Calendar className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="flex flex-col space-y-2 pb-4 border-b border-gray-700 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-100">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-300 mt-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{event.date}</span>
                    <Clock className="ml-2 mr-1 h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-900 text-green-100 border-green-700">
                  {event.attendees} RSVP
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-sm text-gray-300">
                  <Users className="mr-1 h-3 w-3" />
                  <span>{event.attendees} attendees</span>
                </div>
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-white">Manage</Button>
              </div>
            </div>
          ))}
          
          <Button variant="ghost" size="sm" className="w-full text-gray-300 hover:text-white hover:bg-gray-800">
            View All Events
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
