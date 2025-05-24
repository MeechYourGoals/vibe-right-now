
import React from "react";
import { Post, Comment, Location } from "@/types";
import VenuePostsGrid from "./VenuePostsGrid";
import VenuePostsListComponent from "./VenuePostsListComponent";

interface VenuePostsListProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  canDelete: boolean;
  onPostDeleted: (postId: string) => void;
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({
  posts,
  venue,
  viewMode,
  getComments,
  canDelete,
  onPostDeleted
}) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts found for {venue.name}</p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <VenuePostsGrid
        posts={posts}
        canDelete={canDelete}
        onPostDeleted={onPostDeleted}
      />
    );
  }

  return (
    <VenuePostsListComponent
      posts={posts}
      getComments={getComments}
      canDelete={canDelete}
      onPostDeleted={onPostDeleted}
    />
  );
};

export default VenuePostsList;
