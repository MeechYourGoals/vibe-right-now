
import React, { useMemo } from 'react';
import VenuePost from "@/components/VenuePost";
import PostCard from "@/components/post/PostCard";
import PostGridItem from "@/components/venue/PostGridItem";
import { Post, Comment, Location } from "@/types";
import { getTimeGroup, formatTimeAgo } from "@/mock/time-utils";
import { Badge } from "@/components/ui/badge";
import { PinIcon } from "lucide-react";
import { formatTimestamp } from "@/lib/utils";

interface VenuePostsListProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
}

// Extending Post type for venue-specific functionality
interface ExtendedPost extends Post {
  isVenuePost?: boolean;
  isPinned?: boolean;
  isExternalPost?: boolean;
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({ 
  posts, 
  venue, 
  viewMode, 
  getComments 
}) => {
  // Group posts by time period
  const groupedPosts = useMemo(() => {
    if (!posts.length) return [];
    
    // First sort by timestamp (most recent first)
    const sortedPosts = [...posts].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // Then group by time period
    const groups: {title: string; key: string; posts: Post[]}[] = [
      { title: 'Last 24 Hours', key: 'recent', posts: [] },
      { title: 'This Week', key: 'week', posts: [] },
      { title: 'This Month', key: 'month', posts: [] },
      { title: 'Older', key: 'older', posts: [] },
      { title: 'Pinned Posts', key: 'pinned', posts: [] },
    ];
    
    sortedPosts.forEach(post => {
      const extendedPost = post as ExtendedPost;
      if (extendedPost.isPinned) {
        groups.find(g => g.key === 'pinned')?.posts.push(post);
      } else {
        const timeGroup = getTimeGroup(post.timestamp);
        groups.find(g => g.key === timeGroup)?.posts.push(post);
      }
    });
    
    // Filter out empty groups
    return groups.filter(group => group.posts.length > 0);
  }, [posts]);
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No posts available</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groupedPosts.map(group => (
        <div key={group.key} className="space-y-4">
          <h3 className="text-lg font-medium">{group.title}</h3>
          
          {viewMode === "list" ? (
            <div className="space-y-4">
              {group.posts.map((post) => (
                <div key={post.id} className="relative">
                  {(post as ExtendedPost).isPinned && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-300 flex items-center">
                        <PinIcon className="h-3 w-3 mr-1" />
                        Pinned
                      </Badge>
                    </div>
                  )}
                  <div className={`overflow-hidden rounded-lg border ${getBorderClass(post as ExtendedPost)}`}>
                    {(post as ExtendedPost).isVenuePost ? (
                      <VenuePost 
                        venue={venue}
                        content={post.content}
                        media={post.media[0] as {type: "image" | "video"; url: string}}
                        timestamp={formatTimestamp(post.timestamp)}
                        timeAgo={formatTimeAgo(post.timestamp)}
                      />
                    ) : (
                      <PostCard 
                        key={post.id}
                        posts={[post]} 
                        locationPostCount={1}
                        getComments={getComments}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {group.posts.map((post) => (
                <PostGridItem 
                  key={post.id} 
                  post={post} 
                  isVenuePost={!!(post as ExtendedPost).isVenuePost}
                  timeAgo={formatTimeAgo(post.timestamp)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Helper function to determine border class based on post type
const getBorderClass = (post: ExtendedPost): string => {
  if (post.isPinned) {
    return "border-amber-500";
  }
  if (post.isVenuePost) {
    return "border-amber-500/50";
  }
  if (post.isExternalPost) {
    return "border-blue-500/50";
  }
  return ""; // Regular border for user posts
};

export default VenuePostsList;
