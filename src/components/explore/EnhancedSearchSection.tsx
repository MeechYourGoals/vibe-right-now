
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Sparkles, TrendingUp, Filter } from "lucide-react";
import { Location, LocationType } from "@/types";
import { searchVenues, findCityByName } from "@/data/mockCities";

interface EnhancedSearchSectionProps {
  onLocationSelect: (location: Location) => void;
  onCitySearch?: (cityName: string) => void;
  currentCity?: string;
}

const EnhancedSearchSection = ({ 
  onLocationSelect, 
  onCitySearch,
  currentCity = "New York"
}: EnhancedSearchSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<LocationType[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const locationTypes: LocationType[] = [
    'restaurant', 'bar', 'nightclub', 'cafe', 'hotel', 
    'attraction', 'event', 'sports', 'comedy', 'music'
  ];

  const vibes = [
    "🔥 Hot Right Now", "✨ Trending", "🎵 Live Music", "🍸 Cocktails", 
    "🌮 Food", "🎉 Nightlife", "☕ Coffee", "🏨 Hotels"
  ];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchVenues(searchQuery, currentCity).slice(0, 5);
  }, [searchQuery, currentCity]);

  const toggleFilter = (type: LocationType) => {
    setSelectedFilters(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      onLocationSelect(searchResults[0]);
    } else if (onCitySearch) {
      onCitySearch(searchQuery);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Search */}
      <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Discover Your Next Vibe</h2>
              <p className="text-muted-foreground">Find venues, experiences, and moments in {currentCity}</p>
            </div>

            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search venues, vibes, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-12 text-lg"
              />
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((venue) => (
                    <button
                      key={venue.id}
                      onClick={() => onLocationSelect(venue)}
                      className="w-full px-4 py-3 text-left hover:bg-muted flex items-center space-x-3"
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{venue.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {venue.type === "city" ? `${venue.city}, ${venue.state || venue.country}` : `${venue.type} • ${venue.city}`}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </form>

            {/* Quick Filters */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-primary text-primary-foreground" : ""}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              {selectedFilters.map(filter => (
                <Badge 
                  key={filter}
                  variant="secondary" 
                  className="cursor-pointer"
                  onClick={() => toggleFilter(filter)}
                >
                  {filter} ×
                </Badge>
              ))}
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {locationTypes.map(type => (
                  <Button
                    key={type}
                    variant={selectedFilters.includes(type) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(type)}
                    className="capitalize"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trending Vibes */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Trending Vibes</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {vibes.map((vibe, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSearchQuery(vibe.split(' ').slice(1).join(' '))}
            >
              {vibe}
            </Badge>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">AI Recommendations</h3>
          </div>
          <p className="text-sm text-purple-700 mb-3">
            Based on the current vibe in {currentCity}, we recommend checking out:
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-purple-300 text-purple-700">
              Rooftop bars with live DJs
            </Badge>
            <Badge variant="outline" className="border-purple-300 text-purple-700">
              Late-night taco spots
            </Badge>
            <Badge variant="outline" className="border-purple-300 text-purple-700">
              Underground music venues
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSearchSection;
