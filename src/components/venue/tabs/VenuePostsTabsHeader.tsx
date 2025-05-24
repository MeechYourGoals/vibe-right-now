
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Settings } from "lucide-react";
import SocialMediaConnectionsSheet from "../SocialMediaConnectionsSheet";

interface VenuePostsTabsHeaderProps {
  activeTab?: string;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  isConnectionsOpen?: boolean;
  setIsConnectionsOpen?: (open: boolean) => void;
  onConnectedPlatformsChange?: (platforms: Record<string, boolean>) => void;
  onAddPost?: () => void;
  venueId?: string;
}

const VenuePostsTabsHeader: React.FC<VenuePostsTabsHeaderProps> = ({
  activeTab,
  viewMode,
  setViewMode,
  isConnectionsOpen = false,
  setIsConnectionsOpen = () => {},
  onConnectedPlatformsChange = () => {},
  onAddPost = () => {},
  venueId = ""
}) => {
  return (
    <div className="flex justify-between items-center">
      <TabsList className="bg-neutral-800">
        <TabsTrigger value="all" className="data-[state=active]:bg-neutral-700 text-neutral-300 data-[state=active]:text-white">All Posts</TabsTrigger>
        <TabsTrigger value="vrn" className="data-[state=active]:bg-neutral-700 text-neutral-300 data-[state=active]:text-white">VRN</TabsTrigger>
        <TabsTrigger value="external" className="data-[state=active]:bg-neutral-700 text-neutral-300 data-[state=active]:text-white">External</TabsTrigger>
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
