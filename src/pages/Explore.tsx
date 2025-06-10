
import React from "react";
import Header from "@/components/Header";
import CameraButton from "@/components/CameraButton";
import useExploreState from "@/hooks/useExploreState";
import SearchSection from "@/components/explore/SearchSection";
import CategoryTabs from "@/components/explore/CategoryTabs";
import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreMap from "@/components/explore/ExploreMap";
import ExploreContent from "@/components/explore/ExploreContent";
import ExploreSidebar from "@/components/explore/ExploreSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

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

  // Create search query for map
  const getSearchQuery = () => {
    if (searchedCity && searchedCity.trim() !== "") {
      return searchedCity;
    }
    return "";
  };

  // Update the page title logic to handle empty cities
  const getDisplayTitle = () => {
    if (isNaturalLanguageSearch) {
      return "Smart Search Results";
    } else if (searchedCity && searchedCity.trim() !== "") {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    }
    return "Explore Vibes";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <ExploreHeader title={getDisplayTitle()} />
          
          <SearchSection 
            showDateFilter={showDateFilter}
            dateRange={dateRange}
            onSearch={handleSearch}
            onDateRangeChange={handleDateRangeChange}
            onClearDates={handleClearDates}
          />
          
          <ExploreMap 
            searchQuery={getSearchQuery()}
            filteredLocations={filteredLocations}
          />
          
          <CategoryTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
            <ExploreContent
              activeTab={activeTab}
              searchCategory={searchCategory}
              isLoadingResults={isLoadingResults}
              filteredLocations={filteredLocations}
              locationTags={locationTags}
              musicEvents={musicEvents}
              comedyEvents={comedyEvents}
              nightlifeVenues={nightlifeVenues}
              searchedCity={searchedCity || ""}
              dateRange={dateRange}
            />
          </div>
          
          <ExploreSidebar />
        </div>
      </main>
      
      <CameraButton />
    </div>
  );
};

export default Explore;
