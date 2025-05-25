
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Location } from "@/types";

interface UserPlacesContentProps {
  visitedPlaces: Location[];
  wantToVisitPlaces: Location[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserPlacesContent: React.FC<UserPlacesContentProps> = ({
  visitedPlaces,
  wantToVisitPlaces,
  activeTab,
  setActiveTab
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full">
        <TabsTrigger value="visited" className="flex-1">
          Visited ({visitedPlaces.length})
        </TabsTrigger>
        <TabsTrigger value="want-to-visit" className="flex-1">
          Want to Visit ({wantToVisitPlaces.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="visited" className="mt-4">
        <div className="text-center py-8 text-muted-foreground">
          <p>No places visited yet</p>
        </div>
      </TabsContent>
      
      <TabsContent value="want-to-visit" className="mt-4">
        <div className="text-center py-8 text-muted-foreground">
          <p>No places in wish list yet</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default UserPlacesContent;
