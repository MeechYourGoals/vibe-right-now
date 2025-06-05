
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, MapPin, Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEnhancedSearch } from "@/hooks/explore/useEnhancedSearch";
import { Location } from "@/types";

interface RealPlacesSearchProps {
  onRealPlaceFound?: (place: Location) => void;
}

const RealPlacesSearch: React.FC<RealPlacesSearchProps> = ({ onRealPlaceFound }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [realPlaceSuggestions, setRealPlaceSuggestions] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { searchWithRealPlaces } = useEnhancedSearch();

  useEffect(() => {
    // Get initial query from URL
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
      handleRealPlacesSearch(q);
    }
  }, []);

  const handleRealPlacesSearch = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setRealPlaceSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const { locations, isRealData } = await searchWithRealPlaces(query);
      
      if (isRealData && locations.length > 0) {
        setRealPlaceSuggestions(locations.slice(0, 5)); // Limit to 5 suggestions
        setShowSuggestions(true);
        
        if (onRealPlaceFound && locations[0]) {
          onRealPlaceFound(locations[0]);
        }
      } else {
        setRealPlaceSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error searching real places:', error);
      setRealPlaceSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Debounce the search
    const timeoutId = setTimeout(() => {
      handleRealPlacesSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handlePlaceClick = (place: Location) => {
    // Generate Google Maps URL
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`;
    
    // Generate Google Places URL (if we have place_id)
    const placesUrl = place.id.startsWith('ChIJ') 
      ? `https://www.google.com/maps/place/?q=place_id:${place.id}`
      : `https://www.google.com/search?q=${encodeURIComponent(place.name + ' ' + place.address)}`;
    
    // Open in new tab
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const getGooglePlacesUrl = (place: Location) => {
    return place.id.startsWith('ChIJ') 
      ? `https://www.google.com/maps/place/?q=place_id:${place.id}`
      : `https://www.google.com/search?q=${encodeURIComponent(place.name + ' ' + place.address)}`;
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for real venues (e.g., House of Blues Houston)..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => realPlaceSuggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          className="pr-12"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-0 h-full"
          disabled={isSearching}
        >
          {isSearching ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {showSuggestions && realPlaceSuggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 bg-background border shadow-lg">
          <div className="p-2">
            <div className="flex items-center gap-2 px-2 py-1 mb-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <MapPin className="h-3 w-3 mr-1" />
                Real Places via Google
              </Badge>
            </div>
            
            {realPlaceSuggestions.map((place, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                onClick={() => handlePlaceClick(place)}
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm truncate">{place.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{place.address}</p>
                      
                      <div className="flex items-center gap-3 mt-1">
                        {place.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-muted-foreground">{place.rating}</span>
                          </div>
                        )}
                        
                        {place.type && (
                          <Badge variant="secondary" className="text-xs">
                            {place.type}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1 ml-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`, '_blank');
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Maps
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(getGooglePlacesUrl(place), '_blank');
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Place
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-xs text-muted-foreground text-center pt-2 border-t">
              Click any venue to view on Google Maps
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RealPlacesSearch;
