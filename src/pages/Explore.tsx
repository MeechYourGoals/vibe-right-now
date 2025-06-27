
import React, { useState, useCallback } from "react";
import Header from "@/components/Header";
import CameraButton from "@/components/CameraButton";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import useExploreState from "@/hooks/useExploreState";
import ExploreSearchSection from "@/components/explore/ExploreSearchSection";
import ExploreContent from "@/components/explore/ExploreContent";
import ExploreSidebar from "@/components/explore/ExploreSidebar";
import { useMapSync } from "@/hooks/useMapSync";
import { Location } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

const Explore = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  
  const { mapState, updateMapCenter, updateRealPlaces, zoomToPlace } = useMapSync();
  
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

  const handlePlaceSelect = useCallback((place: Location) => {
    if (place.lat && place.lng) {
      updateMapCenter(place);

      if (place.type === 'city') {
        const cityName = place.name || '';
        setLocation(cityName);
        // Note: For now, we're not populating venues since we removed mock data
        // This will be updated when real venue data is integrated
      } else {
        updateRealPlaces([place]);
      }
      
      zoomToPlace(place);
    }
  }, [updateMapCenter, updateRealPlaces, setLocation, zoomToPlace]);

  const handleVenueSelect = useCallback((place: Location) => {
    if (place.lat && place.lng) {
      updateMapCenter(place);

      if (place.city && !location) {
        setLocation(place.city);
      }
      
      updateRealPlaces([place]);
      zoomToPlace(place);
    }
  }, [updateMapCenter, updateRealPlaces, location, setLocation, zoomToPlace]);

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
          <h1 className="text-3xl font-bold text-center mb-6 vibe-gradient-text">
            {getDisplayTitle()}
          </h1>
          
          <ExploreSearchSection 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            dateRange={dateRange ? { from: dateRange.from!, to: dateRange.to! } : null}
            onDateChange={(dates) => handleDateRangeChange(dates ? { from: dates.from, to: dates.to } : null)}
            location={location}
            onLocationChange={setLocation}
            onPlaceSelect={handlePlaceSelect}
            onVenueSelect={handleVenueSelect}
          />
          
          <div className="w-full mb-6">
            <NearbyVibesMap />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
            <ExploreContent
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isLoadingResults={isLoadingResults}
              searchCategory={searchCategory}
              musicEvents={musicEvents}
              comedyEvents={comedyEvents}
              nightlifeVenues={nightlifeVenues}
              filteredLocations={filteredLocations}
              locationTags={locationTags}
              searchedCity={searchedCity || ""}
              dateRange={dateRange}
            />
          </div>
          
          <ExploreSidebar isMobile={isMobile} />
        </div>
      </main>
      
      <CameraButton />
    </div>
  );
};

export default Explore;
