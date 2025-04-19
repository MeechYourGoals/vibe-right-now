
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import SearchVibes from "@/components/SearchVibes";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Search, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { LocationsNearby } from "@/components/LocationsNearby";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cityCoordinates } from "@/utils/locations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [activeCategory, setActiveCategory] = useState("restaurants");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [recentCities, setRecentCities] = useState<string[]>([]);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse date params from URL if available
  const searchParams = new URLSearchParams(location.search);
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');
  const cityParam = searchParams.get('city');
  const queryParam = searchParams.get('q');
  
  useEffect(() => {
    // Load recent cities from local storage
    try {
      const savedCities = localStorage.getItem("vrnRecentCities");
      if (savedCities) {
        setRecentCities(JSON.parse(savedCities).slice(0, 5));
      }
    } catch (err) {
      console.error("Failed to load recent cities", err);
    }
    
    // Set search query from URL parameters
    if (queryParam) {
      setSearchQuery(queryParam);
    }
    
    // Set city from URL parameter
    if (cityParam) {
      setSearchQuery(cityParam);
      setSelectedCity(cityParam);
      
      // Add to recent cities
      addToRecentCities(cityParam);
    }
  }, [queryParam, cityParam]);
  
  const hasDateRange = fromParam || toParam;
  
  const handleSearch = (query: string, type: string, category: string = "places") => {
    setSearchQuery(query);
    setFilterType(type);
    
    // Check if query matches a city
    const cityKey = Object.keys(cityCoordinates).find(key => 
      cityCoordinates[key].name.toLowerCase().includes(query.toLowerCase())
    );
    
    if (cityKey) {
      const cityName = cityCoordinates[cityKey].name;
      setSelectedCity(cityName);
      addToRecentCities(cityName);
      
      // Update URL
      const newParams = new URLSearchParams(searchParams);
      newParams.set('city', cityName);
      navigate(`${location.pathname}?${newParams.toString()}`);
      
      toast({
        title: `Exploring ${cityName}`,
        description: `Showing places in ${cityName}`,
        duration: 3000,
      });
    } else {
      // Reset selected city if query doesn't match a city
      setSelectedCity(null);
      
      // Update URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('city');
      if (query) {
        newParams.set('q', query);
      } else {
        newParams.delete('q');
      }
      navigate(`${location.pathname}?${newParams.toString()}`);
    }
  };
  
  const addToRecentCities = (cityName: string) => {
    const updatedCities = [cityName, ...recentCities.filter(city => city !== cityName)].slice(0, 5);
    setRecentCities(updatedCities);
    
    try {
      localStorage.setItem("vrnRecentCities", JSON.stringify(updatedCities));
    } catch (err) {
      console.error("Failed to save recent cities", err);
    }
  };
  
  const clearCity = () => {
    setSelectedCity(null);
    
    // Update URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('city');
    navigate(`${location.pathname}?${newParams.toString()}`);
  };
  
  return (
    <Layout>
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold vibe-gradient-text mb-2">
            Explore Vibes
          </h1>
          
          {selectedCity && (
            <Card className="mb-4 mt-2 bg-primary/10 border-primary/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <div>
                    <h3 className="text-md font-medium text-primary-foreground">
                      Exploring {selectedCity}
                    </h3>
                    <p className="text-sm text-primary-foreground/80">
                      Discover the best spots in {selectedCity}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearCity}
                  className="bg-background/50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back to All
                </Button>
              </CardContent>
            </Card>
          )}
          
          {hasDateRange && (
            <Card className="mb-4 mt-2 bg-indigo-50 border-indigo-100">
              <CardContent className="p-4 flex items-center">
                <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                <div>
                  <h3 className="text-md font-medium text-indigo-800">
                    {fromParam && toParam ? 'Exploring future vibes' : 'Events coming up'}
                  </h3>
                  <p className="text-sm text-indigo-700">
                    {fromParam && (
                      <>From {format(new Date(fromParam), 'MMMM d, yyyy')}</>
                    )}
                    {fromParam && toParam && ' to '}
                    {toParam && (
                      <>{format(new Date(toParam), 'MMMM d, yyyy')}</>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          <SearchVibes onSearch={handleSearch} />
          
          {recentCities.length > 0 && !selectedCity && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground pt-1">Recent searches:</span>
              {recentCities.map((city, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="cursor-pointer bg-muted/50 hover:bg-muted flex items-center gap-1"
                  onClick={() => handleSearch(city, "All", "places")}
                >
                  <MapPin className="h-3 w-3" />
                  {city}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs 
              defaultValue="restaurants" 
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="mb-4 flex overflow-x-auto pb-px hide-scrollbar">
                <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
                <TabsTrigger value="bars">Bars</TabsTrigger>
                <TabsTrigger value="sports">Sports</TabsTrigger>
                <TabsTrigger value="comedy">Comedy</TabsTrigger>
                <TabsTrigger value="nightlife">Nightlife</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              
              {["restaurants", "bars", "sports", "comedy", "nightlife", "events"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <LocationsNearby category={tab} searchQuery={selectedCity || searchQuery} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <TrendingLocations city={selectedCity} />
            <DiscountLocations city={selectedCity} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Explore;
