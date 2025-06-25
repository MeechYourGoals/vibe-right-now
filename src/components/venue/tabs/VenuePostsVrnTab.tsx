
import React from 'react';
import { Post, Comment, Location } from "@/types";
import VenuePostsList from "@/components/venue/VenuePostsList";
import { Button } from "@/components/ui/button";

interface VenuePostsVrnTabProps {
  filteredVenuePosts: Post[];
  filteredPosts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  subscriptionTier?: 'free' | 'plus' | 'premium' | 'pro';
  onPostDeleted?: (postId: string) => void;
}

const VenuePostsVrnTab: React.FC<VenuePostsVrnTabProps> = ({
  filteredVenuePosts,
  filteredPosts,
  venue,
  viewMode,
  getComments,
  subscriptionTier = 'free',
  onPostDeleted
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">VRN Content</h3>
          <p className="text-sm text-muted-foreground">Content posted on VRN by users and venue owners</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Filter Content
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="border-l-4 border-amber-500 pl-4 py-2">
          <h4 className="text-sm font-medium text-amber-700 dark:text-amber-300">Venue Posts</h4>
          <p className="text-xs text-muted-foreground">
            Official content from {venue.name}
          </p>
        </div>
        
        <VenuePostsList 
          posts={filteredVenuePosts} 
          venue={venue} 
          viewMode={viewMode} 
          getComments={getComments}
          subscriptionTier={subscriptionTier}
          onPostDeleted={onPostDeleted}
        />
        
        <div className="border-l-4 border-blue-500 pl-4 py-2 mt-4">
          <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">User Posts</h4>
          <p className="text-xs text-muted-foreground">
            Content from users who visited {venue.name}
          </p>
        </div>
        
        <VenuePostsList 
          posts={filteredPosts} 
          venue={venue} 
          viewMode={viewMode} 
          getComments={getComments}
          subscriptionTier={subscriptionTier}
          onPostDeleted={onPostDeleted}
        />
      </div>
    </div>
  );
};

export default VenuePostsVrnTab;
