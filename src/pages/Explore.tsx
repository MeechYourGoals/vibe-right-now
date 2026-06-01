
import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
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
import { locationsRepo } from "@/services/data";

const Explore = () => {
  const isMobile = useIsMobile();
  const { city: cityParam } = useParams<{ city?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(cityParam ?? "");

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

  // When arriving on /explore/:city, load that city's venues onto the map from the
  // data layer (Supabase with mock fallback) so the page is populated immediately.
  useEffect(() => {
    if (!cityParam) return;
    let cancelled = false;
    setLocation(cityParam);
    locationsRepo
      .byCity(cityParam)
      .then((results) => {
        if (cancelled) return;
        const withCoords = results.filter((l) => l.lat && l.lng);
        if (withCoords.length > 0) {
          updateRealPlaces(withCoords);
          updateMapCenter(withCoords[0]);
        }
      })
      .catch((err) => console.error("Error loading city venues:", err));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityParam]);

  const handlePlaceSelect = useCallback((place: Location) => {
    if (place.lat && place.lng) {
      updateMapCenter(place);

      if (place.type === 'city') {
        const cityName = place.name || '';
        setLocation(cityName);
        // Populate venues for the selected city from the data layer.
        locationsRepo
          .byCity(cityName)
          .then((results) => {
            const withCoords = results.filter((l) => l.lat && l.lng);
            if (withCoords.length > 0) updateRealPlaces(withCoords);
          })
          .catch((err) => console.error("Error loading city venues:", err));
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

  // Natural-language / free-text search. Routes through locationsRepo.search which tries
  // the google-places edge function first and transparently falls back to mock venues.
  const handleSmartSearch = useCallback(async (query: string) => {
    const q = query.trim();
    if (!q) return;
    try {
      const results = await locationsRepo.search(q);
      const withCoords = results.filter((l) => l.lat && l.lng);
      if (withCoords.length > 0) {
        updateRealPlaces(withCoords);
        updateMapCenter(withCoords[0]);
        zoomToPlace(withCoords[0]);
        toast.success(`Found ${results.length} place${results.length === 1 ? "" : "s"} for "${q}"`);
      } else {
        toast(`No mappable results for "${q}"`);
      }
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Search failed. Please try again.");
    }
  }, [updateRealPlaces, updateMapCenter, zoomToPlace]);

  const getDisplayTitle = () => {
    if (isNaturalLanguageSearch) {
      return "Smart Search Results";
    } else if (searchedCity && searchedCity.trim() !== "") {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    } else if (cityParam) {
      return `Explore Vibes in ${cityParam}`;
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
            onSearchSubmit={handleSmartSearch}
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
              searchedCity={searchedCity || cityParam || ""}
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
