
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Grid, List, Plus } from "lucide-react";

interface VenuePostsTabsHeaderProps {
  activeTab: string;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  onConnectedPlatformsChange: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onAddPost: () => void;
  venueId: string;
}

const VenuePostsTabsHeader: React.FC<VenuePostsTabsHeaderProps> = ({
  activeTab,
  viewMode,
  setViewMode,
  onConnectedPlatformsChange,
  onAddPost,
  venueId
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Tabs value={activeTab} className="w-auto">
        <TabsList>
          <TabsTrigger value="internal">Internal Posts</TabsTrigger>
          <TabsTrigger value="external">Social Media</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border p-1">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-7 w-7 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-7 w-7 p-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
        
        <Button onClick={onAddPost} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Post
        </Button>
      </div>
    </div>
  );
};

export default VenuePostsTabsHeader;
