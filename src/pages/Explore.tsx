import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import Header from "@/components/Header";
import { mockLocations } from "@/mock/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Mic, Moon, Sparkles, AlertTriangle, MapPin, VerifiedIcon, Calendar, CalendarRange, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CameraButton from "@/components/CameraButton";
import SearchVibes from "@/components/SearchVibes";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import VenuePost from "@/components/VenuePost";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { generateMusicVenues, generateComedyClubs } from "@/utils/locations/mockVenueGenerators";
import { generateMusicEvents, generateComedyEvents, getComedyEventsForCity } from "@/services/search/eventService";
import DateFilterSection from "@/components/explore/DateFilterSection";
import MusicSection from "@/components/explore/MusicSection";
import ComedySection from "@/components/explore/ComedySection";
import NightlifeSection from "@/components/explore/NightlifeSection";
import LocationsGrid from "@/components/explore/LocationsGrid";
import { format, addMonths } from "date-fns";
import { Location } from "@/types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DateRangeSelector from "@/components/DateRangeSelector";
import { EventItem } from "@/components/venue/events/types";

const generateMockMusicVenues = (city: string) => {
  return [
    'Arena ' + city,
    'The ' + city + ' Theatre',
    'Club ' + city,
    'The ' + city + ' Concert Hall',
    'Underground ' + city,
    'The ' + city + ' Amphitheatre',
    'Jazz Club ' + city
  ];
};

const generateMockArtists = () => {
  return [
    'The Rolling Stones',
    'Taylor Swift',
    'Ed Sheeran',
    'Lady Gaga',
    'Drake',
    'Beyoncé',
    'Coldplay',
    'The Weeknd',
    'Bad Bunny',
    'BTS',
    'Harry Styles',
    'Post Malone',
    'Dua Lipa',
    'Billie Eilish',
    'Bruno Mars'
  ];
};

const generateMockComedians = () => {
  return [
    'Dave Chappelle',
    'Kevin Hart',
    'John Mulaney',
    'Ali Wong',
    'Bill Burr',
    'Trevor Noah',
    'Amy Schumer',
    'Chris Rock',
    'Jerry Seinfeld',
    'Jim Gaffigan',
    'Sebastian Maniscalco',
    'Wanda Sykes',
    'Jo Koy',
    'Tom Segura',
    'Bert Kreischer'
  ];
};

const getCitySpecificContent = (location: Location) => {
  return `Check out this amazing ${location.type} in ${location.city}! The vibes are incredible right now.`;
};

const getMediaForLocation = (location: Location) => {
  const imageMap: Record<string, string> = {
    "30": "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1000&auto=format&fit=crop",
    "31": "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop",
    "32": "https://images.unsplash.com/photo-1566577134624-d9b13555e288?q=80&w=1000&auto=format&fit=crop",
    "33": "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop",
    "34": "https://images.unsplash.com/photo-1530915872-13619796d013?q=80&w=1000&auto=format&fit=crop",
    "35": "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1000&auto=format&fit=crop",
  };

  const typeDefaultMedia: Record<string, string> = {
    "restaurant": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    "bar": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000&auto=format&fit=crop",
    "event": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    "attraction": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1000&auto=format&fit=crop",
    "sports": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000&auto=format&fit=crop",
    "other": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
  };

  return {
    type: "image" as const,
    url: imageMap[location.id] || typeDefaultMedia[location.type] || `https://source.unsplash.com/random/800x600/?${location.type},${location.city}`
  };
};

const generateMockLocationsForCity = (city: string, state: string) => {
  const types = ["restaurant", "bar", "event", "attraction", "sports", "other"];
  let mockCityLocations: Location[] = [];
  
  types.forEach((type, typeIndex) => {
    const count = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < count; i++) {
      const id = `${city.toLowerCase()}-${type}-${i}`;
      let name = "";
      
      switch (type) {
        case "restaurant":
          name = [`${city} Grill`, `Downtown ${city} Bistro`, `${city} Fine Dining`][i % 3];
          break;
        case "bar":
          name = [`${city} Rooftop Bar`, `${city} Craft Beer`, `${city} Nightclub`][i % 3];
          break;
        case "event":
          name = [`${city} Music Festival`, `${city} Art Exhibition`, `${city} Food Fest`][i % 3];
          break;
        case "attraction":
          name = [`${city} Museum`, `${city} Park`, `${city} Historical Site`][i % 3];
          break;
        case "sports":
          name = [`${city} Basketball Game`, `${city} Football Stadium`, `${city} Baseball Park`][i % 3];
          break;
        case "other":
          name = [`${city} Shopping Center`, `${city} Beach`, `${city} University`][i % 3];
          break;
      }
      
      mockCityLocations.push({
        id,
        name,
        address: `${100 + i} Main St`,
        city,
        state,
        country: "USA",
        lat: 40 + Math.random(),
        lng: -75 + Math.random(),
        type: type as any,
        verified: Math.random() > 0.3,
      });
    }
  });

  mockCityLocations = [
    ...mockCityLocations,
    ...generateMusicVenues(city, state),
    ...generateComedyClubs(city, state)
  ];
  
  return mockCityLocations;
};

const getAdditionalTags = (location: Location) => {
  const commonTags = ["Happening Now", "Popular", "Trending"];
  const typeSpecificTags: Record<string, string[]> = {
    "restaurant": ["Fine Dining", "Casual Eats", "Brunch Spot", "Discounted Menu"],
    "bar": ["Live Music", "Happy Hour", "Nightlife", "Craft Cocktails", "Sports Bar"],
    "event": ["Live Music", "Festival", "Discounted Tix", "Limited Time", "Family Friendly"],
    "attraction": ["Tourist Spot", "Local Favorite", "Photo Spot", "Cultural", "Outdoor"],
    "sports": ["Game Day", "Discounted Tix", "Live Broadcast", "Family Friendly"],
    "other": ["Hidden Gem", "New Opening", "Local Favorite"]
  };
  
  const specificTags = typeSpecificTags[location.type] || [];
  
  const numberOfTags = Math.floor(Math.random() * 3) + 2;
  const additionalTags = [...specificTags, ...commonTags]
    .sort(() => 0.5 - Math.random())
    .slice(0, numberOfTags);
  
  return additionalTags;
};

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
      zip: `${10000 + Math.floor(Math.random() * 90000)}`,
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

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchedCity, setSearchedCity] = useState("");
  const [searchedState, setSearchedState] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  const [musicEvents, setMusicEvents] = useState<EventItem[]>([]);
  const [comedyEvents, setComedyEvents] = useState<EventItem[]>([]);
  const [nightlifeVenues, setNightlifeVenues] = useState<Location[]>([]);
  const [vibeFilter, setVibeFilter] = useState<string>("");
  const [isNaturalLanguageSearch, setIsNaturalLanguageSearch] = useState(false);
  const [searchCategories, setSearchCategories] = useState<string[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showDateFilter, setShowDateFilter] = useState(false);
  
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
        
        setMusicEvents(generateMusicEvents(city, state, dateRange));
        setComedyEvents(generateComedyEvents(city, state, dateRange));
        setNightlifeVenues(generateLocalNightlifeVenues(city, state));
      }
      
      setSearchCategory("places");
    } else {
      setSearchedCity("San Francisco");
      setSearchedState("CA");
      setMusicEvents(generateMusicEvents("San Francisco", "CA", dateRange));
      setComedyEvents(generateComedyEvents("San Francisco", "CA", dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues("San Francisco", "CA", dateRange));
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
  
  const handleSearch = (query: string, filterType: string, category: string) => {
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
      
      setMusicEvents(generateMusicEvents(city, state, dateRange));
      setComedyEvents(generateComedyEvents(city, state, dateRange));
      setNightlifeVenues(generateLocalNightlifeVenues(city, state));
    } else {
      setSearchedCity("");
      setSearchedState("");
      setMusicEvents([]);
      setComedyEvents([]);
      setNightlifeVenues([]);
    }
    
    let results = [...mockLocations];
    
    if (category === "places" && city) {
      results = generateMockLocationsForCity(city, state);
      
      results.forEach(location => {
        if (!location.vibes) {
          location.vibes = generateRandomVibes();
        }
      });
    } else if (query) {
      results = mockLocations.filter(location => {
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
      results = generateMockLocationsForCity(searchedCity, searchedState);
      
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
          
          <DateFilterSection
            dateRange={dateRange}
            setDateRange={setDateRange}
            showDateFilter={showDateFilter}
            setShowDateFilter={setShowDateFilter}
            searchedCity={searchedCity || "San Francisco"}
            handleDateRangeChange={handleDateRangeChange}
            vibeFilter={vibeFilter}
            setVibeFilter={setVibeFilter}
            searchQuery={searchQuery}
            searchCategory={searchCategory}
            handleSearch={handleSearch}
          />
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-10">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
              <TabsTrigger value="bar">Bars</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="attraction">Attractions</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="music">
                <Music className="mr-1 h-4 w-4" />
                Music
              </TabsTrigger>
              <TabsTrigger value="comedy">
                <Mic className="mr-1 h-4 w-4" />
                Comedy
              </TabsTrigger>
              <TabsTrigger value="nightlife">
                <Moon className="mr-1 h-4 w-4" />
                Nightlife
              </TabsTrigger>
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
                <LocationsGrid
                  locations={filteredLocations.length > 0 ? filteredLocations : generateMockLocationsForCity(searchedCity || "San Francisco", searchedState || "CA")}
                  locationTags={locationTags}
                />
              )}
            </div>
            
            <div className="hidden md:block">
              <NearbyVibesMap />
              
              {searchedCity && dateRange?.from && (
                <Card className="mt-6 bg-indigo-50 border-indigo-200">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-indigo-800">
                      Planning Your Trip
                    </h3>
                    <p className="text-sm text-indigo-700 mb-4">
                      Looking at events in {searchedCity} for
                      {dateRange.to
                        ? ` ${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, yyyy")}`
                        : ` ${format(dateRange.from, "MMM d, yyyy")}`
                      }
                    </p>
                    <div className="space-y-2">
                      <Button variant="default" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        Save This Trip
                      </Button>
                      <Button variant="outline" className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-100">
                        Share With Friends
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>
      
      <CameraButton />
    </div>
  );
};

export default Explore;
