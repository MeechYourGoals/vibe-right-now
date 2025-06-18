
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Search, Filter, X } from "lucide-react";
import { CityData } from "@/types";

interface EnhancedSearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: CityData | null;
  setSelectedCity: (city: CityData | null) => void;
  availableCities: CityData[];
  onSearch: () => void;
  vibeFilter: string;
  onClearVibeFilter: () => void;
}

const EnhancedSearchSection: React.FC<EnhancedSearchSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  availableCities,
  onSearch,
  vibeFilter,
  onClearVibeFilter
}) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const handleCitySelect = (city: CityData) => {
    setSelectedCity(city);
    setIsLocationOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search venues, vibes, or experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 text-lg"
          />
        </div>
        
        <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 px-4 min-w-0">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">
                {selectedCity ? `${selectedCity.name}, ${selectedCity.country}` : 'Location'}
              </span>
              <span className="sm:hidden">
                {selectedCity ? selectedCity.name : 'Location'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Select City</h4>
              <div className="grid gap-2 max-h-60 overflow-y-auto">
                {availableCities.map((city) => (
                  <Button
                    key={city.name}
                    variant="ghost"
                    className="justify-start"
                    onClick={() => handleCitySelect(city)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {city.name}, {city.country}
                  </Button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button onClick={onSearch} className="h-12 px-6">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {vibeFilter && (
        <div className="flex justify-center">
          <Badge variant="secondary" className="px-3 py-1">
            <Filter className="h-3 w-3 mr-1" />
            Vibe: {vibeFilter}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-2"
              onClick={onClearVibeFilter}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchSection;
