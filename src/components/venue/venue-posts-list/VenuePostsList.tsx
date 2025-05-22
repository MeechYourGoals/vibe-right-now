import React, { useState, useMemo } from "react";
import { PostCard } from "@/components/post";
import { Post, Location, Comment } from "@/types";
import { mockComments } from "@/mock/data";
import EmptyState from "./EmptyState";

interface VenuePostsListProps {
  venue: Location;
  posts: Post[];
  canDelete?: boolean;
  onPostDeleted?: (postId: string) => void;
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({
  venue,
  posts,
  canDelete = false,
  onPostDeleted,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchQuery) {
      return posts;
    }

    const query = searchQuery.toLowerCase();
    return posts.filter((post) => {
      return (
        post.content?.toLowerCase().includes(query) ||
        post.vibeTags?.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [posts, searchQuery]);

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter((comment) => comment.postId === postId);
  };

  return (
    <div className="space-y-6">
      {filteredPosts.length === 0 ? (
        <EmptyState />
      ) : (
        filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            getComments={() => getPostComments(post.id)}
            canDelete={canDelete}
            venue={venue}
            onPostDeleted={onPostDeleted}
          />
        ))
      )}
    </div>
  );
};

export default VenuePostsList;
