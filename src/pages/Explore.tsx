
import { useState } from "react";
import { Layout } from "@/components/Layout";
import SearchVibes from "@/components/SearchVibes";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { LocationsNearby } from "@/components/LocationsNearby";
import { TrendingLocations } from "@/components/TrendingLocations";
import { DiscountLocations } from "@/components/DiscountLocations";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const location = useLocation();
  
  // Parse date params from URL if available
  const searchParams = new URLSearchParams(location.search);
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');
  
  const hasDateRange = fromParam || toParam;
  
  const handleSearch = (query: string, type: string) => {
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
          <div className="md:col-span-2">
            <Tabs defaultValue="restaurants" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
                <TabsTrigger value="bars">Bars</TabsTrigger>
                <TabsTrigger value="sports">Sports</TabsTrigger>
                <TabsTrigger value="comedy">Comedy</TabsTrigger>
                <TabsTrigger value="nightlife">Nightlife</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              
              {["restaurants", "bars", "sports", "comedy", "nightlife", "events"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <LocationsNearby category={tab} searchQuery={searchQuery} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <TrendingLocations />
            <DiscountLocations />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Explore;
