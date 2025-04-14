
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EventHeader from "./events/EventHeader";
import EventsList from "./events/EventsList";
import { sampleEvents } from "./events/eventsData";
import { fetchMusicEvents } from "@/services/search/eventService";
import { EventItem } from "./events/types";

const UpcomingEvents = () => {
  const [events, setEvents] = useState<EventItem[]>(sampleEvents);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Default to events in a popular city if we don't have a specific one
        const cityEvents = await fetchMusicEvents("Austin", "TX");
        if (cityEvents && cityEvents.length > 0) {
          setEvents(cityEvents);
        }
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load upcoming events");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, []);

  return (
    <Card className="bg-pro-bg-dark text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <EventHeader />
      </CardHeader>
      <CardContent>
        <EventsList 
          events={events} 
          isLoading={isLoading} 
          error={error} 
        />
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
