
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DateFilterSection from './DateFilterSection';

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDates: { from: Date; to: Date } | null;
  onDateChange: (dates: { from: Date; to: Date } | null) => void;
  location: string;
  onLocationChange: (location: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedDates,
  onDateChange,
  location,
  onLocationChange
}) => {
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
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Enter location..."
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="pl-10"
              />
            </div>
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
