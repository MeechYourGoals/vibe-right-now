
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { mockLocations } from "@/mock/data";
import { Location } from "@/types";
import { EventItem } from "@/components/venue/events/types";
import { getCityStateFromCoordinates } from "@/utils/geocodingService";

export const useExploreData = () => {
  // Search and filtering states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [searchedState, setSearchedState] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("all");
  const [vibeFilter, setVibeFilter] = useState<string>("");
  const [isNaturalLanguageSearch, setIsNaturalLanguageSearch] = useState<boolean>(false);
  const [searchCategories, setSearchCategories] = useState<string[]>([]);
  
  // Data states
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(mockLocations);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  const [musicEvents, setMusicEvents] = useState<EventItem[]>([]);
  const [comedyEvents, setComedyEvents] = useState<EventItem[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<Location[]>([]);
  const [realDataResults, setRealDataResults] = useState<Location[]>([]);
  const [hasRealData, setHasRealData] = useState<boolean>(false);

  // User location states
  const [userCoordinates, setUserCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(true);
  const [locationDetectionError, setLocationDetectionError] = useState<string>("");

  // UI states
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showDateFilter, setShowDateFilter] = useState<boolean>(false);

  // Get user's geolocation on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      setIsDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserCoordinates(coords);
          
          try {
            // Get city and state from coordinates
            const { city, state } = await getCityStateFromCoordinates(coords.lat, coords.lng);
            
            if (city && !searchedCity) {
              setSearchedCity(city);
              setSearchedState(state || "");
            }
          } catch (error) {
            console.error("Error getting location name:", error);
            setLocationDetectionError("Could not determine your location");
            
            // Default to San Francisco if geolocation fails
            if (!searchedCity) {
              setSearchedCity("San Francisco");
              setSearchedState("CA");
            }
          }
          setIsDetectingLocation(false);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setLocationDetectionError(`Location detection error: ${error.message}`);
          setIsDetectingLocation(false);
          
          // Default to San Francisco if geolocation fails
          if (!searchedCity) {
            setSearchedCity("San Francisco");
            setSearchedState("CA");
          }
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationDetectionError("Geolocation is not supported by your browser");
      setIsDetectingLocation(false);
      
      // Default to San Francisco if geolocation not supported
      if (!searchedCity) {
        setSearchedCity("San Francisco");
        setSearchedState("CA");
      }
    }
  }, [searchedCity]);

  // Update hasRealData flag whenever realDataResults changes
  useEffect(() => {
    setHasRealData(realDataResults.length > 0);
  }, [realDataResults]);

  return {
    // Search and filtering states
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    searchedCity,
    setSearchedCity,
    searchedState,
    setSearchedState,
    searchCategory,
    setSearchCategory,
    vibeFilter,
    setVibeFilter,
    isNaturalLanguageSearch,
    setIsNaturalLanguageSearch,
    searchCategories,
    setSearchCategories,
    
    // Data states
    filteredLocations,
    setFilteredLocations,
    locationTags,
    setLocationTags,
    musicEvents,
    setMusicEvents,
    comedyEvents,
    setComedyEvents,
    nightlifeVenues,
    setNightlifeVenues,
    realDataResults,
    setRealDataResults,
    hasRealData,
    
    // User location states
    userCoordinates,
    isDetectingLocation,
    locationDetectionError,
    
    // UI states
    isLoadingResults,
    setIsLoadingResults,
    dateRange,
    setDateRange,
    showDateFilter,
    setShowDateFilter,
  };
};
