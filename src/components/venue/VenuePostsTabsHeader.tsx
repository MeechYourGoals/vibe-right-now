
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

const VenuePostsTabsHeader = ({
  activeTab,
  viewMode,
  setViewMode,
  onConnectedPlatformsChange,
  onAddPost,
  venueId
}: VenuePostsTabsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("grid")}
        >
          <Grid className="h-4 w-4" />
        </Button>
      </div>
      
      <Button onClick={onAddPost} size="sm">
        <Plus className="h-4 w-4 mr-2" />
        Add Post
      </Button>
    </div>
  );
};

export default VenuePostsTabsHeader;
