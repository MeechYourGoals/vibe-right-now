
import React, { useState } from "react";
import { Post, Comment, Location } from "@/types";
import { Card } from "@/components/ui/card";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostMedia from "./PostMedia";
import PostFooter from "./PostFooter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus, UserCheck } from "lucide-react";
import { deletePost } from "@/utils/venue/postManagementUtils";
import UserDropdown from "@/components/venue/post-grid-item/UserDropdown";

interface PostCardProps {
  post?: Post;
  posts?: Post[];
  comments?: Comment[];
  locationPostCount?: number;
  isDetailView?: boolean;
  canDelete?: boolean;
  venue?: Location;
  onPostDeleted?: (postId: string) => void;
  getComments?: (postId: string) => Comment[];
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  posts,
  comments = [],
  locationPostCount,
  isDetailView = false,
  canDelete = false,
  venue,
  onPostDeleted,
  getComments
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  const toggleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  // Generate random user count (between 5 and 120) based on location
  const getUserCount = (locationId: string) => {
    // Use location ID to generate a consistent but seemingly random number
    const seed = parseInt(locationId) || 5;
    return Math.floor((seed * 13) % 115) + 5;
  };
  
  // Handle multiple posts mode (used in feed)
  if (posts && posts.length > 0 && getComments) {
    const firstPost = posts[0];
    
    // Guard against missing location data
    if (!firstPost || !firstPost.location) {
      return null;
    }
    
    return (
      <Card className="overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex flex-col">
                <Link to={`/venue/${firstPost.location.id}`}>
                  <h3 className="text-lg font-semibold hover:underline">{firstPost.location.name}</h3>
                </Link>
                <div className="flex items-center">
                  {locationPostCount !== undefined && (
                    <span className="text-sm text-muted-foreground mr-3">
                      {locationPostCount} posts
                    </span>
                  )}
                  <div className="relative z-10">
                    <UserDropdown 
                      userCount={getUserCount(firstPost.location.id)} 
                      post={firstPost}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className={isFollowing ? "bg-primary/10" : ""}
              onClick={toggleFollow}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="h-4 w-4 mr-1" />
                  Following
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Follow
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            <Link to={`/venue/${firstPost.location.id}`} className="hover:underline">
              {firstPost.location.city}, {firstPost.location.state}
            </Link>
          </p>
        </div>
        
        {posts.map(post => {
          // Skip posts with invalid user data
          if (!post || !post.user) {
            return null;
          }
          
          // Determine if the post is from the venue itself
          const isVenuePost = post.isVenuePost || (post.location?.id === firstPost.location.id);
          
          return (
            <div 
              key={post.id} 
              className={`border-t ${isVenuePost ? 'ring-2 ring-amber-500' : ''}`}
            >
              <PostHeader 
                user={post.user} 
                timestamp={String(post.timestamp)}
                location={post.location}
                isPinned={post.isPinned}
                isVenuePost={isVenuePost}
                canDelete={canDelete}
                onDelete={() => {}}
              />
              
              <div className="px-4">
                <PostContent content={post.content} />
                
                {post.media && post.media.length > 0 && (
                  <PostMedia media={post.media} />
                )}
                
                <PostFooter 
                  post={post} 
                  comments={getComments(post.id)} 
                  isDetailView={false} 
                />
              </div>
            </div>
          );
        })}
      </Card>
    );
  }
  
  // Single post mode
  if (!post) {
    return null; // Don't render if no post is provided
  }
  
  // Don't render if the post has been deleted
  if (isDeleted) {
    return null;
  }

  // Guard against missing user data
  if (!post.user) {
    return (
      <Card className="overflow-hidden p-4">
        <div className="text-center text-muted-foreground">
          Post data is incomplete
        </div>
      </Card>
    );
  }

  const handleDelete = () => {
    if (venue && deletePost(post.id, venue)) {
      setIsDeleted(true);
      if (onPostDeleted) {
        onPostDeleted(post.id);
      }
    }
  };

  const isVenuePost = post.isVenuePost || post.location?.id === venue?.id;

  return (
    <Card className={`overflow-hidden ${isVenuePost ? 'ring-2 ring-amber-500' : ''} ${post.isPinned && !isVenuePost ? 'ring-2 ring-amber-300' : ''}`}>
      <PostHeader 
        user={post.user} 
        timestamp={String(post.timestamp)} 
        location={post.location}
        isPinned={post.isPinned}
        isVenuePost={isVenuePost}
        canDelete={canDelete && !isVenuePost}
        onDelete={handleDelete}
      />
      
      <div className="px-4 py-2 flex justify-end">
        <UserDropdown userCount={getUserCount(post.location.id)} post={post} />
      </div>
      
      <PostContent content={post.content} />
      
      {post.media && post.media.length > 0 && (
        <PostMedia media={post.media} />
      )}
      
      <PostFooter 
        post={post} 
        comments={comments} 
        isDetailView={isDetailView} 
      />
    </Card>
  );
};

export default PostCard;
