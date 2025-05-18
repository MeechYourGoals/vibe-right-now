import { useState, useMemo } from "react";
import { Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Comment, Post, Location } from "@/types";
import DayOfWeekFilter from "@/components/venue/DayOfWeekFilter";
import VenueProfileHeader from "@/components/venue/VenueProfileHeader";
import VenueMap from "@/components/venue/VenueMap";
import VenuePostsContent from "@/components/venue/VenuePostsContent";
import WaitTimeDisplay from "@/components/venue/WaitTimeDisplay";
import WaitTimeUpdater from "@/components/venue/WaitTimeUpdater";
import ExpandedMap from "@/components/venue/ExpandedMap";

interface VenueProfileContentProps {
  venue: Location;
  venuePosts: Post[];
  generatedVenuePosts: Post[];
  getPostComments: (postId: string) => Comment[];
  isVenueOwner: boolean;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  isMapExpanded: boolean;
  toggleMapExpansion: () => void;
}

const VenueProfileContent = ({
  venue,
  venuePosts,
  generatedVenuePosts,
  getPostComments,
  isVenueOwner,
  subscriptionTier,
  isMapExpanded,
  toggleMapExpansion
}: VenueProfileContentProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const filteredPosts = useMemo(() => {
    if (selectedDays.length === 0) {
      return venuePosts;
    }
    
    return venuePosts.filter(post => 
      selectedDays.includes(new Date(post.timestamp).getDay())
    );
  }, [venuePosts, selectedDays]);

  const allPosts = useMemo(() => {
    // Filter venue-specific posts by selected days
    const filteredVenuePosts = selectedDays.length === 0 
      ? generatedVenuePosts 
      : generatedVenuePosts.filter(post => 
          selectedDays.includes(new Date(post.timestamp).getDay())
        );
    
    // Combine and sort all posts by timestamp
    const combined = [...filteredPosts, ...filteredVenuePosts].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return combined;
  }, [filteredPosts, generatedVenuePosts, selectedDays]);

  const handleDayToggle = (dayIndex: number) => {
    setSelectedDays(prev => {
      if (prev.includes(dayIndex)) {
        return prev.filter(day => day !== dayIndex);
      } else {
        return [...prev, dayIndex];
      }
    });
  };
  
  const clearDayFilters = () => {
    setSelectedDays([]);
  };

  return (
    <>
      {isMapExpanded && (
        <ExpandedMap venue={venue} toggleMapExpansion={toggleMapExpansion} />
      )}
      
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect p-6 rounded-xl mb-6">
            <VenueProfileHeader venue={venue} onMapExpand={toggleMapExpansion} />
            
            {/* Display wait time info if available */}
            <WaitTimeDisplay venueId={venue.id} className="mb-4" />
            
            <VenueMap venue={venue} onExpand={toggleMapExpansion} />
            
            {/* Show wait time updater for venue owners with pro subscription */}
            {isVenueOwner && (
              <div className="mt-4">
                <WaitTimeUpdater 
                  venueId={venue.id} 
                  subscriptionTier={subscriptionTier} 
                />
              </div>
            )}
          </div>
          
          <DayOfWeekFilter 
            selectedDays={selectedDays} 
            onDayToggle={handleDayToggle} 
            onClearFilters={clearDayFilters} 
          />
          
          <VenuePostsContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            viewMode={viewMode}
            setViewMode={setViewMode}
            allPosts={allPosts}
            filteredPosts={filteredPosts}
            generatedVenuePosts={generatedVenuePosts}
            selectedDays={selectedDays}
            venue={venue}
            getPostComments={getPostComments}
          />
        </div>
      </main>
    </>
  );
};

export default VenueProfileContent;
