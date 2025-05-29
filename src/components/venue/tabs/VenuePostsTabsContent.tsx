
import React from 'react';
import VenuePostsList from '../venue-posts-list/VenuePostsList';
import { Post, Comment, Location } from '@/types';

interface VenuePostsTabsContentProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  canDelete: boolean;
  onPostDeleted: (postId: string) => void;
}

const VenuePostsTabsContent: React.FC<VenuePostsTabsContentProps> = ({
  posts,
  venue,
  viewMode,
  getComments,
  canDelete,
  onPostDeleted
}) => {
  return (
    <div className="space-y-4">
      <VenuePostsList
        posts={posts}
        venue={venue}
        viewMode={viewMode}
        getComments={getComments}
        canDelete={canDelete}
        onPostDeleted={onPostDeleted}
        subscriptionTier="standard"
      />
    </div>
  );
};

export default VenuePostsTabsContent;
