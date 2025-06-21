
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MapPin, Star, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Location } from '@/types';

interface ExploreSearchSectionProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const ExploreSearchSection: React.FC<ExploreSearchSectionProps> = ({
  locations,
  onLocationSelect,
  searchQuery,
  onSearchChange,
  selectedFilters,
  onFilterChange
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter and search logic
  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          location.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilters = selectedFilters.length === 0 || 
                           selectedFilters.includes(location.type) ||
                           (location.vibes && location.vibes.some(vibe => selectedFilters.includes(vibe)));
      
      return matchesSearch && matchesFilters;
    });
  }, [locations, searchQuery, selectedFilters]);

  const availableFilters = useMemo(() => {
    const filters = new Set<string>();
    locations.forEach(location => {
      filters.add(location.type);
      if (location.vibes) {
        location.vibes.forEach(vibe => filters.add(vibe));
      }
    });
    return Array.from(filters);
  }, [locations]);

  // Show suggestions when there's a search query
  useEffect(() => {
    setShowSuggestions(searchQuery.length > 0 && filteredLocations.length > 0);
  }, [searchQuery, filteredLocations]);

  const handleLocationClick = (location: Location) => {
    onLocationSelect({
      ...location,
      id: location.id || `loc-${Date.now()}` // Ensure id is present
    });
    setShowSuggestions(false);
    onSearchChange('');
  };

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      onFilterChange(selectedFilters.filter(f => f !== filter));
    } else {
      onFilterChange([...selectedFilters, filter]);
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search venues, bars, restaurants..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
          
          {/* Search Suggestions */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              {filteredLocations.slice(0, 5).map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location)}
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 border-b last:border-b-0"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>{location.address}</span>
                      {location.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                          <span>{location.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {location.type}
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={selectedFilters.length > 0 ? "border-primary" : ""}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
        </Button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {availableFilters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilters.includes(filter) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(filter)}
                className="text-xs"
              >
                {filter}
              </Button>
            ))}
          </div>
          
          {selectedFilters.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="text-xs">
                  {filter}
                  <button
                    onClick={() => toggleFilter(filter)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onFilterChange([])}
                className="text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreSearchSection;
