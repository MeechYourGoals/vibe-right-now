
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { mockLocations } from "@/mock/data";
import { Location } from "@/types";
import { EventItem } from "@/components/venue/events/types";

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

  // UI states
  const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showDateFilter, setShowDateFilter] = useState<boolean>(false);

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
    
    // UI states
    isLoadingResults,
    setIsLoadingResults,
    dateRange,
    setDateRange,
    showDateFilter,
    setShowDateFilter,
  };
};
