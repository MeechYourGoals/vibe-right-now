
import React from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import VenuePost from "@/components/VenuePost";
import CategoryTabs from "./CategoryTabs";
import MusicSection from "./MusicSection";
import ComedySection from "./ComedySection";
import NightlifeSection from "./NightlifeSection";
import LocationsGrid from "./LocationsGrid";
import { Location } from "@/types";
import { getCitySpecificContent, getMediaForLocation } from "@/utils/explore/mockGenerators";

interface ExploreContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLoadingResults: boolean;
  searchCategory: string;
  musicEvents: any[];
  comedyEvents: any[];
  nightlifeVenues: Location[];
  filteredLocations: Location[];
  locationTags: Record<string, string[]>;
  searchedCity: string;
  dateRange?: { from: Date; to?: Date } | null;
}

const ExploreContent: React.FC<ExploreContentProps> = ({
  activeTab,
  onTabChange,
  isLoadingResults,
  searchCategory,
  musicEvents,
  comedyEvents,
  nightlifeVenues,
  filteredLocations,
  locationTags,
  searchedCity,
  dateRange
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

  return (
    <div>
      <CategoryTabs 
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <div className="mt-6">
        {activeTab === "music" && (
          <MusicSection
            musicEvents={musicEvents.length > 0 ? musicEvents : []}
            searchedCity={searchedCity || ""}
            dateRange={dateRange}
          />
        )}
        
        {activeTab === "comedy" && (
          <ComedySection
            comedyEvents={comedyEvents.length > 0 ? comedyEvents : []}
            searchedCity={searchedCity || ""}
            dateRange={dateRange}
          />
        )}
        
        {activeTab === "nightlife" && (
          <NightlifeSection
            nightlifeVenues={nightlifeVenues.length > 0 ? nightlifeVenues : []}
            searchedCity={searchedCity || ""}
            dateRange={dateRange}
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
            locationTags={locationTags}
          />
        )}
      </div>
    </div>
  );
};

export default ExploreContent;
