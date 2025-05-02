
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { useToast } from "@/components/ui/use-toast";
import { useExploreData } from "@/hooks/useExploreData";
import { useExploreSearch } from "@/hooks/useExploreSearch";
import SearchSection from "@/components/explore/SearchSection";
import ExploreContent from "@/components/explore/ExploreContent";
import ExploreSidebar from "@/components/explore/ExploreSidebar";

const Explore = () => {
  const { 
    searchQuery, 
    activeTab,
    setActiveTab,
    searchedCity,
    searchedState,
    searchCategory,
    filteredLocations,
    locationTags,
    musicEvents,
    comedyEvents,
    nightlifeVenues,
    vibeFilter,
    setVibeFilter,
    isNaturalLanguageSearch,
    isLoadingResults,
    dateRange,
    showDateFilter,
    setShowDateFilter,
    realDataResults,
    hasRealData,
    isDetectingLocation
  } = useExploreData();
  
  const { 
    handleSearch,
    handleTabChange,
    handleDateRangeChange
  } = useExploreSearch();

  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Initialize location tags
    const tagsMap: Record<string, string[]> = {};
    mockLocations.forEach(location => {
      tagsMap[location.id] = getAdditionalTags(location);
    });
    setLocationTags(tagsMap);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <SearchSection 
          searchQuery={searchQuery}
          activeTab={activeTab}
          dateRange={dateRange}
          showDateFilter={showDateFilter}
          setShowDateFilter={setShowDateFilter}
          handleDateRangeChange={handleDateRangeChange}
          vibeFilter={vibeFilter}
          setVibeFilter={setVibeFilter}
          handleSearch={handleSearch}
          handleTabChange={handleTabChange}
          isDetectingLocation={isDetectingLocation}
          searchedCity={searchedCity}
          searchedState={searchedState}
          isNaturalLanguageSearch={isNaturalLanguageSearch}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ExploreContent
              activeTab={activeTab}
              searchCategory={searchCategory}
              filteredLocations={filteredLocations}
              musicEvents={musicEvents}
              comedyEvents={comedyEvents}
              nightlifeVenues={nightlifeVenues}
              searchedCity={searchedCity}
              dateRange={dateRange}
              locationTags={locationTags}
              hasRealData={hasRealData}
              realDataResults={realDataResults}
              isLoadingResults={isLoadingResults}
            />
          </div>
          
          <div className="md:col-span-1">
            <ExploreSidebar
              filteredLocations={filteredLocations}
              hasRealData={hasRealData}
              realDataResults={realDataResults}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// Import needed things
import { useEffect } from "react";
import { mockLocations } from "@/mock/data";
import { getAdditionalTags } from "@/utils/explore/exploreHelpers";

export default Explore;
