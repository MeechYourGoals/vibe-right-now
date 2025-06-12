
import React, { useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import DateFilterSection from './DateFilterSection';
import CityAutocompleteInput from './CityAutocompleteInput';
import { useVenueSearch } from '@/hooks/useVenueSearch';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDates: { from: Date; to: Date } | null;
  onDateChange: (dates: { from: Date; to: Date } | null) => void;
  location: string;
  onLocationChange: (location: string) => void;
  onVenuesFound?: (venues: any[]) => void;
  onCitySelected?: (city: string, placeId: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedDates,
  onDateChange,
  location,
  onLocationChange,
  onVenuesFound,
  onCitySelected
}) => {
  const { venues, isLoading, searchVenues } = useVenueSearch();

  // Trigger venue search when search query changes
  useEffect(() => {
    if (searchQuery && searchQuery.length > 2) {
      searchVenues(searchQuery, location);
    }
  }, [searchQuery, location]);

  // Pass found venues to parent
  useEffect(() => {
    if (onVenuesFound && venues.length > 0) {
      onVenuesFound(venues);
    }
  }, [venues, onVenuesFound]);

  const handleCitySelect = (city: string, placeId: string) => {
    onLocationChange(city);
    if (onCitySelected) {
      onCitySelected(city, placeId);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">What are you looking for?</h3>
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search venues, events, vibes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                </div>
              )}
            </div>
            
            <CityAutocompleteInput
              value={location}
              onChange={onLocationChange}
              onCitySelect={handleCitySelect}
              placeholder="Enter location..."
            />
          </div>
        </CardContent>
      </Card>

      <DateFilterSection
        selectedDates={selectedDates}
        onDateChange={onDateChange}
      />
    </div>
  );
};

export default SearchSection;
