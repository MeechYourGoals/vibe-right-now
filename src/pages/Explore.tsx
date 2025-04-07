import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { mockLocations } from "@/mock/data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, VerifiedIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import CameraButton from "@/components/CameraButton";
import SearchVibes from "@/components/SearchVibes";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import { Location } from "@/types";
import VenuePost from "@/components/VenuePost";

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

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchedCity, setSearchedCity] = useState("");
  const [searchedState, setSearchedState] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);
  const [locationTags, setLocationTags] = useState<Record<string, string[]>>({});
  
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    
    if (q) {
      setSearchQuery(q);
      
      const parts = q.split(',');
      const city = parts[0].trim();
      const state = parts.length > 1 ? parts[1].trim() : "";
      
      setSearchedCity(city);
      setSearchedState(state);
      
      handleSearch(q, "All", "places");
    }
  }, [location.search]);
  
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
    
    if (filterType !== "All") {
      setActiveTab(filterType.toLowerCase());
    } else {
      setActiveTab("all");
    }
    
    let city = "";
    let state = "";
    
    if (query) {
      const parts = query.split(',');
      city = parts[0].trim();
      state = parts.length > 1 ? parts[1].trim() : "";
      setSearchedCity(city);
      setSearchedState(state);
    } else {
      setSearchedCity("");
      setSearchedState("");
    }
    
    let results = [...mockLocations];
    
    if (category === "places" && city) {
      results = generateMockLocationsForCity(city, state);
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
    
    setFilteredLocations(results);
    
    if (query) {
      navigate(`/explore?q=${encodeURIComponent(query)}`, { replace: true });
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
    }
    
    if (value !== "all") {
      results = results.filter(location => location.type === value);
    }
    
    setFilteredLocations(results);
  };

  const getPageTitle = () => {
    if (searchedCity) {
      return `Explore Vibes in ${searchedCity}${searchedState ? `, ${searchedState}` : ''}`;
    }
    return "Explore Vibes";
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
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-3 md:grid-cols-7">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
              <TabsTrigger value="bar">Bars</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="attraction">Attractions</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
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
          </div>
          
          <div className="hidden md:block">
            <NearbyVibesMap />
          </div>
        </div>
      </main>
      
      <CameraButton />
    </div>
  );
};

export default Explore;
