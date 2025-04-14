
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EventHeader from "./events/EventHeader";
import EventsList from "./events/EventsList";
import { sampleEvents } from "./events/eventsData";
import { getMusicEventsForCity } from "@/services/search/eventService";
import { EventItem } from "./events/types";
import { Skeleton } from "@/components/ui/skeleton";

interface UpcomingEventsProps {
  location?: string;
  eventType?: "music" | "comedy" | "all";
  limit?: number;
}

const UpcomingEvents = ({ 
  location = "New York",
  eventType = "all",
  limit = 5
}: UpcomingEventsProps) => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        if (eventType === "music" || eventType === "all") {
          const musicEvents = await getMusicEventsForCity(location);
          setEvents(musicEvents.slice(0, limit));
        } else {
          // Default to sample events for other types
          setEvents(sampleEvents.slice(0, limit));
        }
      } catch (error) {
        console.error("Error loading events:", error);
        setEvents(sampleEvents.slice(0, limit));
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [location, eventType, limit]);

  return (
    <Card className="bg-pro-bg-dark text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <EventHeader />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-4/5 bg-gray-700" />
                <Skeleton className="h-4 w-3/5 bg-gray-700" />
                <Skeleton className="h-4 w-2/5 bg-gray-700" />
              </div>
            ))}
          </div>
        ) : (
          <EventsList events={events} />
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
