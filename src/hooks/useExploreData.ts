
import { useState, createContext, useContext } from "react";
import { DateRange } from "react-day-picker";
import { Location } from "@/types";
import { EventItem } from "@/components/venue/events/types";
import { mockLocations } from "@/mock/data";

interface ExploreDataContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchedCity: string;
  setSearchedCity: (city: string) => void;
  searchedState: string;
  setSearchedState: (state: string) => void;
  searchCategory: string;
  setSearchCategory: (category: string) => void;
  filteredLocations: Location[];
  setFilteredLocations: (locations: Location[]) => void;
  locationTags: Record<string, string[]>;
  setLocationTags: (tags: Record<string, string[]>) => void;
  musicEvents: EventItem[];
  setMusicEvents: (events: EventItem[]) => void;
  comedyEvents: EventItem[];
  setComedyEvents: (events: EventItem[]) => void;
  nightlifeVenues: Location[];
  setNightlifeVenues: (venues: Location[]) => void;
  vibeFilter: string;
  setVibeFilter: (vibe: string) => void;
  isNaturalLanguageSearch: boolean;
  setIsNaturalLanguageSearch: (value: boolean) => void;
  searchCategories: string[];
  setSearchCategories: (categories: string[]) => void;
  isLoadingResults: boolean;
  setIsLoadingResults: (loading: boolean) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  showDateFilter: boolean;
  setShowDateFilter: (show: boolean) => void;
  realDataResults: Location[];
  setRealDataResults: (results: Location[]) => void;
  hasRealData: boolean;
  isDetectingLocation: boolean;
  setIsDetectingLocation: (detecting: boolean) => void;
}

const ExploreDataContext = createContext<ExploreDataContextType | undefined>(undefined);

export const useExploreData = (): ExploreDataContextType => {
  const context = useContext(ExploreDataContext);
  
  if (!context) {
    // Create a standalone context if not provided from provider
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>("all");
    const [searchedCity, setSearchedCity] = useState<string>("");
    const [searchedState, setSearchedState] = useState<string>("");
    const [searchCategory, setSearchCategory] = useState<string>("places");
    const [filteredLocations, setFilteredLocations] = useState<Location[]>(mockLocations.slice(0, 12));
    const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
    const [musicEvents, setMusicEvents] = useState<EventItem[]>([]);
    const [comedyEvents, setComedyEvents] = useState<EventItem[]>([]);
    const [nightlifeVenues, setNightlifeVenues] = useState<Location[]>([]);
    const [vibeFilter, setVibeFilter] = useState<string>("");
    const [isNaturalLanguageSearch, setIsNaturalLanguageSearch] = useState<boolean>(false);
    const [searchCategories, setSearchCategories] = useState<string[]>([]);
    const [isLoadingResults, setIsLoadingResults] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [showDateFilter, setShowDateFilter] = useState<boolean>(false);
    const [realDataResults, setRealDataResults] = useState<Location[]>([]);
    const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
    
    return {
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
      vibeFilter,
      setVibeFilter,
      isNaturalLanguageSearch,
      setIsNaturalLanguageSearch,
      searchCategories,
      setSearchCategories,
      isLoadingResults,
      setIsLoadingResults,
      dateRange,
      setDateRange,
      showDateFilter,
      setShowDateFilter,
      realDataResults,
      setRealDataResults,
      hasRealData: realDataResults.length > 0,
      isDetectingLocation,
      setIsDetectingLocation
    };
  }
  
  return context;
};

export default useExploreData;
