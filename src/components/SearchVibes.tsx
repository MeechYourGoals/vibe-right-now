import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map, X, ChevronDown, User, Building, Sparkles } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { mockUsers } from "@/mock/users";
import { mockLocations } from "@/mock/locations";
import UserSuggestions from "./search/UserSuggestions";
import PlaceSuggestions from "./search/PlaceSuggestions";
import VibeSuggestions from "./search/VibeSuggestions";
import SearchFilters from "./search/SearchFilters";
import { vibeTags } from "@/hooks/useVibeFilters";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cityCoordinates } from "@/utils/cityLocations";
import { Badge } from "@/components/ui/badge";

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

  const navigate = useNavigate();
  const { toast } = useToast();

  const suggestedUsers = mockUsers.slice(0, 5);
  const filters = [
    "Restaurants", "Bars", "Sports", "Events", "Attractions",
    "Outdoor Vibes", "Happening Tonight", "Free Events", "Ticketed Events"
  ];
  
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
  }, [location.search]);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const vibe = params.get('vibe');
    if (vibe) {
      setSearchQuery(vibe);
      setSearchCategory("vibes");
    }
  }, [location.search]);

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
          {nlpAnalysis && nlpAnalysis.entities && nlpAnalysis.entities.length > 0 && (
            <div className="mt-1">
              <div className="flex flex-wrap gap-1 mt-1">
                {nlpAnalysis.entities.slice(0, 5).map((entity: any, index: number) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-primary/5 text-primary/70 border-primary/20 text-xs"
                  >
                    {entity.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Tabs value={searchCategory} onValueChange={handleCategoryChange} className="w-full mb-3">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all" className="flex items-center gap-1">
            <Search className="h-3.5 w-3.5" />
            <span>All</span>
          </TabsTrigger>
          <TabsTrigger value="places" className="flex items-center gap-1">
            <Building className="h-3.5 w-3.5" />
            <span>Places</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="vibes" className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Vibes</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

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

      <UserSuggestions 
        showSuggestions={showUserSuggestions && searchCategory === "users"}
        searchQuery={searchQuery}
        suggestedUsers={suggestedUsers}
        onUserSelect={handleUserSelect}
      />

      <PlaceSuggestions
        showSuggestions={showPlaceSuggestions && searchCategory === "places"}
        premiumPlaces={premiumPlaces}
        onPlaceSelect={handlePlaceSelect}
      />

      <VibeSuggestions
        showSuggestions={showVibeSuggestions && searchCategory === "vibes"}
        vibeSuggestions={vibeTags}
        onVibeSelect={handleVibeSelect}
      />

      <SearchFilters 
        showFilters={showFilters}
        activeFilters={activeFilters}
        filters={filters}
        onToggleFilter={toggleFilter}
        onClearFilters={clearFilters}
      />
    </div>
  );
};

export default SearchVibes;
