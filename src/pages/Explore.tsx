
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import SearchSection from "@/components/explore/SearchSection";
import CategoryTabs from "@/components/explore/CategoryTabs";
import RecommendedForYou from "@/components/explore/RecommendedForYou";
import UserNotFound from "@/components/explore/UserNotFound";
import NightlifeSection from "@/components/explore/NightlifeSection";
import MusicSection from "@/components/explore/MusicSection";
import ComedySection from "@/components/explore/ComedySection";
import { mockLocations } from '@/mock/locations';
import { DateRange } from "react-day-picker";
import { Location } from '@/types';
import { EventItem } from '@/components/venue/events/types';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'nightlife', label: 'Nightlife' },
  { id: 'music', label: 'Music' },
  { id: 'comedy', label: 'Comedy' },
];

// Helper function to convert Location to EventItem
const locationToEventItem = (location: Location): EventItem => ({
  id: location.id,
  title: location.name,
  date: new Date().toISOString().split('T')[0], // Default to today
  time: '20:00', // Default to 8 PM
  venue: location.address || location.name,
  location: `${location.city}, ${location.state || location.country}`,
  description: location.description || `Experience the vibes at ${location.name}`,
  price: location.priceRange ? `${location.priceRange}${location.priceRange}` : '$50',
  ticketsAvailable: Math.floor(Math.random() * 100) + 20,
  type: location.category === 'music_venue' ? 'music' : 
        location.category === 'comedy_club' ? 'comedy' : 'other',
  image: location.photos?.[0] || location.imageUrl
});

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleSearch = (query: string, filterType: string, category: string) => {
    setSearchQuery(query);
    setActiveCategory(category);
  };

  const nightlifeVenues = mockLocations.filter(loc => loc.category === 'nightclub' || loc.category === 'bar');
  const musicEvents = mockLocations.filter(loc => loc.category === 'music_venue').map(locationToEventItem);
  const comedyEvents = mockLocations.filter(loc => loc.category === 'comedy_club').map(locationToEventItem);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <SearchSection
          showDateFilter={showDateFilter}
          dateRange={dateRange}
          onSearch={handleSearch}
          onDateRangeChange={setDateRange}
          onClearDates={() => setDateRange(undefined)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <CategoryTabs 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            <div className="mt-6">
              {activeCategory === 'nightlife' && (
                <NightlifeSection 
                  nightlifeVenues={nightlifeVenues}
                  searchedCity=""
                  dateRange={dateRange}
                />
              )}
              {activeCategory === 'music' && (
                <MusicSection 
                  musicEvents={musicEvents}
                  searchedCity=""
                  dateRange={dateRange}
                />
              )}
              {activeCategory === 'comedy' && (
                <ComedySection 
                  comedyEvents={comedyEvents}
                  searchedCity=""
                  dateRange={dateRange}
                />
              )}
              {activeCategory === 'all' && (
                <>
                  <NightlifeSection 
                    nightlifeVenues={nightlifeVenues}
                    searchedCity=""
                    dateRange={dateRange}
                  />
                  <MusicSection 
                    musicEvents={musicEvents}
                    searchedCity=""
                    dateRange={dateRange}
                  />
                  <ComedySection 
                    comedyEvents={comedyEvents}
                    searchedCity=""
                    dateRange={dateRange}
                  />
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <RecommendedForYou featuredLocations={mockLocations.slice(0, 5)} />
            <UserNotFound />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
