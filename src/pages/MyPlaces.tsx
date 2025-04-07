
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockLocations } from "@/mock/locations";
import { Location } from "@/types";
import { MapPin, Star, Clock, Car, ExternalLink, Calendar, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlaceCard from "@/components/places/PlaceCard";
import TripsList from "@/components/places/TripsList";
import { useState } from "react";

const MyPlaces = () => {
  // Filter locations to get a subset for "Visited" and "Want to Visit"
  const visitedPlaces = mockLocations.slice(0, 5);
  const wantToVisitPlaces = mockLocations.slice(5, 10);
  const [activeSection, setActiveSection] = useState<"places" | "trips">("places");

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">My Places</h1>
        
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant={activeSection === "places" ? "default" : "outline"} 
            onClick={() => setActiveSection("places")}
            className="transition-all duration-300"
          >
            Places
          </Button>
          <Button 
            variant={activeSection === "trips" ? "default" : "outline"} 
            onClick={() => setActiveSection("trips")}
            className="transition-all duration-300"
          >
            Trips
          </Button>
        </div>
        
        {activeSection === "places" ? (
          <Tabs defaultValue="visited" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="visited">Visited</TabsTrigger>
              <TabsTrigger value="want-to-visit">Want to Visit</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visited" className="space-y-4">
              <p className="text-muted-foreground mb-4">Places you've checked in at or marked as visited.</p>
              {visitedPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} visitType="visited" />
              ))}
            </TabsContent>
            
            <TabsContent value="want-to-visit" className="space-y-4">
              <p className="text-muted-foreground mb-4">Places you've saved to visit in the future.</p>
              {wantToVisitPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} visitType="planned" />
              ))}
            </TabsContent>
          </Tabs>
        ) : (
          <TripsList />
        )}
        
        <div className="mt-8 rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
          <p className="font-medium">Community Guidelines</p>
          <p className="mt-1">Post vibes that make others want to visit. No memes, flyers, or unrelated posts please.</p>
        </div>
      </div>
    </Layout>
  );
};

export default MyPlaces;
