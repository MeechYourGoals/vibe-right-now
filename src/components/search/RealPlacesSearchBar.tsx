
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Star, ExternalLink, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { realPlacesSearchService } from "@/services/RealPlacesSearchService";
import { Location } from "@/types";

interface RealPlacesSearchBarProps {
  onPlaceSelect: (place: Location) => void;
  placeholder?: string;
}

const RealPlacesSearchBar: React.FC<RealPlacesSearchBarProps> = ({
  onPlaceSelect,
  placeholder = "Search for real places anywhere in the world..."
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    realPlacesSearchService.debouncedSearch(searchQuery, (results) => {
      setSearchResults(results);
      setShowResults(results.length > 0);
      setIsLoading(false);
      setSelectedIndex(-1);
    });
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showResults || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handlePlaceSelect(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handlePlaceSelect = (place: Location) => {
    setSearchQuery(place.name);
    setShowResults(false);
    setSelectedIndex(-1);
    onPlaceSelect(place);
  };

  const openGoogleMaps = (place: Location) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.id.replace('google_', '')}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
          className="pr-12 pl-4 py-3 text-base"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {showResults && searchResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto shadow-lg border">
          <div className="p-2">
            <div className="text-xs text-muted-foreground px-2 py-1 border-b mb-2">
              Real Places from Google Maps
            </div>
            {searchResults.map((place, index) => (
              <div
                key={place.id}
                className={`flex items-start gap-3 p-3 hover:bg-muted rounded-md cursor-pointer transition-colors ${
                  index === selectedIndex ? 'bg-muted' : ''
                }`}
                onClick={() => handlePlaceSelect(place)}
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary/10 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{place.name}</h4>
                    {place.verified && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1 truncate">
                    {place.address}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {place.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{place.rating}</span>
                      </div>
                    )}
                    {place.hours?.isOpenNow && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className={place.hours.isOpenNow === 'Open' ? 'text-green-600' : 'text-red-600'}>
                          {place.hours.isOpenNow}
                        </span>
                      </div>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    openGoogleMaps(place);
                  }}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default RealPlacesSearchBar;
