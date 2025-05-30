
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grid2X2, List, MapPin, Users, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { mockLocations } from "@/mock/data";
import { Link } from "react-router-dom";
import { vibeTags } from "@/hooks/useUserProfile";
import { getMediaForLocationMock } from "@/utils/explore/mockGenerators";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface VibesTabContentProps {
  selectedVibe: string;
}

const VibesTabContent: React.FC<VibesTabContentProps> = ({ selectedVibe }) => {
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("list");
  const [sortOption, setSortOption] = useState("trending");
  const [filteredLocations, setFilteredLocations] = useState<any[]>([]);
  const [popularVibes, setPopularVibes] = useState<string[]>([]);

  useEffect(() => {
    // Generate popular vibes (could be fetched from server in real app)
    const randomVibes = [...vibeTags]
      .sort(() => 0.5 - Math.random())
      .slice(0, 9);
    
    setPopularVibes(randomVibes);
    
    // Get locations matching the selected vibe or random trending locations
    const matchingLocations = selectedVibe
      ? mockLocations.filter(loc => 
          loc.vibes && 
          loc.vibes.some(vibe => 
            vibe.toLowerCase().includes(selectedVibe.toLowerCase())
          )
        )
      : mockLocations.filter(loc => loc.vibes && loc.vibes.length > 0);
    
    // Apply sorting
    let sortedLocations = [...matchingLocations];
    
    switch (sortOption) {
      case "trending":
        // Sort by trending (simulated with random)
        sortedLocations.sort(() => 0.5 - Math.random());
        break;
      case "distance":
        // Sort by distance (mock implementation)
        sortedLocations.sort((a, b) => {
          const distA = parseInt(a.id) % 10; // Mock distance
          const distB = parseInt(b.id) % 10;
          return distA - distB;
        });
        break;
      case "rating":
        // Sort by rating (mock implementation)
        sortedLocations.sort((a, b) => {
          const ratingA = (parseInt(a.id) % 5) + 1; // Mock rating 1-5
          const ratingB = (parseInt(b.id) % 5) + 1;
          return ratingB - ratingA;
        });
        break;
    }
    
    setFilteredLocations(sortedLocations.slice(0, 12));
    
  }, [selectedVibe, sortOption]);

  const handleVibeSelect = (vibe: string) => {
    // You would typically navigate or update URL with the selected vibe
    window.location.href = `/explore?vibe=${vibe.toLowerCase()}`;
  };

  return (
    <div className="space-y-6">
      {/* Sort and display options */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <ToggleGroup type="single" value={displayMode} onValueChange={(value) => value && setDisplayMode(value as "grid" | "list")}>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid2X2 className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* Popular vibes section */}
      <div>
        <h3 className="text-sm font-medium mb-2">Popular Vibes</h3>
        <div className="flex flex-wrap gap-2">
          {popularVibes.map((vibe, index) => (
            <Badge 
              key={index} 
              variant={selectedVibe === vibe ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
              onClick={() => handleVibeSelect(vibe)}
            >
              {vibe}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Locations with the selected vibe */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {selectedVibe ? `Places with ${selectedVibe} Vibes` : "Trending Places"}
        </h3>
        
        {filteredLocations.length === 0 ? (
          <div className="text-center py-6">
            <p>No locations found with this vibe.</p>
            <Button variant="outline" className="mt-2">Explore other vibes</Button>
          </div>
        ) : displayMode === "list" ? (
          <div className="space-y-4">
            {filteredLocations.map(location => (
              <Link key={location.id} to={`/venue/${location.id}`}>
                <Card className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={getMediaForLocationMock(location).url} alt={location.name} />
                        <AvatarFallback>{location.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{location.name}</h4>
                          {location.vibes && location.vibes.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {location.vibes[0]}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {location.city}, {location.state}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                          <Users className="h-3 w-3 mr-1" />
                          {Math.floor(Math.random() * 200) + 10} people here now
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredLocations.map(location => (
              <Link key={location.id} to={`/venue/${location.id}`}>
                <Card className="hover:bg-accent/50 transition-colors h-full">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={getMediaForLocationMock(location).url} alt={location.name} />
                        <AvatarFallback>{location.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h4 className="font-medium">{location.name}</h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {location.city}, {location.state}
                      </div>
                      {location.vibes && location.vibes.length > 0 && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {location.vibes[0]}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VibesTabContent;
