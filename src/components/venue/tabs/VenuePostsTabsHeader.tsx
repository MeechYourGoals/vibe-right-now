
import React from 'react';
import { Button } from "@/components/ui/button";
import { Grid2X2, ListIcon, Settings, Plus } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import SocialMediaConnectionsSheet from '../SocialMediaConnectionsSheet';

interface VenuePostsTabsHeaderProps {
  activeTab: string;
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
  onConnectedPlatformsChange: (platforms: Record<string, boolean>) => void;
  onAddPost?: () => void;
  venueId?: string;
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
    <div className="flex justify-between items-center mb-2">
      <TabsList className="grid grid-cols-3 w-[300px]">
        <TabsTrigger value="all">All Posts</TabsTrigger>
        <TabsTrigger value="vrn">VRN Content</TabsTrigger>
        <TabsTrigger value="external">External</TabsTrigger>
      </TabsList>
      
      <div className="flex gap-2">
        {onAddPost && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAddPost}
            className="text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Your VRN Post
          </Button>
        )}
        
        <Button 
          variant={viewMode === "list" ? "default" : "outline"} 
          size="sm"
          onClick={() => setViewMode("list")}
        >
          <ListIcon className="h-4 w-4" />
        </Button>
        <Button 
          variant={viewMode === "grid" ? "default" : "outline"} 
          size="sm"
          onClick={() => setViewMode("grid")}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        
        {activeTab === 'external' && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" data-trigger="connections">
                <Settings className="h-4 w-4 mr-1" />
                Connections
              </Button>
            </SheetTrigger>
            <SocialMediaConnectionsSheet 
              onConnectedPlatformsChange={onConnectedPlatformsChange} 
            />
          </Sheet>
        )}
      </div>
    </div>
  );
};

export default VenuePostsTabsHeader;
