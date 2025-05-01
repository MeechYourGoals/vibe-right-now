
import React from "react";
import SearchVibes from "@/components/SearchVibes";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";

interface SearchSectionProps {
  searchQuery: string;
  activeTab: string;
  dateRange: DateRange | undefined;
  showDateFilter: boolean;
  setShowDateFilter: (show: boolean) => void;
  handleDateRangeChange: (range: DateRange | undefined) => void;
  vibeFilter: string;
  setVibeFilter: (vibe: string) => void;
  handleSearch: (query: string, filterType: string, category: string) => void;
  handleTabChange: (value: string) => void;
  isDetectingLocation: boolean;
  searchedCity: string;
  searchedState: string;
  isNaturalLanguageSearch: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  activeTab,
  dateRange,
  showDateFilter,
  setShowDateFilter,
  handleDateRangeChange,
  vibeFilter,
  setVibeFilter,
  handleSearch,
  handleTabChange,
  isDetectingLocation,
  searchedCity,
  searchedState,
  isNaturalLanguageSearch,
}) => {
  const getPageTitle = () => {
    if (isDetectingLocation) {
      return "Detecting your location...";
    } else if (isNaturalLanguageSearch) {
      return "Smart Search Results";
    } else if (searchedCity) {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    }
    return "Explore Vibes";
  };

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-center mb-6 vibe-gradient-text">
        {getPageTitle()}
      </h1>
      
      <div className="max-w-xl mx-auto mb-6">
        <SearchVibes onSearch={handleSearch} />
      </div>
      
      <ExploreFilters
        dateRange={dateRange}
        showDateFilter={showDateFilter}
        setShowDateFilter={setShowDateFilter}
        handleDateRangeChange={handleDateRangeChange}
        vibeFilter={vibeFilter}
        setVibeFilter={setVibeFilter}
      />
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="max-w-2xl mx-auto">
        <TabsList className="grid grid-cols-2 md:grid-cols-10">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
          <TabsTrigger value="bar">Bars</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="attraction">Attractions</TabsTrigger>
          <TabsTrigger value="sports">Sports</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="comedy">Comedy</TabsTrigger>
          <TabsTrigger value="nightlife">Nightlife</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SearchSection;
