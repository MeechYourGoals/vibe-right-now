
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceCard } from "@/components/user/PlaceCard";
import { Location } from "@/types";

interface UserPlacesContentProps {
  visitedPlaces: Location[];
  wantToVisitPlaces: Location[];
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const UserPlacesContent = ({ 
  visitedPlaces, 
  wantToVisitPlaces,
  activeTab,
  setActiveTab
}: UserPlacesContentProps) => {
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="visited">Visited</TabsTrigger>
          <TabsTrigger value="want-to-visit">Want to Visit</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visited" className="space-y-4">
          <p className="text-muted-foreground mb-4">Places this user has checked in at or marked as visited.</p>
          {visitedPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visitedPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">This user hasn't visited any places yet.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="want-to-visit" className="space-y-4">
          <p className="text-muted-foreground mb-4">Places this user has saved to visit in the future.</p>
          {wantToVisitPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wantToVisitPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">This user hasn't saved any places to visit.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserPlacesContent;
