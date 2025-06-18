
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Bookmark, MapPin, Clock, Eye } from "lucide-react";
import { Post, User } from "@/types";
import CommentList from "@/components/CommentList";

interface PostCardProps {
  post: Post;
  showComments?: boolean;
  compact?: boolean;
}

const PostCard = ({ post, showComments = false, compact = false }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  const [showCommentsSection, setShowCommentsSection] = useState(showComments);

  // Safely handle author data with proper fallbacks
  const author = post.author || post.user;
  if (!author) {
    console.warn('Post missing author data:', post.id);
    return null; // Don't render if no author data
  }

  // Convert UserProfile to User with required timestamps and safe property access
  const userAsUser: User = {
    id: author.id || 'unknown',
    username: author.username || 'unknown',
    displayName: author.displayName || author.name || author.username || 'Unknown User',
    name: author.name || author.displayName || author.username || 'Unknown User',
    email: author.email || `${author.username || 'unknown'}@example.com`,
    avatar: author.avatar,
    bio: author.bio,
    verified: author.verified || false,
    posts: author.posts,
    followers: author.followers,
    following: author.following,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  return (
    <Card className={`overflow-hidden ${compact ? 'max-w-sm' : 'w-full'}`}>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={userAsUser.avatar} alt={userAsUser.username} />
              <AvatarFallback>{userAsUser.username[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm">{userAsUser.displayName}</span>
                {userAsUser.verified && (
                  <Badge variant="secondary" className="text-xs">✓</Badge>
                )}
              </div>
              <div className="flex items-center text-xs text-muted-foreground space-x-2">
                <span>@{userAsUser.username}</span>
                {post.timestamp && (
                  <>
                    <span>•</span>
                    <span>{formatTimeAgo(post.timestamp)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {post.location && (
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="truncate max-w-24">{post.location.name}</span>
            </div>
          )}
        </div>

        {/* Title */}
        {post.title && (
          <h3 className="font-semibold mb-2">{post.title}</h3>
        )}

        {/* Content */}
        <div className="mb-3">
          <p className="text-sm">{post.content}</p>
        </div>

        {/* Media */}
        {post.media && post.media.length > 0 && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img 
              src={post.media[0].url} 
              alt="Post media"
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {(post.tags || post.vibeTags) && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.vibeTags?.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Expiration indicator */}
        {post.expiresAt && (
          <div className="flex items-center text-xs text-orange-600 mb-3">
            <Clock className="h-3 w-3 mr-1" />
            <span>
              Expires {post.expiresAt > new Date() ? 'in' : ''} {formatTimeAgo(post.expiresAt)}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`p-1 h-8 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{(post.likes || 0) + (isLiked ? 1 : 0)}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCommentsSection(!showCommentsSection)}
              className="p-1 h-8 text-muted-foreground"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{post.comments || 0}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="p-1 h-8 text-muted-foreground">
              <Share className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            {post.isVenuePost && (
              <Badge variant="outline" className="text-xs">
                <Eye className="h-3 w-3 mr-1" />
                Venue
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={`p-1 h-8 ${isSaved ? 'text-blue-500' : 'text-muted-foreground'}`}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showCommentsSection && (
          <CommentList postId={post.id} commentsCount={post.comments || 0} />
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
