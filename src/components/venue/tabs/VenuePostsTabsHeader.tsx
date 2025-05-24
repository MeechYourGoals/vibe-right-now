
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Settings } from "lucide-react";
import SocialMediaConnectionsSheet from "../SocialMediaConnectionsSheet";

interface VenuePostsTabsHeaderProps {
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  isConnectionsOpen: boolean;
  setIsConnectionsOpen: (open: boolean) => void;
}

const VenuePostsTabsHeader: React.FC<VenuePostsTabsHeaderProps> = ({
  viewMode,
  setViewMode,
  isConnectionsOpen,
  setIsConnectionsOpen
}) => {
  return (
    <div className="flex justify-between items-center">
      <TabsList className="bg-neutral-800">
        <TabsTrigger value="posts" className="data-[state=active]:bg-neutral-700 text-neutral-300 data-[state=active]:text-white">Posts</TabsTrigger>
        <TabsTrigger value="reviews" className="data-[state=active]:bg-neutral-700 text-neutral-300 data-[state=active]:text-white">Reviews</TabsTrigger>
        <TabsTrigger value="events" className="data-[state=active]:bg-neutral-700 text-neutral-300 data-[state=active]:text-white">Events</TabsTrigger>
      </TabsList>
      
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
          className="border-neutral-600 text-neutral-300 hover:bg-neutral-800"
        >
          {viewMode === "list" ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsConnectionsOpen(true)}
          className="border-neutral-600 text-neutral-300 hover:bg-neutral-800"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <SocialMediaConnectionsSheet
        isOpen={isConnectionsOpen}
        onClose={() => setIsConnectionsOpen(false)}
      />
    </div>
  );
};

export default VenuePostsTabsHeader;
