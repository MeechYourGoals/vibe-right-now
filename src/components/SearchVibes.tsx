
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, ChevronDown } from "lucide-react";
import { mockUsers } from "@/mock/users";
import { mockLocations } from "@/mock/locations";
import { Collapsible, CollapsibleContent } from "./ui/collapsible";
import { cityCoordinates } from "@/utils/cityLocations";
import { supabase } from "@/integrations/supabase/client";
import { fuzzyMatch } from "@/utils/searchUtils";
import SearchCategoryTabs from "./search/SearchCategoryTabs";
import SearchSuggestions from "./search/SearchSuggestions";
import SearchFilters from "./search/SearchFilters";
import { toast } from "sonner";
import { Location } from "@/types";

interface SearchVibesProps {
  onSearch: (query: string, filterType: string, category: string) => void;
}

const SearchVibes = ({ onSearch }: SearchVibesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchCategory, setSearchCategory] = useState("all");
  const [showUserSuggestions, setShowUserSuggestions] = useState(false);
  const [showPlaceSuggestions, setShowPlaceSuggestions] = useState(false);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showVibeSuggestions, setShowVibeSuggestions] = useState(false);
  const [vibeSuggestions, setVibeSuggestions] = useState<string[]>([
    "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
    "Upscale", "Casual", "Romantic", "Lively", "Intimate"
  ]);
  const [isNaturalLanguageSearch, setIsNaturalLanguageSearch] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const filters = [
    "Restaurants", "Bars", "Sports", "Events", "Attractions",
    "Outdoor Vibes", "Happening Tonight", "Free Events", "Ticketed Events"
  ];

  const suggestedUsers = mockUsers.slice(0, 5);
  const premiumPlaces = mockLocations
    .filter(location => location.verified)
    .slice(0, 5)
    .map(location => ({
      ...location,
      isPremium: Math.random() > 0.4
    }));

  const allCities = Object.values(cityCoordinates).map(city => 
    `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country}`
  );

  const handleSearch = async () => {
    if (searchQuery.length > 50 && 
      /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(searchQuery)) {
      setIsNaturalLanguageSearch(true);
      setIsAnalyzing(true);

      try {
        const { data, error } = await supabase.functions.invoke('google-nlp', {
          body: { text: searchQuery }
        });
        
        if (error) {
          console.error('Error calling NLP API:', error);
          toast.error("Error analyzing search query");
        } else if (data && data.entities) {
          const extractedCategories = new Set<string>();
          data.entities.forEach((entity: any) => {
            if (entity.type) {
              const entityType = entity.type.toLowerCase();
              if (['location', 'event', 'organization', 'consumer_good'].includes(entityType)) {
                extractedCategories.add(entityType);
              }
            }
          });
          
          if (extractedCategories.size > 0) {
            const newFilters = Array.from(extractedCategories).map((cat: string) => {
              const categoryMap: Record<string, string> = {
                'location': 'attractions',
                'event': 'events',
                'organization': 'other',
                'consumer_good': 'other'
              };
              return categoryMap[cat] || cat;
            });
            
            setActiveFilters(prev => [...new Set([...prev, ...newFilters])]);
          }
        }
      } catch (e) {
        console.error('Error analyzing with Cloud Natural Language API:', e);
        toast.error("Error processing natural language search");
      } finally {
        setIsAnalyzing(false);
      }
    }
    
    onSearch(searchQuery, selectedFilter, searchCategory);
    setShowUserSuggestions(false);
    setShowPlaceSuggestions(false);
    setShowVibeSuggestions(false);
  };

  const handleCategoryChange = (category: string) => {
    setSearchCategory(category);
    onSearch(searchQuery, selectedFilter, category);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (isNaturalLanguageSearch && value !== searchQuery) {
      setIsNaturalLanguageSearch(false);
    }
    
    if (searchCategory === 'places') {
      const matchedCities = allCities
        .filter(city => fuzzyMatch(value, city) > 0.3)
        .slice(0, 5);
      
      setCitySuggestions(matchedCities);
      setShowCitySuggestions(matchedCities.length > 0);
    } else if (searchCategory === 'vibes') {
      const matchedVibes = vibeSuggestions
        .filter(vibe => fuzzyMatch(value, vibe) > 0.3);
      
      setVibeSuggestions(matchedVibes.length > 0 ? matchedVibes : [
        "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
        "Upscale", "Casual", "Romantic", "Lively", "Intimate"
      ]);
      setShowVibeSuggestions(true);
    }
  };

  const handleInputClick = () => {
    if (searchCategory === "users") {
      setShowUserSuggestions(true);
    } else if (searchCategory === "places") {
      setShowPlaceSuggestions(true);
    } else if (searchCategory === "vibes") {
      setShowVibeSuggestions(true);
    }
  };

  const handleUserSelect = (username: string) => {
    setSearchQuery(username);
    setShowUserSuggestions(false);
    navigate(`/user/${username}`);
  };

  const handlePlaceSelect = (placeName: string) => {
    setSearchQuery(placeName);
    setShowPlaceSuggestions(false);
    onSearch(placeName, selectedFilter, searchCategory);
  };
  
  const handleVibeSelect = (vibe: string) => {
    setSearchQuery(vibe);
    setShowVibeSuggestions(false);
    onSearch(vibe, selectedFilter, "vibes");
  };
  
  const handleCitySelect = (city: string) => {
    setSearchQuery(city);
    setCitySuggestions([]);
    setShowCitySuggestions(false);
    onSearch(city, selectedFilter, searchCategory);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="space-y-3 sticky top-16 z-10 bg-background p-4">
      {isNaturalLanguageSearch && (
        <div className="mb-2 p-3 bg-primary/10 rounded-md">
          <h3 className="text-sm font-medium flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-primary" />
            {isAnalyzing ? "Analyzing with Google Cloud Natural Language API..." : "Smart Search"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {isAnalyzing 
              ? "Identifying key entities and categories in your query..."
              : "Showing diverse results for your natural language search"}
          </p>
        </div>
      )}

      <SearchCategoryTabs 
        searchCategory={searchCategory}
        handleCategoryChange={handleCategoryChange}
      />

      <div className="relative flex">
        <Input
          type="search"
          placeholder={
            searchCategory === "users" 
              ? "Search users by name or username..." 
              : searchCategory === "places"
                ? isNaturalLanguageSearch 
                  ? "Try natural language: 'Upscale restaurants in Chicago for a family lunch...'" 
                  : "Search cities, venues, events or use natural language..."
                : searchCategory === "vibes"
                  ? "Search for vibes like Cozy, Trendy, NightOwl..."
                  : "Search venues, events, vibes, users or use natural language..."
          }
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onClick={handleInputClick}
          className="pr-20"
        />
        <div className="absolute right-0 top-0 flex h-full">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            className="h-full rounded-none"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button 
            variant={isAnalyzing ? "secondary" : "ghost"}
            size="icon" 
            onClick={handleSearch}
            disabled={isAnalyzing}
            className="h-full rounded-none rounded-r-md"
          >
            {isAnalyzing ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <Collapsible open={showUserSuggestions || showPlaceSuggestions || showVibeSuggestions || showCitySuggestions}>
        <CollapsibleContent className="overflow-hidden">
          <SearchSuggestions
            searchCategory={searchCategory}
            showUserSuggestions={showUserSuggestions}
            showPlaceSuggestions={showPlaceSuggestions}
            showVibeSuggestions={showVibeSuggestions}
            showCitySuggestions={showCitySuggestions}
            suggestedUsers={suggestedUsers}
            premiumPlaces={premiumPlaces as Location[]}
            citySuggestions={citySuggestions}
            vibeSuggestions={vibeSuggestions}
            searchQuery={searchQuery}
            handleUserSelect={handleUserSelect}
            handlePlaceSelect={handlePlaceSelect}
            handleVibeSelect={handleVibeSelect}
            handleCitySelect={handleCitySelect}
          />
        </CollapsibleContent>
      </Collapsible>

      <SearchFilters
        showFilters={showFilters}
        activeFilters={activeFilters}
        filters={filters}
        clearFilters={clearFilters}
        toggleFilter={toggleFilter}
      />
    </div>
  );
};

export default SearchVibes;
