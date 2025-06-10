
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Post } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface UserPostCarouselItemProps {
  post: Post;
  onUserClick?: (userId: string) => void;
  onLocationClick?: (locationId: string) => void;
}

const UserPostCarouselItem = ({ post, onUserClick, onLocationClick }: UserPostCarouselItemProps) => {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <Card className="overflow-hidden bg-background border border-border/50">
      {/* User Header - Minimal */}
      <div className="p-3 pb-2">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80"
          onClick={() => onUserClick?.(post.user.id)}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium truncate">@{post.user.username}</span>
              {post.user.verified && (
                <Badge variant="secondary" className="text-xs h-4 px-1">✓</Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div className="relative">
          {post.media[0].type === "video" ? (
            <video 
              src={post.media[0].url}
              className="w-full h-48 object-cover"
              controls
            />
          ) : (
            <img 
              src={post.media[0].url} 
              alt="Post content"
              className="w-full h-48 object-cover"
            />
          )}
          
          {/* Media count indicator */}
          {post.media.length > 1 && (
            <Badge className="absolute top-2 right-2 bg-black/50 text-white text-xs">
              1/{post.media.length}
            </Badge>
          )}
        </div>
      )}

      {/* Post Content */}
      <div className="p-3 pt-2">
        <p className="text-sm text-foreground mb-3 line-clamp-3">
          {post.content}
        </p>

        {/* Vibe Tags */}
        {post.vibeTags && post.vibeTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.vibeTags.slice(0, 2).map((tag, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs bg-primary/10 text-primary border-primary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-red-500">
              <Heart className="h-4 w-4 mr-1" />
              <span className="text-xs">{post.likes || 0}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-blue-500">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">{post.comments || 0}</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserPostCarouselItem;
