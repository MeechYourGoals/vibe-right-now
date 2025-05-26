
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import CameraButton from "@/components/CameraButton";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import VenuePost from "@/components/VenuePost";
import useExploreState from "@/hooks/useExploreState";
import { getCitySpecificContent } from "@/utils/explore/mockGenerators";
import SearchSection from "@/components/explore/SearchSection";
import CategoryTabs from "@/components/explore/CategoryTabs";
import VibeFilter from "@/components/explore/VibeFilter";
import MusicSection from "@/components/explore/MusicSection";
import ComedySection from "@/components/explore/ComedySection";
import NightlifeSection from "@/components/explore/NightlifeSection";
import LocationsGrid from "@/components/explore/LocationsGrid";
import RecommendedForYou from "@/components/RecommendedForYou";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockUsers } from "@/mock/users";

const Explore = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    activeTab,
    searchedCity,
    searchedState,
    searchCategory,
    filteredLocations,
    locationTags,
    musicEvents,
    comedyEvents,
    nightlifeVenues,
    vibeFilter,
    isNaturalLanguageSearch,
    isLoadingResults,
    dateRange,
    showDateFilter,
    activeSearchTab,
    getPageTitle,
    handleSearch,
    handleTabChange,
    handleClearVibeFilter,
    handleDateRangeChange,
    handleClearDates,
    handleSearchTabChange,
    setShowDateFilter
  } = useExploreState();

  // Check if the search category is "users" and if it's a username
  useEffect(() => {
    if (searchCategory === "users") {
      const usernameMatch = searchedCity && searchedCity.match(/^@?([a-zA-Z0-9_]+)$/);
      if (usernameMatch) {
        const username = usernameMatch[1];
        // Check if this is a known user
        const userExists = mockUsers.some(user => user.username === username);
        if (userExists) {
          // Redirect to user profile
          navigate(`/user/${username}`);
        } else {
          // Show "user not found" state or suggest other users
          // This is handled by the UI rendering below
        }
      }
    }
  }, [searchCategory, searchedCity, navigate]);

  // Function to get media for location
  const getMediaForLocation = (location: any) => {
    return location.images || [];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-6 vibe-gradient-text">
            {getPageTitle()}
          </h1>
          
          <SearchSection 
            showDateFilter={showDateFilter}
            dateRange={dateRange}
            onSearch={handleSearch}
            onDateRangeChange={handleDateRangeChange}
            onClearDates={handleClearDates}
          />
          
          {/* Map centered below search bar */}
          <div className="w-full mb-6">
            <NearbyVibesMap />
          </div>
          
          <VibeFilter 
            vibeFilter={vibeFilter} 
            onClearVibeFilter={handleClearVibeFilter} 
          />
          
          <CategoryTabs 
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className={`${isMobile ? 'w-full' : 'w-3/4'}`}>
            {isLoadingResults ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
                  <p className="text-muted-foreground">Finding the perfect matches for your search...</p>
                </div>
              </div>
            ) : (
              <div>
                {searchCategory === "users" && filteredLocations.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find the user "{searchedCity}". Here are some suggested users you might like.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {mockUsers.slice(0, 6).map(user => (
                        <div 
                          key={user.id}
                          className="flex flex-col items-center cursor-pointer transition hover:scale-105"
                          onClick={() => navigate(`/user/${user.username}`)}
                        >
                          <Avatar className="h-16 w-16 mb-2">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">@{user.username}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "music" && searchCategory !== "users" && (
                  <MusicSection
                    musicEvents={musicEvents.length > 0 ? musicEvents : []}
                    searchedCity={searchedCity || "San Francisco"}
                    dateRange={dateRange}
                  />
                )}
                
                {activeTab === "comedy" && searchCategory !== "users" && (
                  <ComedySection
                    comedyEvents={comedyEvents.length > 0 ? comedyEvents : []}
                    searchedCity={searchedCity || "San Francisco"}
                    dateRange={dateRange}
                  />
                )}
                
                {activeTab === "nightlife" && searchCategory !== "users" && (
                  <NightlifeSection
                    nightlifeVenues={nightlifeVenues.length > 0 ? nightlifeVenues : []}
                    searchedCity={searchedCity || "San Francisco"}
                    dateRange={dateRange}
                  />
                )}
                
                {searchCategory === "places" && activeTab === "sports" && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      Trending Sports Events
                      {dateRange?.from && (
                        <Badge className="ml-2 bg-indigo-100 text-indigo-800">
                          {format(dateRange.from, "MMM yyyy")}
                          {dateRange.to && ` - ${format(dateRange.to, "MMM yyyy")}`}
                        </Badge>
                      )}
                    </h2>
                    <div className="space-y-4">
                      {filteredLocations
                        .filter(loc => loc.type === "sports")
                        .slice(0, 3)
                        .map(location => (
                          <VenuePost
                            key={location.id}
                            venue={location}
                            content={getCitySpecificContent(location)}
                            media={getMediaForLocation(location)}
                            timestamp={new Date().toISOString()}
                          />
                        ))}
                    </div>
                  </div>
                )}
                
                {activeTab !== "music" && activeTab !== "comedy" && activeTab !== "nightlife" && searchCategory !== "users" && (
                  <LocationsGrid
                    locations={filteredLocations}
                    locationTags={locationTags}
                  />
                )}
              </div>
            )}
          </div>
          
          {!isMobile && (
            <div className="w-1/4 space-y-6">
              <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
              <TrendingLocations />
              <DiscountLocations />
            </div>
          )}
          
          {isMobile && (
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-bold mb-4 vibe-gradient-text">Around You</h2>
              <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
              <TrendingLocations />
              <DiscountLocations />
            </div>
          )}
        </div>
      </main>
      
      <CameraButton />
    </div>
  );
};

export default Explore;
