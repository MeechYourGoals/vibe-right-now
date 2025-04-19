
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { mockLocations } from "@/mock/locations";
import LocationCard from "@/components/LocationCard";
import VibeTags from "@/components/VibeTags";
import { vibeTags } from "@/hooks/useVibeFilters";
import { Location } from "@/types";

const VibeSection = () => {
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  
  // Add vibe tags to locations (for demonstration)
  const locationsWithVibes = useMemo(() => {
    return mockLocations.map(location => {
      // Generate deterministic vibe tags based on location ID
      const seed = parseInt(location.id) || location.id.charCodeAt(0);
      const vibeCount = 1 + (seed % 4); // 1-4 vibes per location
      
      // Select vibes deterministically based on location ID
      const locationVibes = [...vibeTags]
        .sort(() => 0.5 - (seed * 0.0001)) // Deterministic shuffle
        .slice(0, vibeCount);
        
      return {
        ...location,
        vibes: locationVibes
      };
    });
  }, []);
  
  // Filter locations based on selected vibes
  const filteredLocations = useMemo(() => {
    if (selectedVibes.length === 0) {
      // Show random selection when no filters
      return locationsWithVibes
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    }
    
    return locationsWithVibes.filter(location => 
      selectedVibes.some(vibe => location.vibes?.includes(vibe))
    );
  }, [locationsWithVibes, selectedVibes]);
  
  const toggleVibe = (vibe: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibe)
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };
  
  const clearVibes = () => {
    setSelectedVibes([]);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Discover by Vibe
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Select vibes to discover new places that match your mood
          </p>
          <div className="mb-3">
            <VibeTags 
              tags={vibeTags.slice(0, 10)} // Show first 10 vibes only
              selectedTags={selectedVibes}
              onTagClick={toggleVibe}
            />
          </div>
          {selectedVibes.length > 0 && (
            <Button 
              variant="link" 
              size="sm" 
              className="px-0 text-muted-foreground" 
              onClick={clearVibes}
            >
              Clear all
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLocations.length > 0 ? (
            filteredLocations.slice(0, 6).map((location) => (
              <LocationCard 
                key={location.id} 
                location={location as Location} 
                vibes={location.vibes}
              />
            ))
          ) : (
            <div className="col-span-2 py-8 text-center text-muted-foreground">
              <p>No locations match the selected vibes.</p>
              <Button variant="link" onClick={clearVibes}>Clear filters</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VibeSection;
