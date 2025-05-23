
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VerifiedBadge from "@/components/icons/VerifiedIcon";
import { MoreHorizontal, MapPin, Pin, Building } from "lucide-react";
import PostMedia from "@/components/post/PostMedia";
import PostFooter from "@/components/post/PostFooter";
import { Post, User, Location, Media } from "@/types";

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
  onShare?: (postId: string) => void;
}

interface PostHeaderProps {
  author: User;
  location: Location;
  timestamp: string;
  isPinned?: boolean;
  isVenueOwned?: boolean;
}

interface PostContentProps {
  content: string;
}

const PostHeader = ({ author, location, timestamp, isPinned, isVenueOwned }: PostHeaderProps) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else {
      return `${days}d`;
    }
  };

  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-sm">{author.name}</span>
              {author.isVerified && <VerifiedBadge />}
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{location.name}</span>
              <span>•</span>
              <span>{formatTimestamp(timestamp)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isPinned && (
            <Badge variant="secondary" className="text-xs">
              <Pin className="h-3 w-3 mr-1" />
              Pinned
            </Badge>
          )}
          {isVenueOwned && (
            <Badge variant="outline" className="text-xs">
              <Building className="h-3 w-3 mr-1" />
              Venue
            </Badge>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

const PostContent = ({ content }: PostContentProps) => {
  return (
    <CardContent className="pb-4">
      <p className="text-sm">{content}</p>
    </CardContent>
  );
};

const PostCard = ({ post, onLike, onComment, onShare }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    if (onLike) {
      onLike(post.id);
    }
  };

  const handleComment = (comment: string) => {
    if (onComment) {
      onComment(post.id, comment);
    }
  };

  // Convert media to proper Media array
  const mediaArray: Media[] = Array.isArray(post.media) 
    ? post.media.map(item => 
        typeof item === 'string' 
          ? { id: Math.random().toString(), type: 'image' as const, url: item }
          : item
      )
    : [];

  return (
    <Card className="vibe-card overflow-hidden">
      <PostHeader 
        author={post.author} 
        location={post.location} 
        timestamp={post.timestamp}
        isPinned={post.isPinned}
        isVenueOwned={post.isVenueOwned}
      />
      
      <PostContent content={post.content} />
      
      {mediaArray.length > 0 && (
        <PostMedia media={mediaArray} />
      )}
      
      <PostFooter
        post={post}
        isLiked={isLiked}
        likesCount={likesCount}
        onLike={handleLike}
        onComment={() => setShowComments(!showComments)}
        onShare={() => onShare?.(post.id)}
      />
      
      {showComments && post.comments && (
        <div className="px-4 pb-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="border-t pt-2 mt-2">
              <div className="flex items-start space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                  <AvatarFallback className="text-xs">{comment.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-xs">{comment.user.name}</span>
                    {comment.user.isVerified && <VerifiedBadge />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
