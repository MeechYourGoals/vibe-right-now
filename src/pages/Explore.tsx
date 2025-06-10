import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import ExploreHeader from "@/components/explore/ExploreHeader";
import SearchSection from "@/components/explore/SearchSection";
import CategoryTabs from "@/components/explore/CategoryTabs";
import ExploreContent from "@/components/explore/ExploreContent";
import ExploreSidebar from "@/components/explore/ExploreSidebar";
import { Location, AppDateRange } from "@/types";
import { getMockLocations, getMockMusicEvents, getMockComedyEvents, getMockNightlifeVenues } from "@/utils/explore/mockGenerators";
import { EventItem } from "@/components/venue/events/types";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedCity, setSearchedCity] = useState("San Francisco");
  const [searchCategory, setSearchCategory] = useState("places");
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState<AppDateRange>({});
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [locationTags, setLocationTags] = useState<string[]>([]);
  const [musicEvents, setMusicEvents] = useState<EventItem[]>([]);
  const [comedyEvents, setComedyEvents] = useState<EventItem[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<Location[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setIsLoadingResults(true);

    // Simulate API call
    setTimeout(() => {
      const mockLocations = getMockLocations(searchedCity, searchCategory);
      setFilteredLocations(mockLocations);
      setLocationTags(mockLocations.map(loc => loc.tags?.[0] || ""));
      setMusicEvents(getMockMusicEvents(searchedCity, dateRange));
      setComedyEvents(getMockComedyEvents(searchedCity, dateRange));
      setNightlifeVenues(getMockNightlifeVenues(searchedCity, dateRange));
      setIsLoadingResults(false);
    }, 500);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ExploreHeader title="Explore Vibes" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <SearchSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchedCity={searchedCity}
                setSearchedCity={setSearchedCity}
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
                dateRange={dateRange}
                setDateRange={setDateRange}
                onSearch={handleSearch}
                isLoading={isLoadingResults}
              />

              <CategoryTabs 
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              <ExploreContent
                activeTab={activeTab}
                searchCategory={searchCategory}
                isLoadingResults={isLoadingResults}
                filteredLocations={filteredLocations}
                locationTags={Array.isArray(locationTags) ? locationTags : []}
                musicEvents={musicEvents}
                comedyEvents={comedyEvents}
                nightlifeVenues={nightlifeVenues}
                searchedCity={searchedCity}
                dateRange={dateRange}
              />
            </div>

            <div className="lg:col-span-1">
              <ExploreSidebar 
                searchQuery={searchQuery}
                filteredLocations={filteredLocations}
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Explore;
