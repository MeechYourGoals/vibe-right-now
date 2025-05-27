
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid, List, Plus, Link2 } from "lucide-react";

interface VenuePostsTabsHeaderProps {
  activeTab: string;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
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
      <div className="flex items-center gap-2">
        <Badge variant="outline">{activeTab}</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        <Button onClick={onAddPost} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Post
        </Button>
      </div>
    </div>
  );
};

export default VenuePostsTabsHeader;
