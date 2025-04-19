
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { mockUsers } from "@/mock/users";
import { mockLocations } from "@/mock/locations";
import { cityCoordinates } from "@/utils/cityLocations";
import SearchCategoryTabs from "./search/SearchCategoryTabs";
import SearchInput from "./search/SearchInput";
import SmartSearchIndicator from "./search/SmartSearchIndicator";
import SearchSuggestions from "./search/SearchSuggestions";
import SearchFilters from "./search/SearchFilters";

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
  const [nlpAnalysis, setNlpAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const filters = [
    "Restaurants",
    "Bars",
    "Sports",
    "Events",
    "Attractions",
    "Outdoor Vibes",
    "Happening Tonight",
    "Free Events",
    "Ticketed Events"
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const vibe = params.get('vibe');
    
    if (q) {
      setSearchQuery(q);
      
      const isComplexQuery = q.length > 50 && 
        /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(q);
      
      setIsNaturalLanguageSearch(isComplexQuery);
      
      if (isComplexQuery) {
        try {
          const savedCategories = sessionStorage.getItem('lastSearchCategories');
          const savedQuery = sessionStorage.getItem('lastSearchQuery');
          
          if (savedCategories && savedQuery === q) {
            const parsedCategories = JSON.parse(savedCategories);
            if (parsedCategories && parsedCategories.length > 0) {
              setActiveFilters(parsedCategories);
              toast({
                title: "Smart Search Results",
                description: `Showing results for "${q.substring(0, 50)}${q.length > 50 ? '...' : ''}"`,
                duration: 5000,
              });
            }
          }
        } catch (e) {
          console.error('Error retrieving categories from sessionStorage:', e);
        }
      }
      
      setSearchCategory("places");
    }
    
    if (vibe) {
      setSearchQuery(vibe);
      setSearchCategory("vibes");
    }
  }, [location.search, toast]);

  useEffect(() => {
    if (searchCategory === "users") {
      setShowUserSuggestions(true);
      setShowPlaceSuggestions(false);
      setShowVibeSuggestions(false);
    } else if (searchCategory === "places") {
      setShowPlaceSuggestions(true);
      setShowUserSuggestions(false);
      setShowVibeSuggestions(false);
    } else if (searchCategory === "vibes") {
      setShowVibeSuggestions(true);
      setShowUserSuggestions(false);
      setShowPlaceSuggestions(false);
    } else {
      setShowUserSuggestions(false);
      setShowPlaceSuggestions(false);
      setShowVibeSuggestions(false);
    }
  }, [searchCategory]);

  useEffect(() => {
    try {
      const nlpCategories = sessionStorage.getItem('nlpCategories');
      if (nlpCategories) {
        const parsedCategories = JSON.parse(nlpCategories);
        if (parsedCategories && parsedCategories.length > 0) {
          setActiveFilters(prevFilters => {
            const newFilters = [...prevFilters];
            parsedCategories.forEach((category: string) => {
              const categoryMap: Record<string, string> = {
                'location': 'attractions',
                'event': 'events',
                'organization': 'other',
                'restaurant': 'restaurants',
                'bar': 'bars',
                'entertainment': 'events',
                'sports': 'sports'
              };
              
              const mappedCategory = categoryMap[category.toLowerCase()];
              if (mappedCategory && !newFilters.includes(mappedCategory)) {
                newFilters.push(mappedCategory);
              }
            });
            return newFilters;
          });
        }
      }
    } catch (e) {
      console.error('Error retrieving NLP categories from sessionStorage:', e);
    }
  }, [searchQuery]);

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
        } else if (data && data.entities) {
          setNlpAnalysis(data);
          
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
      } finally {
        setIsAnalyzing(false);
      }
    }
    
    onSearch(searchQuery, selectedFilter, searchCategory);
    setShowUserSuggestions(false);
    setShowPlaceSuggestions(false);
    setShowVibeSuggestions(false);
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  const handleCategoryChange = (category: string) => {
    setSearchCategory(category);
    onSearch(searchQuery, selectedFilter, category);
  };

  const handleUserSelect = (username: string) => {
    setSearchQuery(username);
    setShowUserSuggestions(false);
    onSearch(username, selectedFilter, searchCategory);
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
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (isNaturalLanguageSearch && value !== searchQuery) {
      setIsNaturalLanguageSearch(false);
    }
    
    if (searchCategory === 'places' && value.length > 1) {
      const filtered = allCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      
      setCitySuggestions(filtered);
      setShowCitySuggestions(filtered.length > 0);
    } else if (searchCategory === 'vibes' && value.length > 0) {
      const filtered = vibeSuggestions.filter(vibe => 
        vibe.toLowerCase().includes(value.toLowerCase())
      );
      
      setVibeSuggestions(filtered.length > 0 ? filtered : [
        "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
        "Upscale", "Casual", "Romantic", "Lively", "Intimate"
      ]);
      setShowVibeSuggestions(true);
    } else {
      setShowCitySuggestions(false);
    }
  };
  
  const handleCitySelect = (city: string) => {
    setSearchQuery(city);
    setCitySuggestions([]);
    setShowCitySuggestions(false);
    onSearch(city, selectedFilter, searchCategory);
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

  const getSearchPlaceholder = () => {
    if (searchCategory === "users") {
      return "Search users by name or username...";
    } else if (searchCategory === "places") {
      return isNaturalLanguageSearch
        ? "Try natural language: 'Upscale restaurants in Chicago for a family lunch...'"
        : "Search cities, venues, events or use natural language...";
    } else if (searchCategory === "vibes") {
      return "Search for vibes like Cozy, Trendy, NightOwl...";
    } else {
      return "Search venues, events, vibes, users or use natural language...";
    }
  };

  return (
    <div className="space-y-3 sticky top-16 z-10 bg-background p-4">
      <SmartSearchIndicator 
        isActive={isNaturalLanguageSearch}
        isAnalyzing={isAnalyzing}
        entities={nlpAnalysis?.entities}
      />

      <SearchCategoryTabs 
        value={searchCategory} 
        onChange={handleCategoryChange}
      />

      <SearchInput
        value={searchQuery}
        onChange={handleSearchInputChange}
        onSubmit={handleSearch}
        onFilterToggle={() => setShowFilters(!showFilters)}
        onClick={handleInputClick}
        placeholder={getSearchPlaceholder()}
        isAnalyzing={isAnalyzing}
      />

      <SearchSuggestions
        searchCategory={searchCategory}
        showUserSuggestions={showUserSuggestions}
        showPlaceSuggestions={showPlaceSuggestions}
        showCitySuggestions={showCitySuggestions}
        showVibeSuggestions={showVibeSuggestions}
        suggestedUsers={suggestedUsers}
        premiumPlaces={premiumPlaces}
        citySuggestions={citySuggestions}
        vibeSuggestions={vibeSuggestions}
        onUserSelect={handleUserSelect}
        onPlaceSelect={handlePlaceSelect}
        onCitySelect={handleCitySelect}
        onVibeSelect={handleVibeSelect}
      />

      <SearchFilters
        open={showFilters}
        filters={filters}
        activeFilters={activeFilters}
        toggleFilter={toggleFilter}
        clearFilters={clearFilters}
      />
    </div>
  );
};

export default SearchVibes;
