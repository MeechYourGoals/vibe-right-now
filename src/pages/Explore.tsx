import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SearchSection from "@/components/explore/SearchSection";
import CategoryTabs from "@/components/explore/CategoryTabs";
import RecommendedForYou from "@/components/explore/RecommendedForYou";
import UserNotFound from "@/components/explore/UserNotFound";
import NightlifeSection from "@/components/explore/NightlifeSection";
import MusicSection from "@/components/explore/MusicSection";
import ComedySection from "@/components/explore/ComedySection";
import { mockLocations } from '@/mock/locations';
import { DateRange } from "react-day-picker";

const categories = [
  { id: 'all', label: 'All' },
  { id: 'nightlife', label: 'Nightlife' },
  { id: 'music', label: 'Music' },
  { id: 'comedy', label: 'Comedy' },
];

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const handleSearch = (query: string, filterType: string, category: string) => {
    setSearchQuery(query);
    setActiveCategory(category);
  };

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
              {activeCategory === 'nightlife' && <NightlifeSection />}
              {activeCategory === 'music' && <MusicSection />}
              {activeCategory === 'comedy' && <ComedySection />}
              {activeCategory === 'all' && (
                <>
                  <NightlifeSection />
                  <MusicSection />
                  <ComedySection />
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
