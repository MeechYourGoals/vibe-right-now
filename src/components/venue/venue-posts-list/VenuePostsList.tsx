
import React from 'react';
import { Location } from "@/types";
import { getPostsForVenue } from "@/services/PostService";
import { getCommentsForPost } from "@/services/CommentService";

interface EmptyStateProps {
  venueName: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ venueName }) => {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
      <p className="text-muted-foreground mb-4">
        Be the first to share your experience at {venueName}!
      </p>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Create Post
      </button>
    </div>
  );
};

interface VenuePostsListProps {
  venue: Location;
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({ venue }) => {
  const posts = getPostsForVenue(venue.id);
  
  if (posts.length === 0) {
    return <EmptyState venueName={venue.name} />;
  }
  
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center mb-3">
            <img 
              src={post.user?.avatar || "https://via.placeholder.com/40"} 
              alt={post.user?.username || "User"}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{post.user?.username || "Anonymous"}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <p className="mb-3">{post.content}</p>
          
          {post.media && post.media.length > 0 && (
            <div className="mb-3 rounded-md overflow-hidden">
              {typeof post.media[0] === 'string' ? (
                <img 
                  src={post.media[0]}
                  alt="Post media"
                  className="w-full h-64 object-cover"
                />
              ) : (
                <img 
                  src={post.media[0].url}
                  alt="Post media"
                  className="w-full h-64 object-cover"
                />
              )}
            </div>
          )}
          
          <div className="flex items-center text-sm text-muted-foreground">
            <button className="mr-4">❤️ {post.likes}</button>
            <button>💬 {typeof post.comments === 'number' ? post.comments : post.comments.length}</button>
          </div>
        </div>
      ))}
      
      <div className="text-center mt-6">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Create Post
        </button>
      </div>
    </div>
  );
};

export { VenuePostsList, EmptyState };
export default VenuePostsList;
