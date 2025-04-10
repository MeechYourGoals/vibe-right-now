
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, Eye, Image } from "lucide-react";
import { Post, Comment, Location } from "@/types";
import { formatDistanceToNow } from "date-fns";
import PostMedia from "./PostMedia";
import CommentList from "@/components/CommentList";
import { formatTimestamp } from "@/lib/utils";

interface PostContentProps {
  location: Location;
  posts: Post[];
  displayedPosts: Post[];
  showAllPosts: boolean;
  setShowAllPosts: (show: boolean) => void;
  hasMorePosts: boolean;
  isSinglePost: boolean;
  showComments: Record<string, boolean>;
  toggleComments: (postId: string) => void;
  likeCounts: Record<string, number>;
  likedPosts: Record<string, boolean>;
  handleLike: (postId: string) => void;
  getComments?: (postId: string) => Comment[];
}

const PostContent: React.FC<PostContentProps> = ({
  location,
  posts,
  displayedPosts,
  showAllPosts,
  setShowAllPosts,
  hasMorePosts,
  isSinglePost,
  showComments,
  toggleComments,
  likeCounts,
  likedPosts,
  handleLike,
  getComments
}) => {
  const formatTime = (timestamp: string | Date) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const getLocationCategories = () => {
    if (!location || !location.type) {
      return ['venue']; // Default if location type is missing
    }
    
    const mainType = location.type;
    const secondaryTypes = [];
    
    if (mainType === "event") {
      if (location.name.toLowerCase().includes("festival")) {
        secondaryTypes.push("music");
      } else if (location.name.toLowerCase().includes("rodeo")) {
        secondaryTypes.push("sports");
      } else if (location.name.toLowerCase().includes("comedy") || location.name.toLowerCase().includes("laugh")) {
        secondaryTypes.push("comedy");
      }
    }
    
    if (mainType === "attraction") {
      if (location.name.toLowerCase().includes("ski") || location.name.toLowerCase().includes("snow")) {
        secondaryTypes.push("winter sports");
      } else if (location.name.toLowerCase().includes("beach") || location.name.toLowerCase().includes("ocean")) {
        secondaryTypes.push("beach");
      }
    }
    
    return [mainType, ...secondaryTypes];
  };

  const locationCategories = getLocationCategories();
  const allMedia = posts.reduce((acc, post) => acc + post.media.length, 0);

  return (
    <CardContent className="p-4">
      <div className="flex flex-wrap gap-2 mb-3">
        {locationCategories.map((category, index) => (
          <Badge key={index} variant="outline" className="bg-muted">
            {category}
          </Badge>
        ))}
      </div>
      
      <PostMedia posts={showAllPosts ? posts : posts.slice(0, 4)} isSinglePost={isSinglePost} />

      <div className="space-y-4">
        {displayedPosts.map((post) => (
          <div key={post.id} className="border-t pt-3 first:border-t-0 first:pt-0">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Link to={`/user/${post.user.username}`} className="text-sm font-medium hover:underline">
                  @{post.user.username}
                </Link>
                <div className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</div>
              </div>
            </div>
            <p className="mb-2">{post.content}</p>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 px-2 ${likedPosts[post.id] ? 'text-accent' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`h-4 w-4 ${likedPosts[post.id] ? 'fill-accent' : ''}`} />
                  <span>{likeCounts[post.id]}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1 px-2"
                  onClick={() => toggleComments(post.id)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments}</span>
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                {post.media.length > 0 && (
                  <span className="flex items-center">
                    <Image className="h-3 w-3 mr-1" />
                    {post.media.length}
                  </span>
                )}
              </div>
            </div>
            
            {showComments[post.id] && getComments && (
              <CommentList 
                postId={post.id} 
                commentsCount={post.comments} 
              />
            )}
          </div>
        ))}
        
        {hasMorePosts && !showAllPosts && (
          <Button 
            variant="outline" 
            className="w-full mt-2" 
            onClick={() => setShowAllPosts(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View all {posts.length} posts
          </Button>
        )}
        
        {showAllPosts && hasMorePosts && (
          <Button 
            variant="outline" 
            className="w-full mt-2" 
            onClick={() => setShowAllPosts(false)}
          >
            Show fewer posts
          </Button>
        )}
      </div>
    </CardContent>
  );
};

export default PostContent;
