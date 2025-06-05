
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock } from "lucide-react";
import { GooglePlacesSearchService } from '@/services/GooglePlacesSearchService';
import { Location } from '@/types';

interface EnhancedSearchVibesProps {
  onSearch: (query: string, filterType: string, category: string) => void;
  onRealPlaceSelect?: (location: Location) => void;
}

const EnhancedSearchVibes: React.FC<EnhancedSearchVibesProps> = ({ 
  onSearch,
  onRealPlaceSelect 
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length > 2 && GooglePlacesSearchService.isSpecificPlaceQuery(query)) {
        setIsSearching(true);
        try {
          const places = await GooglePlacesSearchService.searchPlaces(query);
          setSuggestions(places.slice(0, 5)); // Limit to 5 suggestions
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error searching places:', error);
          setSuggestions([]);
        }
        setIsSearching(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, "all", "places");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (place: Location) => {
    setQuery(place.name);
    setShowSuggestions(false);
    onRealPlaceSelect?.(place);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for places, venues, or vibes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
        <Button onClick={handleSearch} className="bg-gradient-vibe">
          Search
        </Button>
      </div>

      {/* Real Places Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2 text-xs text-muted-foreground border-b">
            Real Places
          </div>
          {suggestions.map((place) => (
            <div
              key={place.id}
              className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
              onClick={() => handleSuggestionClick(place)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{place.name}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{place.city}, {place.state}</span>
                  </div>
                  {place.rating && (
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{place.rating}</span>
                    </div>
                  )}
                </div>
                <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {place.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchVibes;
