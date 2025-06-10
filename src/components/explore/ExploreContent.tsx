
import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import VenuePost from "@/components/VenuePost";
import { getCitySpecificContent, getMediaForLocation } from "@/utils/explore/mockGenerators";
import MusicSection from "./MusicSection";
import ComedySection from "./ComedySection";
import NightlifeSection from "./NightlifeSection";
import LocationsGrid from "./LocationsGrid";
import { Location, AppDateRange } from "@/types";
import { EventItem } from "@/components/venue/events/types";

interface ExploreContentProps {
  activeTab: string;
  searchCategory: string;
  isLoadingResults: boolean;
  filteredLocations: Location[];
  locationTags: string[];
  musicEvents: EventItem[];
  comedyEvents: EventItem[];
  nightlifeVenues: Location[];
  searchedCity: string;
  dateRange: AppDateRange;
}

const ExploreContent = ({
  activeTab,
  searchCategory,
  isLoadingResults,
  filteredLocations,
  locationTags,
  musicEvents,
  comedyEvents,
  nightlifeVenues,
  searchedCity,
  dateRange
}: ExploreContentProps) => {
  if (isLoadingResults) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
          <p className="text-muted-foreground">Finding the perfect matches for your search...</p>
        </div>
      </div>
    );
  }

  // Create a mapping of location tags for the grid
  const locationTagsMapping = locationTags.reduce((acc, tag, index) => {
    const locationId = filteredLocations[index]?.id;
    if (locationId) {
      acc[locationId] = [tag];
    }
    return acc;
  }, {} as Record<string, string[]>);

  // Convert AppDateRange to format expected by sections
  const convertedDateRange = dateRange.from && dateRange.to ? {
    from: dateRange.from,
    to: dateRange.to
  } : undefined;

  return (
    <div>
      {activeTab === "music" && (
        <MusicSection
          musicEvents={musicEvents.length > 0 ? musicEvents : []}
          searchedCity={searchedCity || ""}
          dateRange={convertedDateRange}
        />
      )}
      
      {activeTab === "comedy" && (
        <ComedySection
          comedyEvents={comedyEvents.length > 0 ? comedyEvents : []}
          searchedCity={searchedCity || ""}
          dateRange={convertedDateRange}
        />
      )}
      
      {activeTab === "nightlife" && (
        <NightlifeSection
          nightlifeVenues={nightlifeVenues.length > 0 ? nightlifeVenues : []}
          searchedCity={searchedCity || ""}
          dateRange={convertedDateRange}
        />
      )}
      
      {searchCategory === "places" && activeTab === "sports" && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            Trending Sports Events
            {dateRange?.from && (
              <Badge className="ml-2 bg-indigo-100 text-indigo-800">
                {format(dateRange.from, "MMM yyyy")}
                {dateRange.to && ` - ${format(dateRange.to, "MMM yyyy")}`}
              </Badge>
            )}
          </h2>
          <div className="space-y-4">
            {filteredLocations
              .filter(loc => loc.type === "sports")
              .slice(0, 3)
              .map(location => (
                <VenuePost
                  key={location.id}
                  venue={location}
                  content={getCitySpecificContent(location)}
                  media={getMediaForLocation(location)}
                  timestamp={new Date().toISOString()}
                />
              ))}
          </div>
        </div>
      )}
      
      {activeTab !== "music" && activeTab !== "comedy" && activeTab !== "nightlife" && (
        <LocationsGrid
          locations={filteredLocations}
          locationTags={locationTagsMapping}
        />
      )}
    </div>
  );
};

export default ExploreContent;
