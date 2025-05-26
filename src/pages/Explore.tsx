
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EventsList } from "@/components/venue/events/EventsList";
import { EventItem as VenueEventItem } from "@/components/venue/events/types";
import { EventItem } from "@/types";
import SearchSection from "@/components/explore/SearchSection";
import CategoryTabs from "@/components/explore/CategoryTabs";
import LocationsGrid from "@/components/explore/LocationsGrid";
import { useExploreState } from "@/hooks/useExploreState";
import { useFilterHandling } from "@/hooks/explore/useFilterHandling";
import { useLocationData } from "@/hooks/explore/useLocationData";
import { useQueryProcessing } from "@/hooks/explore/useQueryProcessing";
import { useSearchParams } from "@/hooks/explore/useSearchParams";
import { useCityDetection } from "@/hooks/explore/useCityDetection";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const exploreState = useExploreState({
    searchQuery,
    selectedCategory,
    selectedVibes,
    selectedDate
  });

  const { currentCity } = useCityDetection();
  const { updateURLParams } = useSearchParams();
  const { handleFilterChange } = useFilterHandling({
    setSelectedCategory,
    setSelectedVibes,
    setSelectedDate,
    updateURLParams
  });

  const { locations, events, loading } = useLocationData({
    searchQuery,
    selectedCategory,
    selectedVibes,
    selectedDate,
    currentCity
  });

  const { processedQuery } = useQueryProcessing(searchQuery);

  useEffect(() => {
    updateURLParams({
      category: selectedCategory,
      vibes: selectedVibes,
      date: selectedDate
    });
  }, [selectedCategory, selectedVibes, selectedDate, updateURLParams]);

  // Convert EventItem[] to VenueEventItem[] for the EventsList component
  const convertToVenueEvents = (events: EventItem[]): VenueEventItem[] => {
    return events.map(event => ({
      id: event.id,
      title: event.name,
      venue: event.location?.name || "Unknown Venue",
      date: event.date,
      time: event.time,
      description: `${event.category} event`,
      ticketsAvailable: true,
      type: event.category as any
    }));
  };

  const renderContent = () => {
    if (selectedCategory === "events") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Events in {currentCity}</h2>
          <EventsList 
            events={convertToVenueEvents(events)} 
            onEventClick={(event) => console.log("Event clicked:", event)}
          />
        </div>
      );
    }

    if (selectedCategory === "comedy") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Comedy Shows in {currentCity}</h2>
          <EventsList 
            events={convertToVenueEvents(events.filter(e => e.category === "comedy"))} 
            onEventClick={(event) => console.log("Comedy event clicked:", event)}
          />
        </div>
      );
    }

    return (
      <LocationsGrid 
        locations={locations}
        loading={loading}
        selectedVibes={selectedVibes}
      />
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <SearchSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentCity={currentCity}
        />
        
        <CategoryTabs 
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            handleFilterChange({ category });
          }}
          selectedVibes={selectedVibes}
          onVibesChange={(vibes) => {
            setSelectedVibes(vibes);
            handleFilterChange({ vibes });
          }}
          selectedDate={selectedDate}
          onDateChange={(date) => {
            setSelectedDate(date);
            handleFilterChange({ date });
          }}
        />

        {renderContent()}
      </div>
    </Layout>
  );
};

export default Explore;
