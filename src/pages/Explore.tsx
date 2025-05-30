
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import CameraButton from "@/components/CameraButton";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import VenuePost from "@/components/VenuePost";
import useExploreState from "@/hooks/useExploreState";
import { getCitySpecificContent, getMediaForLocationMock } from "@/utils/explore/mockGenerators";
import SearchSection from "@/components/explore/SearchSection";
import CategoryTabs from "@/components/explore/CategoryTabs";
import VibeFilter from "@/components/explore/VibeFilter";
import MusicSection from "@/components/explore/MusicSection";
import ComedySection from "@/components/explore/ComedySection";
import NightlifeSection from "@/components/explore/NightlifeSection";
import LocationsGrid from "@/components/explore/LocationsGrid";
import RecommendedForYou from "@/components/RecommendedForYou";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "@/types";

const Explore = () => {
  const isMobile = useIsMobile();
  const {
    activeTab,
    searchedCity,
    searchedState,
    searchCategory,
    filteredLocations,
    locationTags,
    musicEvents,
    comedyEvents,
    nightlifeVenues,
    vibeFilter,
    isNaturalLanguageSearch,
    isLoadingResults,
    dateRange,
    showDateFilter,
    activeSearchTab,
    getPageTitle,
    handleSearch,
    handleTabChange,
    handleClearVibeFilter,
    handleDateRangeChange,
    handleClearDates,
    handleSearchTabChange,
    setShowDateFilter
  } = useExploreState();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-6 vibe-gradient-text">
            {getPageTitle()}
          </h1>
          
          <SearchSection 
            showDateFilter={showDateFilter}
            dateRange={dateRange}
            onSearch={handleSearch}
            onDateRangeChange={handleDateRangeChange}
            onClearDates={handleClearDates}
          />
          
          {/* Map centered below search bar */}
          <div className="w-full mb-6">
            <NearbyVibesMap />
          </div>
          
          <VibeFilter 
            vibeFilter={vibeFilter} 
            onClearVibeFilter={handleClearVibeFilter} 
          />
          
          <CategoryTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
            {isLoadingResults ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
                  <p className="text-muted-foreground">Finding the perfect matches for your search...</p>
                </div>
              </div>
            ) : (
              <div>
                {activeTab === "music" && (
                  <MusicSection
                    musicEvents={musicEvents.length > 0 ? musicEvents : []}
                    searchedCity={searchedCity || "San Francisco"}
                    dateRange={dateRange}
                  />
                )}
                
                {activeTab === "comedy" && (
                  <ComedySection
                    comedyEvents={comedyEvents.length > 0 ? comedyEvents : []}
                    searchedCity={searchedCity || "San Francisco"}
                    dateRange={dateRange}
                  />
                )}
                
                {activeTab === "nightlife" && (
                  <NightlifeSection
                    nightlifeVenues={nightlifeVenues.length > 0 ? nightlifeVenues : []}
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
                      {filteredLocations
                        .filter(loc => loc.type === "sports")
                        .slice(0, 3)
                        .map(location => (
                          <VenuePost
                            key={location.id}
                            venue={location}
                            content={getCitySpecificContent(location)}
                            media={getMediaForLocationMock(location)}
                            timestamp={new Date().toISOString()}
                          />
                        ))}
                    </div>
                  </div>
                )}
                
                {activeTab !== "music" && activeTab !== "comedy" && activeTab !== "nightlife" && activeTab !== "sports" && (
                  <LocationsGrid
                    locations={filteredLocations}
                    locationTags={locationTags}
                  />
                )}
              </div>
            )}
          </div>
          
          {!isMobile && (
            <div className="w-1/4 space-y-6">
              <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
              <TrendingLocations />
              <DiscountLocations />
            </div>
          )}
          
          {isMobile && (
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-bold mb-4 vibe-gradient-text">Around You</h2>
              <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
              <TrendingLocations />
              <DiscountLocations />
            </div>
          )}
        </div>
      </main>
      
      <CameraButton />
    </div>
  );
};

export default Explore;
