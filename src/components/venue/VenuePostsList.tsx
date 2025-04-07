
import React from 'react';
import VenuePost from "@/components/VenuePost";
import PostCard from "@/components/PostCard";
import PostGridItem from "@/components/venue/PostGridItem";
import { Post, Comment, Location } from "@/types";

interface VenuePostsListProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({ 
  posts, 
  venue, 
  viewMode, 
  getComments 
}) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No posts available</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later!</p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {posts.map((post) => (
          post.isVenuePost ? (
            <div key={post.id} className="border-2 border-amber-500/50 rounded-lg overflow-hidden">
              <VenuePost 
                venue={post.location}
                content={post.content}
                media={post.media[0]}
                timestamp={post.timestamp}
              />
            </div>
          ) : (
            <PostCard 
              key={post.id}
              posts={[post]} 
              locationPostCount={1}
              getComments={getComments} 
            />
          )
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostGridItem 
            key={post.id} 
            post={post} 
            isVenuePost={!!post.isVenuePost} 
          />
        ))}
      </div>
    );
  }
};

export default VenuePostsList;
