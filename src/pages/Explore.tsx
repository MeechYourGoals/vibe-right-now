import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SearchVibes from "@/components/SearchVibes";
import LocationsNearby from "@/components/LocationsNearby";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import VibeSection from "@/components/explore/VibeSection";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const location = useLocation();
  
  // Parse date params from URL if available
  const searchParams = new URLSearchParams(location.search);
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');
  
  const hasDateRange = fromParam || toParam;
  
  const handleSearch = (query: string, type: string, category: string) => {
    setSearchQuery(query);
    setFilterType(type);
  };
  
  return (
    <Layout>
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold vibe-gradient-text mb-2">
            Explore Vibes
          </h1>
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="nearby">
              <TabsList className="mb-4">
                <TabsTrigger value="nearby">Nearby</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="vibes">Vibes</TabsTrigger>
                <TabsTrigger value="deals">Deals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="nearby">
                <LocationsNearby searchQuery={searchQuery} filterType={filterType} />
              </TabsContent>
              
              <TabsContent value="trending">
                <TrendingLocations />
              </TabsContent>
              
              <TabsContent value="vibes">
                <VibeSection />
              </TabsContent>
              
              <TabsContent value="deals">
                <DiscountLocations />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Near You
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 aspect-square">
                <div className="h-full bg-muted rounded-md">
                  {/* Map component goes here */}
                </div>
              </CardContent>
            </Card>
            
            <TrendingLocations />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Explore;
