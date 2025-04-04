
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { mockLocations } from "@/mock/data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, VerifiedIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import CameraButton from "@/components/CameraButton";
import SearchVibes from "@/components/SearchVibes";
import NearbyVibesMap from "@/components/NearbyVibesMap";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const handleSearch = (query: string, filterType: string) => {
    setSearchQuery(query);
    if (filterType !== "All") {
      setActiveTab(filterType.toLowerCase());
    } else {
      setActiveTab("all");
    }
  };
  
  const filteredLocations = mockLocations.filter((location) => {
    // Filter by type
    if (activeTab !== "all" && location.type !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        location.name.toLowerCase().includes(query) ||
        location.city.toLowerCase().includes(query) ||
        location.address.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-6 vibe-gradient-text">
            Explore Vibes
          </h1>
          
          <div className="max-w-xl mx-auto mb-6">
            <SearchVibes onSearch={handleSearch} />
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="max-w-2xl mx-auto">
            <TabsList className="grid grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
              <TabsTrigger value="bar">Bars</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="attraction">Attractions</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLocations.map((location) => (
                <Card key={location.id} className="vibe-card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold flex items-center">
                        {location.name}
                        {location.verified && (
                          <VerifiedIcon className="h-4 w-4 ml-1 text-primary" />
                        )}
                      </h3>
                      <Badge variant="outline">{location.type}</Badge>
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
              ))}
              
              {filteredLocations.length === 0 && (
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
