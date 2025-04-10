import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { mockLocations } from "@/mock/data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, VerifiedIcon, Music, Mic, AlertTriangle, Moon, Sparkles, Coffee, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import CameraButton from "@/components/CameraButton";
import SearchVibes from "@/components/SearchVibes";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import { Location } from "@/types";
import VenuePost from "@/components/VenuePost";
import EventsList from "@/components/venue/events/EventsList";
import { EventItem } from "@/components/venue/events/types";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { getComedyEventsForCity } from "@/services/search/eventService";

const getCitySpecificContent = (city: string, type: string) => {
  return `Check out this amazing ${type} in ${city}! The vibes are incredible right now.`;
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
  const mockCityLocations: Location[] = [];
  
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

const generateMusicEvents = (city: string, state: string): EventItem[] => {
  if (!city) return [];
  
  const musicArtists = [
    "Taylor Swift", "The Weeknd", "Bad Bunny", "Billie Eilish", 
    "Drake", "BTS", "Dua Lipa", "Post Malone", "Harry Styles"
  ];
  
  const venues = [
    `${city} Arena`, `${city} Amphitheater`, `Downtown ${city} Concert Hall`, 
    `${city} Stadium`, `${city} Center`
  ];
  
  const now = new Date();
  const events: EventItem[] = [];
  
  const count = Math.floor(Math.random() * 6);
  
  for (let i = 0; i < count; i++) {
    const artist = musicArtists[Math.floor(Math.random() * musicArtists.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    
    const date = new Date();
    date.setDate(now.getDate() + Math.floor(Math.random() * 7));
    
    events.push({
      id: `music-${city}-${i}`,
      title: `${artist} Concert`,
      description: `Live performance by ${artist}`,
      date: date.toISOString(),
      time: `${7 + Math.floor(Math.random() * 4)}:00 PM`,
      location: venue,
      imageUrl: `https://source.unsplash.com/random/800x600/?concert,${artist.split(' ').join(',')}`,
      ticketUrl: `https://www.${venue.toLowerCase().replace(/\s+/g, '')}.com/tickets`,
      price: `$${45 + Math.floor(Math.random() * 150)}`,
      type: "music"
    });
  }
  
  return events;
};

const generateComedyEvents = (city: string, state: string): EventItem[] => {
  if (!city) return [];
  
  const comedians = [
    "Dave Chappelle", "Kevin Hart", "John Mulaney", "Ali Wong", 
    "Bill Burr", "Hannah Gadsby", "Trevor Noah", "Wanda Sykes", "Jim Gaffigan"
  ];
  
  const venues = [
    `${city} Comedy Club`, `Laugh Factory ${city}`, `${city} Improv`, 
    `Funny Bone ${city}`, `Comedy Cellar ${city}`
  ];
  
  const now = new Date();
  const events: EventItem[] = [];
  
  const count = Math.floor(Math.random() * 5);
  
  for (let i = 0; i < count; i++) {
    const comedian = comedians[Math.floor(Math.random() * comedians.length)];
    const venue = venues[Math.floor(Math.random() * venues.length)];
    
    const date = new Date();
    date.setDate(now.getDate() + Math.floor(Math.random() * 7));
    
    events.push({
      id: `comedy-${city}-${i}`,
      title: `${comedian} Stand-Up`,
      description: `Comedy show featuring ${comedian}`,
      date: date.toISOString(),
      time: `${7 + Math.floor(Math.random() * 3)}:00 PM`,
      location: venue,
      imageUrl: `https://source.unsplash.com/random/800x600/?comedian,standup`,
      ticketUrl: `https://www.${venue.toLowerCase().replace(/\s+/g, '')}.com/tickets`,
      price: `$${30 + Math.floor(Math.random() * 70)}`,
      type: "comedy"
    });
  }
  
  return events;
};

const generateNightlifeVenues = (city: string, state: string): Location[] => {
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
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const vibe = params.get('vibe');
    const tab = params.get('tab');
    
    if (q) {
      setSearchQuery(q);
      
      const isComplexQuery = q.length > 50 && 
        /(\w+\s+(and|or|with|near|before|after)\s+\w+)|(\w+\s+for\s+\w+)/i.test(q);
      
      setIsNaturalLanguageSearch(isComplexQuery);
      
      if (isComplexQuery) {
        processComplexQuery(q);
      } else {
        const parts = q.split(',');
        const city = parts[0].trim();
        const state = parts.length > 1 ? parts[1].trim() : "";
        
        setSearchedCity(city);
        setSearchedState(state);
        
        setMusicEvents(generateMusicEvents(city, state));
        setComedyEvents(generateComedyEvents(city, state));
        setNightlifeVenues(generateNightlifeVenues(city, state));
      }
      
      setSearchCategory("places");
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
  }, [location.search, navigate]);
  
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
          
          // Check if we need comedy shows
          const needsComedy = data.categories.includes('comedy');
          if (needsComedy) {
            try {
              // Get comedy events from the mock data for now
              // In production, this would call an API
              const comedyEvents = getComedyEventsForCity(city, state);
              setComedyEvents(comedyEvents);
              setActiveTab('comedy');
            } catch (e) {
              console.error('Error loading comedy events:', e);
            }
          } else {
            setMusicEvents(generateMusicEvents(city, state));
            setComedyEvents(generateComedyEvents(city, state));
          }
          
          setNightlifeVenues(generateNightlifeVenues(city, state));
          
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
    
    // Check if it's a comedy query
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
      
      setMusicEvents(generateMusicEvents(city, state));
      setComedyEvents(generateComedyEvents(city, state));
      setNightlifeVenues(generateNightlifeVenues(city, state));
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
    
    // Update URL parameters
    if (query) {
      const searchParams = new URLSearchParams();
      searchParams.set('q', query);
      if (vibeFilter) searchParams.set('vibe', vibeFilter);
      if (isComedyQuery || activeTab !== "all") searchParams.set('tab', isComedyQuery ? 'comedy' : activeTab);
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

  const NoEventsMessage = () => (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <AlertTriangle className="w-12 h-12 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Shows Right Now</h3>
      <p>There are no upcoming shows in this area for the next week.</p>
    </div>
  );

  const NightlifeSection = () => {
    if (nightlifeVenues.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Moon className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Nightlife Venues Found</h3>
          <p>We couldn't find any nightlife venues in this area. Try searching for another location.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nightlifeVenues.map((venue) => (
          <Card key={venue.id} className="vibe-card-hover bg-indigo-50 border-indigo-200 hover:bg-indigo-100">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold flex items-center">
                  {venue.name}
                  {venue.verified && (
                    <VerifiedIcon className="h-4 w-4 ml-1 text-indigo-500" />
                  )}
                </h3>
                <Badge variant="outline" className="bg-indigo-100 border-indigo-300 text-indigo-700">Nightlife</Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {venue.address}, {venue.city}, {venue.state}
                </span>
              </div>
              
              {venue.vibes && venue.vibes.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {venue.vibes.map((vibe, index) => (
                    <Badge key={index} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      <Sparkles className="h-3 w-3 mr-1 text-indigo-500" />
                      {vibe}
                    </Badge>
                  ))}
                </div>
              )}
              
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                <Link to={`/venue/${venue.id}`}>View Vibes</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const ComedyEventsSection = () => {
    if (comedyEvents.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <AlertTriangle className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Comedy Shows Found</h3>
          <p>We couldn't find any comedy shows in {searchedCity || "this area"} for the next few weeks. Try searching for another location.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <EventsList events={comedyEvents.map(event => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.venue,
          imageUrl: event.imageUrl,
          ticketUrl: event.ticketUrl,
          price: event.price,
          type: "comedy"
        }))} />
      </div>
    );
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
          
          {isNaturalLanguageSearch && (
            <div className="max-w-xl mx-auto mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <h3 className="text-sm font-medium flex items-center text-indigo-700">
                  <Sparkles className="h-4 w-4 mr-2 text-indigo-500" />
                  Smart Search Results
                </h3>
                <p className="text-xs text-indigo-600">
                  Showing results for "{searchQuery.substring(0, 75)}
                  {searchQuery.length > 75 ? '...' : ''}"
                </p>
                {searchCategories.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {searchCategories.map((category, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-indigo-100 text-indigo-700 border-indigo-200 text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {vibeFilter && (
            <div className="max-w-xl mx-auto mb-4 flex items-center justify-center">
              <Badge className="bg-indigo-100 text-indigo-800 px-3 py-1 text-sm flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                Filtering by vibe: {vibeFilter}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-2 rounded-full" 
                  onClick={() => {
                    setVibeFilter("");
                    handleSearch(searchQuery, "All", searchCategory);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            </div>
          )}
          
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
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Music Events in {searchedCity}</h2>
                  {musicEvents.length > 0 ? (
                    <div className="space-y-4">
                      <EventsList events={musicEvents} />
                    </div>
                  ) : (
                    <NoEventsMessage />
                  )}
                </div>
              )}
              
              {activeTab === "comedy" && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Comedy Shows in {searchedCity}</h2>
                  <ComedyEventsSection />
                </div>
              )}
              
              {activeTab === "nightlife" && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Nightlife in {searchedCity}</h2>
                  <NightlifeSection />
                </div>
              )}
              
              {searchCategory === "places" && searchedCity && activeTab === "sports" && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Trending Sports Events</h2>
                  <div className="space-y-4">
                    {filteredLocations
                      .filter(loc => loc.type === "sports")
                      .slice(0, 3)
                      .map(location => (
                        <VenuePost
                          key={location.id}
                          venue={location}
                          content={getCitySpecificContent(location.city, 'sports event')}
                          media={getMediaForLocation(location)}
                          timestamp={new Date().toISOString()}
                        />
                      ))}
                  </div>
                </div>
              )}
              
              {activeTab !== "music" && activeTab !== "comedy" && activeTab !== "nightlife" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location) => (
                      <Card key={location.id} className="vibe-card-hover">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold flex items-center">
                              {location.name}
                              {location.verified && (
                                <VerifiedIcon className="h-4 w-4 ml-1 text-primary" />
                              )}
                            </h3>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <Badge variant="outline" className="cursor-help">{location.type}</Badge>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-auto">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">More Tags</h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    <Badge variant="outline" className="bg-primary/10">{location.type}</Badge>
                                    {locationTags[location.id]?.map((tag, index) => (
                                      <Badge key={index} variant="outline" className="bg-muted/40">{tag}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mb-3 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>
                              {location.address}, {location.city}, {location.state}
                            </span>
                          </div>
                          
                          <Button className="w-full bg-gradient-vibe" asChild>
                            <Link to={`/venue/${location.id}`}>View Vibes</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <h3 className="text-xl font-semibold mb-2">No locations found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="hidden md:block">
              <NearbyVibesMap />
            </div>
          </div>
        )}
      </main>
      
      <CameraButton />
    </div>
  );
};

export default Explore;
