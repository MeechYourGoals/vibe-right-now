import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import VenueCard from '@/components/VenueCard';
import { mockVenues } from '@/mock/venues';
import { mockPosts } from '@/mock/posts';
import SearchSection from '@/components/explore/SearchSection';
import CategoryFilter from '@/components/explore/CategoryFilter';
import LocationFilter from '@/components/explore/LocationFilter';
import { Location, Post } from '@/types';
import { DateRange as ReactDayPickerDateRange } from 'react-day-picker';

interface ExploreProps {}

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateRange, setDateRange] = useState<ReactDayPickerDateRange | undefined>();
  const [filteredData, setFilteredData] = useState<(Location | Post)[]>([]);
  const [viewType, setViewType] = useState<'venues' | 'posts'>('venues');

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, selectedLocation, dateRange, viewType]);

  const handleSearch = (query: string, filterType: string, category: string) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    applyFilters();
  };

  const applyFilters = () => {
    let combinedData: (Location | Post)[] = [...mockVenues, ...mockPosts];

    if (viewType === 'venues') {
      combinedData = mockVenues;
    } else {
      combinedData = mockPosts;
    }

    let filtered = combinedData.filter((item) => {
      const searchTerm = searchQuery.toLowerCase();
      const categoryFilter = selectedCategory.toLowerCase();
      const locationFilter = selectedLocation.toLowerCase();

      const nameMatch = 'name' in item && item.name.toLowerCase().includes(searchTerm);
      const contentMatch = 'content' in item && item.content.toLowerCase().includes(searchTerm);
      const categoryMatch = categoryFilter === 'all' || ('type' in item && item.type.toLowerCase() === categoryFilter);
      const locationMatch = locationFilter === 'all' || ('city' in item && item.city.toLowerCase() === locationFilter);

      let dateMatch = true;
      if (dateRange?.from) {
        dateMatch = 'timestamp' in item && new Date(item.timestamp) >= dateRange.from;
        if (dateRange?.to) {
          dateMatch = dateMatch && new Date(item.timestamp) <= dateRange.to;
        }
      }

      return (nameMatch || contentMatch) && categoryMatch && locationMatch && dateMatch;
    });

    setFilteredData(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
  };

  const toggleDateFilter = () => {
    setShowDateFilter(!showDateFilter);
  };

  const handleDateRangeChange = (range: ReactDayPickerDateRange | undefined) => {
    setDateRange(range);
  };

  const clearDates = () => {
    setDateRange(undefined);
  };

  const toggleViewType = (type: 'venues' | 'posts') => {
    setViewType(type);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Explore</h1>

        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={() => toggleViewType('venues')} active={viewType === 'venues'}>
            Venues
          </Button>
          <Button variant="outline" onClick={() => toggleViewType('posts')} active={viewType === 'posts'}>
            Posts
          </Button>
        </div>
        
        <SearchSection
          showDateFilter={showDateFilter}
          dateRange={dateRange}
          onSearch={handleSearch}
          onDateRangeChange={handleDateRangeChange}
          onClearDates={clearDates}
        />

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Filters</h2>
          <Button variant="ghost" size="sm" onClick={toggleDateFilter}>
            <Calendar className="h-4 w-4 mr-2" />
            {showDateFilter ? 'Hide Dates' : 'Show Dates'}
          </Button>
        </div>

        <div className="flex space-x-4 mb-6">
          <CategoryFilter onCategoryChange={handleCategoryChange} />
          <LocationFilter onLocationChange={handleLocationChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item) => (
            'name' in item ? (
              <VenueCard key={item.id} venue={item} />
            ) : (
              <Card key={item.id}>
                <CardContent>
                  {item.content}
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
