
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventHeader from "./events/EventHeader";
import EventsList from "./events/EventsList";
import { EventItem } from "./events/types";
import { EventService } from "@/services/EventService";
import { sampleEvents } from "./events/eventsData";

const UpcomingEvents = () => {
  const [activeTab, setActiveTab] = useState("nightlife");
  const [events, setEvents] = useState<Record<string, EventItem[]>>({
    nightlife: [],
    comedy: [],
    music: []
  });
  const [loading, setLoading] = useState<Record<string, boolean>>({
    nightlife: true,
    comedy: true,
    music: true
  });

  useEffect(() => {
    // Load events for the initial tab immediately
    fetchEventsByCategory(activeTab);
    
    // Pre-fetch other categories with a slight delay
    const timer = setTimeout(() => {
      const otherCategories = ["nightlife", "comedy", "music"].filter(cat => cat !== activeTab);
      otherCategories.forEach(category => {
        fetchEventsByCategory(category);
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const fetchEventsByCategory = async (category: string) => {
    setLoading(prev => ({ ...prev, [category]: true }));
    try {
      const city = sessionStorage.getItem('selectedCity') || undefined;
      const fetchedEvents = await EventService.getEventsByCategory(category, city);
      setEvents(prev => ({ ...prev, [category]: fetchedEvents }));
    } catch (error) {
      console.error(`Error fetching ${category} events:`, error);
      // Fallback to sample events if any error occurs
      setEvents(prev => ({ ...prev, [category]: sampleEvents.filter(e => e.type === category) }));
    } finally {
      setLoading(prev => ({ ...prev, [category]: false }));
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Fetch events for tab if not already loaded
    if (events[value].length === 0 && !loading[value]) {
      fetchEventsByCategory(value);
    }
  };

  return (
    <Card className="bg-pro-bg-dark text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <EventHeader />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="nightlife" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="bg-pro-bg-light mb-4">
            <TabsTrigger value="nightlife">Night Life</TabsTrigger>
            <TabsTrigger value="comedy">Comedy</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nightlife">
            <EventsList 
              events={events.nightlife} 
              loading={loading.nightlife} 
            />
          </TabsContent>
          
          <TabsContent value="comedy">
            <EventsList 
              events={events.comedy} 
              loading={loading.comedy} 
            />
          </TabsContent>
          
          <TabsContent value="music">
            <EventsList 
              events={events.music} 
              loading={loading.music} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
