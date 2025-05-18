
import { useState, useMemo } from 'react';
import { Post, Comment, Location } from "@/types";

interface UseVenuePostsProps {
  allPosts: Post[];
  filteredPosts: Post[];
  generatedVenuePosts: Post[];
  selectedDays: number[];
  venue: Location;
  getPostComments: (postId: string) => Comment[];
}

export const useVenuePosts = ({
  allPosts,
  filteredPosts,
  generatedVenuePosts,
  selectedDays,
  venue,
  getPostComments
}: UseVenuePostsProps) => {
  // Filter venue posts by selected days
  const filteredVenuePosts = useMemo(() => {
    return selectedDays.length === 0 
      ? generatedVenuePosts 
      : generatedVenuePosts.filter(post => 
          selectedDays.includes(new Date(post.timestamp).getDay())
        );
  }, [generatedVenuePosts, selectedDays]);
  
  return {
    filteredVenuePosts
  };
};
