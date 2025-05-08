
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
      
      <Tabs 
        defaultValue="all" 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="max-w-2xl mx-auto mt-4"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-10">
          <TabsTrigger value="all" className="cursor-pointer">All</TabsTrigger>
          <TabsTrigger value="restaurant" className="cursor-pointer">Restaurants</TabsTrigger>
          <TabsTrigger value="bar" className="cursor-pointer">Bars</TabsTrigger>
          <TabsTrigger value="event" className="cursor-pointer">Events</TabsTrigger>
          <TabsTrigger value="attraction" className="cursor-pointer">Attractions</TabsTrigger>
          <TabsTrigger value="sports" className="cursor-pointer">Sports</TabsTrigger>
          <TabsTrigger value="music" className="cursor-pointer">Music</TabsTrigger>
          <TabsTrigger value="comedy" className="cursor-pointer">Comedy</TabsTrigger>
          <TabsTrigger value="nightlife" className="cursor-pointer">Nightlife</TabsTrigger>
          <TabsTrigger value="other" className="cursor-pointer">Other</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SearchSection;
