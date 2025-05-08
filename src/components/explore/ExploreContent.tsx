
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import MusicSection from "@/components/explore/MusicSection";
import ComedySection from "@/components/explore/ComedySection";
import NightlifeSection from "@/components/explore/NightlifeSection";
import LocationsGrid from "@/components/explore/LocationsGrid";
import VenuePost from "@/components/venue/VenuePost";
import { EventItem } from "@/components/venue/events/types";
import { getCitySpecificContent, getMediaForLocation } from "@/utils/explore/exploreHelpers";

interface ExploreContentProps {
  activeTab: string;
  searchCategory: string;
  filteredLocations: Location[];
  musicEvents: EventItem[];
  comedyEvents: EventItem[];
  nightlifeVenues: Location[];
  searchedCity: string;
  dateRange: DateRange | undefined;
  locationTags: Record<string, string[]>;
  isLoadingResults: boolean;
}

const ExploreContent: React.FC<ExploreContentProps> = ({
  activeTab,
  searchCategory,
  filteredLocations,
  musicEvents,
  comedyEvents,
  nightlifeVenues,
  searchedCity,
  dateRange,
  locationTags,
  isLoadingResults
}) => {
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

  // Filter locations based on the active tab
  const displayLocations = activeTab === "all" 
    ? filteredLocations 
    : filteredLocations.filter(loc => loc.type === activeTab);

  return (
    <div className="space-y-6">
      {activeTab === "music" && (
        <MusicSection
          musicEvents={musicEvents}
          searchedCity={searchedCity || "San Francisco"}
          dateRange={dateRange}
        />
      )}
      
      {activeTab === "comedy" && (
        <ComedySection
          comedyEvents={comedyEvents}
          searchedCity={searchedCity || "San Francisco"}
          dateRange={dateRange}
        />
      )}
      
      {activeTab === "nightlife" && (
        <NightlifeSection
          nightlifeVenues={nightlifeVenues}
          searchedCity={searchedCity || "San Francisco"}
          dateRange={dateRange}
        />
      )}
      
      {activeTab === "sports" && (
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
            {displayLocations
              .slice(0, 3)
              .map(location => (
                <VenuePost
                  key={location.id}
                  venue={location}
                  content={getCitySpecificContent(location)}
                  media={[getMediaForLocation(location)]}
                  timestamp={new Date().toISOString()}
                />
              ))}
          </div>
        </div>
      )}
      
      {/* Always display locations for tabs other than music, comedy, nightlife */}
      {activeTab !== "music" && activeTab !== "comedy" && activeTab !== "nightlife" && displayLocations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {activeTab === "all" ? "Popular Venues" : `Popular ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s`}
          </h2>
          <LocationsGrid 
            locations={displayLocations} 
            locationTags={locationTags}
          />
        </div>
      )}
      
      {/* Show empty state when no results for a tab */}
      {activeTab !== "music" && activeTab !== "comedy" && activeTab !== "nightlife" && displayLocations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No {activeTab === "all" ? "venues" : activeTab} found for the current search.</p>
          <p className="text-sm">Try adjusting your search criteria or exploring different categories.</p>
        </div>
      )}
    </div>
  );
};

export default ExploreContent;
