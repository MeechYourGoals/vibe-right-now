
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import Header from "@/components/Header";
import { mockLocations } from "@/mock/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import CameraButton from "@/components/CameraButton";
import SearchVibes from "@/components/SearchVibes";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import VenuePost from "@/components/VenuePost";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { generateMusicEvents, generateComedyEvents, getComedyEventsForCity } from "@/services/search/eventService";
import { Location } from "@/types";
import DateFilterSection from "@/components/explore/DateFilterSection";
import MusicSection from "@/components/explore/MusicSection";
import ComedySection from "@/components/explore/ComedySection";
import NightlifeSection from "@/components/explore/NightlifeSection";
import LocationsGrid from "@/components/explore/LocationsGrid";
import { ExploreFilters } from "@/components/explore/ExploreFilters";
import { searchTripAdvisor } from "@/services/tripAdvisorService";
import { generateMusicVenues, generateComedyClubs, generateRandomZip } from "@/utils/locations/mockVenueGenerators";
import { generateMockLocationsForCity, getMediaForLocation, getAdditionalTags, getCitySpecificContent } from "@/utils/explore/exploreHelpers";
import { useExploreData } from "@/hooks/useExploreData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Explore = () => {
  const { 
    searchQuery, 
    setSearchQuery,
    activeTab,
    setActiveTab,
    searchedCity,
    setSearchedCity,
    searchedState,
    setSearchedState,
    searchCategory,
    setSearchCategory,
    filteredLocations,
    setFilteredLocations,
    locationTags,
    setLocationTags,
    musicEvents,
    setMusicEvents,
    comedyEvents,
    setComedyEvents,
    nightlifeVenues,
    setNightlifeVenues,
    vibeFilter,
    setVibeFilter,
    isNaturalLanguageSearch,
    setIsNaturalLanguageSearch,
    searchCategories,
    setSearchCategories,
    isLoadingResults,
    setIsLoadingResults,
    dateRange,
    setDateRange,
    showDateFilter,
    setShowDateFilter,
    realDataResults,
    setRealDataResults,
    hasRealData
  } = useExploreData();
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const vibe = params.get('vibe');
    const tab = params.get('tab');
    const fromDate = params.get('from');
    const toDate = params.get('to');
    
    if (fromDate) {
      const from = new Date(fromDate);
      let range: DateRange = { from };
      
      if (toDate) {
        range.to = new Date(toDate);
      }
      
      setDateRange(range);
      setShowDateFilter(true);
    }
    
    if (q) {
      setSearchQuery(q);
      
      const isComplexQuery = q.length > 50 && 
        /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(q);
      
      setIsNaturalLanguageSearch(isComplexQuery);
      
      if (isComplexQuery) {
        processComplexQuery(q);
      } else {
        const parts = q.split(',');
        const city = parts[0].trim() || "San Francisco";
        const state = parts.length > 1 ? parts[1].trim() : "CA";
        
        setSearchedCity(city);
        setSearchedState(state);
        
        fetchRealData(q, city, state);
        
        setMusicEvents(generateMusicEvents(city, state, dateRange));
        setComedyEvents(generateComedyEvents(city, state, dateRange));
        setNightlifeVenues(generateLocalNightlifeVenues(city, state));
      }
      
      setSearchCategory("places");
    } else {
      setSearchedCity("San Francisco");
      setSearchedState("CA");
      
      fetchRealData("San Francisco, CA", "San Francisco", "CA");
      
      setMusicEvents(generateMusicEvents("San Francisco", "CA", dateRange));
      setComedyEvents(generateComedyEvents("San Francisco", "CA", dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues("San Francisco", "CA"));
    }
    
    if (tab) {
      setActiveTab(tab);
    }
    
    if (vibe) {
      setVibeFilter(vibe);
    }
    
    const lastChatQuery = sessionStorage.getItem('lastChatQuery');
    const lastChatTimestamp = sessionStorage.getItem('lastChatTimestamp');
    
    if (lastChatQuery && lastChatTimestamp && !q) {
      const timestamp = new Date(lastChatTimestamp);
      const fiveMinutesAgo = new Date();
      fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
      
      if (timestamp > fiveMinutesAgo) {
        setSearchQuery(lastChatQuery);
        
        sessionStorage.removeItem('lastChatQuery');
        sessionStorage.removeItem('lastChatTimestamp');
        
        if (sessionStorage.getItem('isComplexQuery') === 'true') {
          setIsNaturalLanguageSearch(true);
          processComplexQuery(lastChatQuery);
          sessionStorage.removeItem('isComplexQuery');
        }
        
        const searchParams = new URLSearchParams();
        searchParams.set('q', lastChatQuery);
        navigate(`/explore?${searchParams.toString()}`, { replace: true });
      }
    }
  }, [location.search, navigate, dateRange]);
  
  const fetchRealData = async (query: string, city: string, state: string) => {
    setIsLoadingResults(true);
    
    try {
      toast({
        title: "Searching for real data",
        description: "Looking for venues on TripAdvisor...",
        duration: 3000,
      });
      
      const searchQuery = query || `${city}, ${state}`;
      const results = await searchTripAdvisor(searchQuery);
      
      if (results && results.length > 0) {
        console.log('Found real data results:', results.length);
        setRealDataResults(results);
        
        const newLocationTags: Record<string, string[]> = {...locationTags};
        
        results.forEach(location => {
          if (!newLocationTags[location.id]) {
            newLocationTags[location.id] = getAdditionalTags(location);
          }
        });
        
        setLocationTags(newLocationTags);
        
        setFilteredLocations(prevLocations => {
          const combinedResults = [...results];
          
          if (combinedResults.length < 10) {
            const mockResults = generateMockLocationsForCity(city, state);
            combinedResults.push(...mockResults.slice(0, 10 - combinedResults.length));
          }
          
          return combinedResults;
        });
        
        toast({
          title: "Real data found!",
          description: `Found ${results.length} real venues to explore`,
          duration: 3000,
        });
      } else {
        console.log('No real data found, falling back to mock data');
        const mockResults = generateMockLocationsForCity(city, state);
        setFilteredLocations(mockResults);
        
        toast({
          title: "Using mock data",
          description: "Couldn't find real data, showing similar venues instead",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error fetching real data:', error);
      const mockResults = generateMockLocationsForCity(city, state);
      setFilteredLocations(mockResults);
    } finally {
      setIsLoadingResults(false);
    }
  };
  
  useEffect(() => {
    if (searchedCity) {
      setMusicEvents(generateMusicEvents(searchedCity, searchedState, dateRange));
      setComedyEvents(generateComedyEvents(searchedCity, searchedState, dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(searchedCity, searchedState));
    } else if (!musicEvents.length || !comedyEvents.length || !nightlifeVenues.length) {
      const defaultCity = "San Francisco";
      const defaultState = "CA";
      setMusicEvents(generateMusicEvents(defaultCity, defaultState, dateRange));
      setComedyEvents(generateComedyEvents(defaultCity, defaultState, dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(defaultCity, defaultState));
    }
  }, [dateRange, searchedCity, searchedState]);
  
  const processComplexQuery = async (queryText: string) => {
    try {
      setIsLoadingResults(true);
      toast({
        title: "Processing Complex Search",
        description: "Finding venues and events that match all your criteria...",
        duration: 3000,
      });
      
      const { data, error } = await supabase.functions.invoke('vector-search', {
        body: { query: queryText }
      });
      
      if (error) {
        console.error('Error calling vector-search function:', error);
        setIsLoadingResults(false);
        return;
      }
      
      if (data && data.categories && data.categories.length > 0) {
        setSearchCategories(data.categories);
        sessionStorage.setItem('lastSearchCategories', JSON.stringify(data.categories));
        
        const locationMatch = queryText.match(/in\s+([a-zA-Z\s]+)(?:,\s*([a-zA-Z\s]+))?/i);
        
        if (locationMatch && locationMatch[1]) {
          const city = locationMatch[1].trim();
          const state = locationMatch[2] ? locationMatch[2].trim() : "";
          
          setSearchedCity(city);
          setSearchedState(state);
          
          await fetchRealData(queryText, city, state);
          
          const needsComedy = data.categories.includes('comedy');
          if (needsComedy) {
            try {
              const comedyEvents = getComedyEventsForCity(city, state);
              setComedyEvents(comedyEvents);
              setActiveTab('comedy');
            } catch (e) {
              console.error('Error loading comedy events:', e);
            }
          } else {
            setMusicEvents(generateMusicEvents(city, state, dateRange));
            setComedyEvents(generateComedyEvents(city, state, dateRange));
          }
          
          setNightlifeVenues(generateLocalNightlifeVenues(city, state));
          
          let results = generateMockLocationsForCity(city, state);
          
          const categoryMap: Record<string, string> = {
            'restaurant': 'restaurant',
            'dining': 'restaurant',
            'bar': 'bar',
            'nightlife': 'bar',
            'attraction': 'attraction',
            'sport': 'sports',
            'sports': 'sports',
            'event': 'event',
            'upscale': 'restaurant',
            'family friendly': 'restaurant'
          };
          
          const relevantTypes = data.categories
            .map((cat: string) => categoryMap[cat.toLowerCase()])
            .filter(Boolean);
          
          if (relevantTypes.length > 0) {
            results = results.filter(location => 
              relevantTypes.includes(location.type)
            );
          }
          
          const vibes = data.categories.filter((cat: string) => 
            ['upscale', 'family friendly', 'casual', 'romantic', 'cozy', 'trendy', 'nightowl'].includes(cat.toLowerCase())
          );
          
          if (vibes.length > 0) {
            results.forEach(location => {
              if (!location.vibes) {
                location.vibes = [];
              }
              location.vibes.push(...vibes);
            });
            
            if (vibes[0]) {
              setVibeFilter(vibes[0]);
            }
          }
          
          if (realDataResults.length > 0) {
            results = [...realDataResults, ...results.filter(mock => 
              !realDataResults.some(real => real.name === mock.name))];
          }
          
          setFilteredLocations(results);
        }
      }
      
      toast({
        title: "Search Results Ready",
        description: "We've found venues and events matching your criteria",
        duration: 3000,
      });
    } catch (e) {
      console.error('Error processing complex query:', e);
    } finally {
      setIsLoadingResults(false);
    }
  };
  
  useEffect(() => {
    const tagsMap: Record<string, string[]> = {};
    mockLocations.forEach(location => {
      tagsMap[location.id] = getAdditionalTags(location);
    });
    setLocationTags(tagsMap);
  }, []);
  
  const handleSearch = async (query: string, filterType: string, category: string) => {
    setSearchQuery(query);
    setSearchCategory(category);
    
    const isComplexQuery = query.length > 50 && 
      /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(query);
    
    setIsNaturalLanguageSearch(isComplexQuery);
    
    const isComedyQuery = /comedy|comedian|stand[ -]?up|improv|funny|laugh|jokes/i.test(query);
    if (isComedyQuery) {
      setActiveTab("comedy");
    }
    
    const vibeKeywords = ["cozy", "family friendly", "nightowl", "trendy", "chill", "upscale", "casual", "romantic"];
    const queryLower = query.toLowerCase();
    let detectedVibe = "";
    
    for (const vibe of vibeKeywords) {
      if (queryLower.includes(vibe)) {
        detectedVibe = vibe;
        break;
      }
    }
    
    if (detectedVibe) {
      setVibeFilter(detectedVibe);
    }
    
    if (filterType !== "All") {
      setActiveTab(filterType.toLowerCase());
    } else {
      setActiveTab("all");
    }
    
    let city = "";
    let state = "";
    
    if (isComplexQuery) {
      processComplexQuery(query);
    } else if (query && !detectedVibe) {
      const parts = query.split(',');
      city = parts[0].trim();
      state = parts.length > 1 ? parts[1].trim() : "";
      setSearchedCity(city);
      setSearchedState(state);
      
      await fetchRealData(query, city, state);
      
      setMusicEvents(generateMusicEvents(city, state, dateRange));
      setComedyEvents(generateComedyEvents(city, state, dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(city, state));
    } else {
      setSearchedCity("");
      setSearchedState("");
      setMusicEvents([]);
      setComedyEvents([]);
      setNightlifeVenues([]);
      
      if (!query) {
        fetchRealData("San Francisco, CA", "San Francisco", "CA");
      }
    }
    
    let results = [...mockLocations];
    
    if (category === "places" && city) {
      if (realDataResults.length > 0) {
        results = [...realDataResults];
        
        if (results.length < 10) {
          const mockCityResults = generateMockLocationsForCity(city, state);
          results = [...results, ...mockCityResults.filter(mock => 
            !results.some(real => real.name === mock.name))];
        }
      } else {
        results = generateMockLocationsForCity(city, state);
      }
      
      results.forEach(location => {
        if (!location.vibes) {
          location.vibes = generateRandomVibes();
        }
      });
    } else if (query) {
      const allLocations = [...realDataResults, ...mockLocations];
      results = allLocations.filter(location => {
        const locationMatches = 
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.city.toLowerCase().includes(query.toLowerCase()) ||
          location.address.toLowerCase().includes(query.toLowerCase());
        
        return locationMatches;
      });
    }
    
    if (activeTab !== "all") {
      results = results.filter(location => location.type === activeTab);
    }
    
    if (vibeFilter && vibeFilter.length > 0) {
      results = results.filter(location => {
        if (!location.vibes) return false;
        return location.vibes.some(vibe => 
          vibe.toLowerCase().includes(vibeFilter.toLowerCase())
        );
      });
    }
    
    setFilteredLocations(results);
    
    if (query) {
      const searchParams = new URLSearchParams();
      searchParams.set('q', query);
      if (vibeFilter) searchParams.set('vibe', vibeFilter);
      if (isComedyQuery || activeTab !== "all") searchParams.set('tab', isComedyQuery ? 'comedy' : activeTab);
      
      if (dateRange?.from) {
        searchParams.set('from', dateRange.from.toISOString().split('T')[0]);
        if (dateRange.to) {
          searchParams.set('to', dateRange.to.toISOString().split('T')[0]);
        } else {
          searchParams.delete('to');
        }
      }
      
      navigate(`/explore?${searchParams.toString()}`, { replace: true });
    } else if (vibeFilter) {
      navigate(`/explore?vibe=${vibeFilter}`, { replace: true });
    } else {
      navigate('/explore', { replace: true });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    let results = [...mockLocations];
    
    if (searchQuery) {
      results = results.filter(location => {
        const locationMatches = 
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase());
        
        return locationMatches;
      });
    }
    
    if (searchCategory === "places" && searchedCity) {
      if (realDataResults.length > 0) {
        results = [...realDataResults];
        
        if (results.length < 10) {
          const mockCityResults = generateMockLocationsForCity(searchedCity, searchedState);
          results = [...results, ...mockCityResults.filter(mock => 
            !results.some(real => real.name === mock.name))];
        }
      } else {
        results = generateMockLocationsForCity(searchedCity, searchedState);
      }
      
      results.forEach(location => {
        if (!location.vibes) {
          location.vibes = generateRandomVibes();
        }
      });
    }
    
    if (value !== "all") {
      results = results.filter(location => location.type === value);
    }
    
    if (vibeFilter && vibeFilter.length > 0) {
      results = results.filter(location => {
        if (!location.vibes) return false;
        return location.vibes.some(vibe => 
          vibe.toLowerCase().includes(vibeFilter.toLowerCase())
        );
      });
    }
    
    setFilteredLocations(results);
  };

  const getPageTitle = () => {
    if (isNaturalLanguageSearch) {
      return "Smart Search Results";
    } else if (searchedCity) {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    }
    return "Explore Vibes";
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-6 vibe-gradient-text">
            {getPageTitle()}
          </h1>
          
          <div className="max-w-xl mx-auto mb-6">
            <SearchVibes onSearch={handleSearch} />
          </div>
          
          <ExploreFilters
            dateRange={dateRange}
            showDateFilter={showDateFilter}
            setShowDateFilter={setShowDateFilter}
            handleDateRangeChange={handleDateRangeChange}
            vibeFilter={vibeFilter}
            setVibeFilter={setVibeFilter}
          />
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-10">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
              <TabsTrigger value="bar">Bars</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="attraction">Attractions</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="comedy">Comedy</TabsTrigger>
              <TabsTrigger value="nightlife">Nightlife</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isLoadingResults ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
              <p className="text-muted-foreground">Finding the perfect matches for your search...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {activeTab === "music" && (
                <MusicSection
                  musicEvents={musicEvents.length > 0 ? musicEvents : generateMusicEvents(searchedCity || "San Francisco", searchedState || "CA", dateRange)}
                  searchedCity={searchedCity || "San Francisco"}
                  dateRange={dateRange}
                />
              )}
              
              {activeTab === "comedy" && (
                <ComedySection
                  comedyEvents={comedyEvents.length > 0 ? comedyEvents : generateComedyEvents(searchedCity || "San Francisco", searchedState || "CA", dateRange)}
                  searchedCity={searchedCity || "San Francisco"}
                  dateRange={dateRange}
                />
              )}
              
              {activeTab === "nightlife" && (
                <NightlifeSection
                  nightlifeVenues={nightlifeVenues.length > 0 ? nightlifeVenues : generateLocalNightlifeVenues(searchedCity || "San Francisco", searchedState || "CA")}
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
              
              {activeTab !== "music" && activeTab !== "comedy" && activeTab !== "nightlife" && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {activeTab === "all" ? "Popular Venues" : `Popular ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s`}
                    {hasRealData && realDataResults.length > 0 && (
                      <Badge variant="success" className="ml-2">
                        {realDataResults.length} Real Results
                      </Badge>
                    )}
                  </h2>
                  <LocationsGrid 
                    locations={filteredLocations.filter(loc => 
                      activeTab === "all" ? true : loc.type === activeTab
                    )} 
                    locationTags={locationTags}
                    isRealData={hasRealData && realDataResults.length > 0}
                  />
                </div>
              )}
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Nearby Map</h3>
                  <NearbyVibesMap 
                    height={250} 
                    locations={filteredLocations.slice(0, 10)}
                    isRealData={hasRealData && realDataResults.length > 0}
                  />
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Quick Filters</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Trending", "Popular", "Local Favorite", "New Opening"].map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => {
                            toast({
                              title: `${tag} Filter Applied`,
                              description: "Showing venues with this tag",
                              duration: 2000,
                            });
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Data Sources</h4>
                    <div className="text-xs text-muted-foreground">
                      <p className="mb-1">Using data from:</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">TripAdvisor</Badge>
                        {realDataResults.length > 0 ? (
                          <Badge variant="success" className="text-xs bg-green-100 text-green-800">{realDataResults.length} Real Venues</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">Mock Data</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    navigate("/map");
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2" /> View Full Map
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Import needed functions 
const generateLocalNightlifeVenues = (city: string, state: string): Location[] => {
  if (!city) return [];
  
  const nightlifeVenues = [
    "Rooftop Lounge", "Nightclub", "Cocktail Bar", "Jazz Bar", "Dance Club", 
    "Speakeasy", "Brewery", "Wine Bar", "Pub", "Karaoke Bar"
  ];
  
  const nightlifeLocations: Location[] = [];
  
  const count = Math.floor(Math.random() * 7) + 3;
  
  for (let i = 0; i < count; i++) {
    const venueName = `${city} ${nightlifeVenues[Math.floor(Math.random() * nightlifeVenues.length)]}`;
    const isVerified = Math.random() > 0.4;
    
    nightlifeLocations.push({
      id: `nightlife-${city}-${i}`,
      name: venueName,
      address: `${100 + i} Party St`,
      city,
      state,
      country: "USA",
      zip: generateRandomZip(city, state),
      lat: 40 + Math.random(),
      lng: -75 + Math.random(),
      type: "bar",
      verified: isVerified,
      vibes: generateRandomVibes()
    });
  }
  
  return nightlifeLocations;
};

const generateRandomVibes = (): string[] => {
  const allVibes = [
    "Cozy", "Family Friendly", "NightOwl", "Trendy", "Chill", 
    "Upscale", "Casual", "Romantic", "Lively", "Intimate", 
    "High Energy", "Laid Back", "Artsy", "Eclectic", "Historic",
    "Modern", "Vintage", "Industrial", "Bohemian", "Elegant"
  ];
  
  const numberOfVibes = Math.floor(Math.random() * 4) + 1;
  const selectedVibes: string[] = [];
  
  for (let i = 0; i < numberOfVibes; i++) {
    const randomVibe = allVibes[Math.floor(Math.random() * allVibes.length)];
    if (!selectedVibes.includes(randomVibe)) {
      selectedVibes.push(randomVibe);
    }
  }
  
  return selectedVibes;
};

import { format } from "date-fns";

export default Explore;
