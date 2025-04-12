
import React, { useState } from "react";
import { PostCard } from "@/components/post";
import { Skeleton } from "@/components/ui/skeleton";
import PostGridItem from "./PostGridItem";
import { mockPosts, mockComments } from "@/mock/data";
import { Post, Comment } from "@/types";
import { isWithinThreeMonths } from "@/mock/time-utils";

interface ProfileTabContentProps {
  activeTab: string;
  viewMode: "list" | "grid";
  userPosts: Post[];
  getComments: (postId: string) => Comment[];
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({ 
  activeTab, 
  viewMode, 
  userPosts, 
  getComments 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Group posts by location
  const postsGroupedByLocation = React.useMemo(() => {
    const groupedPosts: Record<string, Post[]> = {};
    
    userPosts.forEach(post => {
      const locationId = post.location.id;
      if (!groupedPosts[locationId]) {
        groupedPosts[locationId] = [];
      }
      groupedPosts[locationId].push(post);
    });
    
    // Sort each location's posts by timestamp (most recent first)
    Object.keys(groupedPosts).forEach(locationId => {
      groupedPosts[locationId].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    });
    
    return groupedPosts;
  }, [userPosts]);

  // Calculate the number of posts per location
  const locationPostCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    userPosts.forEach(post => {
      const locationId = post.location.id;
      counts[locationId] = (counts[locationId] || 0) + 1;
    });
    return counts;
  }, [userPosts]);

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className={viewMode === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
          {Array.from({ length: 6 }).map((_, i) => (
            viewMode === "list" ? (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              <Skeleton key={i} className="w-full aspect-square rounded-lg" />
            )
          ))}
        </div>
      ) : (
        <>
          {Object.keys(postsGroupedByLocation).length > 0 ? (
            viewMode === "list" ? (
              Object.entries(postsGroupedByLocation).map(([locationId, posts]) => (
                <PostCard 
                  key={locationId} 
                  posts={posts} 
                  locationPostCount={locationPostCounts[locationId]}
                  getComments={getComments}
                />
              ))
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(postsGroupedByLocation).map(([locationId, posts]) => (
                  posts.map(post => (
                    <PostGridItem key={post.id} post={post} />
                  ))
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                This user hasn't posted any vibes yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileTabContent;
