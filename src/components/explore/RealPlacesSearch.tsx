
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Star, Clock, ExternalLink, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types";
import { toast } from "sonner";

interface RealPlacesSearchProps {
  onLocationFound?: (location: Location) => void;
  onCenterMap?: (location: Location) => void;
}

const RealPlacesSearch: React.FC<RealPlacesSearchProps> = ({ 
  onLocationFound, 
  onCenterMap 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  // Initialize Google Places services
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      
      // Create a dummy map element for PlacesService
      const mapDiv = document.createElement('div');
      const map = new google.maps.Map(mapDiv);
      placesService.current = new google.maps.places.PlacesService(map);
    }
  }, []);

  // Get initial query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
      handleSearch(q);
    }
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim() || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (!autocompleteService.current) {
      toast.error("Google Maps not loaded yet. Please try again.");
      return;
    }

    setIsSearching(true);
    
    try {
      const request = {
        input: query,
        types: ['establishment'],
        fields: ['place_id', 'name', 'formatted_address', 'geometry', 'types', 'rating']
      };

      autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          // Get detailed info for each prediction
          const detailPromises = predictions.slice(0, 5).map(prediction => 
            getPlaceDetails(prediction.place_id)
          );
          
          Promise.all(detailPromises).then(locations => {
            const validLocations = locations.filter(loc => loc !== null) as Location[];
            setSuggestions(validLocations);
            setShowSuggestions(validLocations.length > 0);
          });
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
        setIsSearching(false);
      });
    } catch (error) {
      console.error('Error searching places:', error);
      setIsSearching(false);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const getPlaceDetails = (placeId: string): Promise<Location | null> => {
    return new Promise((resolve) => {
      if (!placesService.current) {
        resolve(null);
        return;
      }

      const request = {
        placeId,
        fields: ['place_id', 'name', 'formatted_address', 'geometry', 'types', 'rating', 'opening_hours', 'photos']
      };

      placesService.current.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const location: Location = {
            id: place.place_id!,
            name: place.name!,
            address: place.formatted_address!,
            city: extractCityFromAddress(place.formatted_address!),
            state: extractStateFromAddress(place.formatted_address!),
            country: 'USA',
            lat: place.geometry!.location!.lat(),
            lng: place.geometry!.location!.lng(),
            type: determineVenueType(place.types || []),
            verified: true,
            rating: place.rating,
            description: `Real venue found via Google Places`,
            tags: ['Google Places', 'Real Venue']
          };
          resolve(location);
        } else {
          resolve(null);
        }
      });
    });
  };

  const extractCityFromAddress = (address: string): string => {
    const parts = address.split(', ');
    return parts[parts.length - 3] || '';
  };

  const extractStateFromAddress = (address: string): string => {
    const parts = address.split(', ');
    const stateZip = parts[parts.length - 2] || '';
    return stateZip.split(' ')[0] || '';
  };

  const determineVenueType = (types: string[]): Location['type'] => {
    const typeMap: Record<string, Location['type']> = {
      'restaurant': 'restaurant',
      'food': 'restaurant',
      'meal_takeaway': 'restaurant',
      'cafe': 'restaurant',
      'bar': 'bar',
      'night_club': 'bar',
      'stadium': 'sports',
      'gym': 'sports',
      'museum': 'attraction',
      'tourist_attraction': 'attraction',
      'movie_theater': 'event'
    };

    for (const type of types) {
      if (typeMap[type]) {
        return typeMap[type];
      }
    }
    return 'other';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleSuggestionClick = (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery(location.name);
    setShowSuggestions(false);
    
    // Center the map on this location
    if (onCenterMap) {
      onCenterMap(location);
    }
    
    // Notify parent component
    if (onLocationFound) {
      onLocationFound(location);
    }
    
    toast.success(`Found ${location.name}! View it on the map below.`);
  };

  const handleGetDirections = (location: Location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleViewOnMaps = (location: Location) => {
    const url = `https://www.google.com/maps/place/?q=place_id:${location.id}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for real venues (e.g., SoFi Stadium, House of Blues)..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
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

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 bg-background border shadow-lg">
          <div className="p-2">
            <div className="flex items-center gap-2 px-2 py-1 mb-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <MapPin className="h-3 w-3 mr-1" />
                Real Places via Google
              </Badge>
            </div>
            
            {suggestions.map((place, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                onClick={() => handleSuggestionClick(place)}
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-100">
                  <MapPin className="h-5 w-5 text-green-600" />
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
                        
                        <Badge variant="secondary" className="text-xs">
                          {place.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1 ml-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirections(place);
                        }}
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Directions
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewOnMaps(place);
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-xs text-muted-foreground text-center pt-2 border-t">
              Click any venue to center it on the map below
            </div>
          </div>
        </Card>
      )}

      {selectedLocation && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm text-green-800">{selectedLocation.name}</h4>
              <p className="text-xs text-green-600">Centered on map below</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7"
                onClick={() => handleGetDirections(selectedLocation)}
              >
                <Navigation className="h-3 w-3 mr-1" />
                Directions
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7"
                onClick={() => handleViewOnMaps(selectedLocation)}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Google Maps
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealPlacesSearch;
