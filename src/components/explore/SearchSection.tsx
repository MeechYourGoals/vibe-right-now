import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, X, CalendarRange, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchCategory: string;
  setSearchCategory: (category: string) => void;
  searchedCity: string;
  setSearchedCity: (city: string) => void;
  handleSearch: (query: string, filterType: string, category: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  showDateFilter: boolean;
  setShowDateFilter: (show: boolean) => void;
  handleDateRangeChange: (range: DateRange | undefined) => void;
  vibeFilter: string;
  setVibeFilter: (vibe: string) => void;
}

const SearchSection = ({
  searchQuery,
  setSearchQuery,
  searchCategory,
  setSearchCategory,
  searchedCity,
  setSearchedCity,
  handleSearch,
  dateRange,
  setDateRange,
  showDateFilter,
  setShowDateFilter,
  handleDateRangeChange,
  vibeFilter,
  setVibeFilter
}: SearchSectionProps) => {
  const { toast } = useToast();

  const toggleDateFilter = () => {
    setShowDateFilter(!showDateFilter);
    if (!showDateFilter && !dateRange) {
      const today = new Date();
      const validDateRange: DateRange = { 
        from: today, 
        to: addMonths(today, 1) 
      };
      setDateRange(validDateRange);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      {/* Search Input Section */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for vibes, locations, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-20 py-3 rounded-full bg-background border-input shadow-sm focus:ring-primary focus:border-primary"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-muted-foreground"
          >
            <option value="All">All</option>
            <option value="Restaurant">Restaurants</option>
            <option value="Bar">Bars</option>
            <option value="Event">Events</option>
            <option value="Attraction">Attractions</option>
          </select>
          <Button
            size="sm"
            className="rounded-full h-9 px-4"
            onClick={() => handleSearch(searchQuery, "All", searchCategory)}
          >
            Go
          </Button>
        </div>
      </div>
      
      {/* Date Filter Toggle */}
      <div className="flex justify-center mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className={`${showDateFilter ? "border-primary" : "border-input"}`}
          onClick={toggleDateFilter}
        >
          <CalendarRange className="h-4 w-4 mr-2" />
          {showDateFilter ? "Hide Date Filter" : "Filter by Date"}
        </Button>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 justify-center mt-3">
        {vibeFilter && (
          <Badge className="bg-indigo-800 dark:bg-indigo-900 text-white px-3 py-1 text-sm flex items-center">
            <Sparkles className="h-4 w-4 mr-1 text-amber-300" />
            Vibe: {vibeFilter}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-2 rounded-full text-white hover:bg-indigo-700" 
              onClick={() => {
                setVibeFilter("");
                handleSearch(searchQuery, "All", searchCategory);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {searchedCity && (
          <Badge className="bg-green-600 dark:bg-green-700 text-white px-3 py-1 text-sm flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {searchedCity}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 ml-2 rounded-full text-white hover:bg-green-500" 
              onClick={() => {
                setSearchedCity("");
                handleSearch(searchQuery, "All", searchCategory);
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default SearchSection;
