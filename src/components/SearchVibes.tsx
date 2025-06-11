import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Map, X, ChevronDown, User, Building, Calendar, MapPin, Star, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { mockUsers } from "@/mock/users";
import { mockLocations } from "@/mock/locations";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cityCoordinates } from "@/utils/cityLocations";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  }, [location.search]);

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

      {/* Updated Tab Design */}
      <div className="bg-muted/30 rounded-lg p-1 mb-3">
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              searchCategory === "all" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span>All</span>
          </button>
          <button
            onClick={() => handleCategoryChange("places")}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              searchCategory === "places" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Building className="h-3.5 w-3.5" />
            <span>Places</span>
          </button>
          <button
            onClick={() => handleCategoryChange("users")}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              searchCategory === "users" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>Users</span>
          </button>
          <button
            onClick={() => handleCategoryChange("vibes")}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              searchCategory === "vibes" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Vibes</span>
          </button>
        </div>
      </div>

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

      <Collapsible open={showCitySuggestions && searchCategory === "places"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">Suggested Cities</p>
              {citySuggestions.map((city, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-md bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{city}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={showUserSuggestions && searchCategory === "users"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">Suggested Users</p>
              {suggestedUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => handleUserSelect(user.username)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">@{user.username}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={showPlaceSuggestions && searchCategory === "places"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1 flex items-center">
                Featured Venues <Star className="h-3 w-3 text-amber-500 ml-1 fill-amber-500" />
              </p>
              {premiumPlaces.map((place) => (
                <div 
                  key={place.id} 
                  className={`flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer my-1 ${place.isPremium ? 'bg-amber-500/10 border border-amber-500/30' : ''}`}
                  onClick={() => handlePlaceSelect(place.name)}
                >
                  <div className={`h-8 w-8 flex items-center justify-center rounded-md ${place.isPremium ? 'bg-amber-500/20' : 'bg-primary/10'}`}>
                    <MapPin className={`h-4 w-4 ${place.isPremium ? 'text-amber-500' : 'text-primary'}`} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-medium flex items-center">
                      {place.name}
                      {place.isPremium && <Star className="h-3 w-3 text-amber-500 ml-1 fill-amber-500" />}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {place.city}, {place.state}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={showVibeSuggestions && searchCategory === "vibes"} className="w-full">
        <CollapsibleContent className="overflow-hidden">
          <Card className="mt-1 w-full p-2 shadow-md border border-border">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground px-2 py-1">Popular Vibes</p>
              <div className="flex flex-wrap gap-2 p-2">
                {vibeSuggestions.map((vibe, index) => (
                  <Badge 
                    key={index} 
                    className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer flex items-center"
                    onClick={() => handleVibeSelect(vibe)}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {vibe}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {showFilters && (
        <div className="bg-muted/20 p-3 rounded-md glass-effect">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Filter by</h4>
            {activeFilters.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                Clear all
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilters.includes(filter.toLowerCase()) ? "secondary" : "outline"}
                size="sm"
                onClick={() => toggleFilter(filter.toLowerCase())}
                className="h-7 text-xs"
              >
                {filter}
                {activeFilters.includes(filter.toLowerCase()) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Button>
            ))}
          </div>
          
          <div className="flex justify-between mt-3">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <Map className="h-3 w-3" /> 
              Near me
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs gap-1">
                  Sort by <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Sort options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Most Recent</DropdownMenuItem>
                  <DropdownMenuItem>Most Popular</DropdownMenuItem>
                  <DropdownMenuItem>Closest to Me</DropdownMenuItem>
                  <DropdownMenuItem>Happening Now</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchVibes;
