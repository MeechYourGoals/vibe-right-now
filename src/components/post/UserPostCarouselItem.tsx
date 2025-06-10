
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { Post } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface UserPostCarouselItemProps {
  post: Post;
  onUserClick?: (userId: string) => void;
  onLocationClick?: (locationId: string) => void;
  fullSize?: boolean;
}

const UserPostCarouselItem = ({ post, onUserClick, onLocationClick, fullSize = false }: UserPostCarouselItemProps) => {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (onUserClick) {
      onUserClick(post.user.id);
    } else {
      // Navigate to user profile
      navigate(`/profile/${post.user.username}`);
    }
  };

  if (fullSize) {
    return (
      <div className="bg-background">
        {/* Post Media - Full Size Priority 1: Content Focus */}
        {post.media && post.media.length > 0 && (
          <div className="relative w-full">
            {post.media[0].type === "video" ? (
              <video 
                src={post.media[0].url}
                className="w-full aspect-square object-cover"
                controls
              />
            ) : (
              <img 
                src={post.media[0].url} 
                alt="Post content"
                className="w-full aspect-square object-cover"
              />
            )}
            
            {/* Media count indicator */}
            {post.media.length > 1 && (
              <Badge className="absolute top-3 right-3 bg-black/60 text-white text-xs">
                1/{post.media.length}
              </Badge>
            )}
          </div>
        )}

        {/* Post Content and Actions - Full width */}
        <div className="p-4">
          <p className="text-sm text-foreground mb-3 leading-relaxed">
            {post.content}
          </p>

          {/* Vibe Tags */}
          {post.vibeTags && post.vibeTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {post.vibeTags.slice(0, 4).map((tag, index) => (
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
          <div className="flex items-center justify-between pt-2 border-t border-border/30 mb-3">
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

          {/* Slightly Larger User Attribution - Made more prominent */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 text-sm text-muted-foreground p-2 rounded-lg hover:bg-muted/30"
            onClick={handleUserClick}
          >
            <Avatar className="h-7 w-7">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback className="text-xs">{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <span className="font-medium">@{post.user.username}</span>
              {post.user.verified && (
                <Badge variant="secondary" className="text-xs h-4 px-1">✓</Badge>
              )}
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original compact card layout with larger user section
  return (
    <Card className="overflow-hidden bg-background border border-border/30">
      {/* Post Media - Priority 1: Content Focus */}
      {post.media && post.media.length > 0 && (
        <div className="relative">
          {post.media[0].type === "video" ? (
            <video 
              src={post.media[0].url}
              className="w-full h-56 object-cover"
              controls
            />
          ) : (
            <img 
              src={post.media[0].url} 
              alt="Post content"
              className="w-full h-56 object-cover"
            />
          )}
          
          {post.media.length > 1 && (
            <Badge className="absolute top-2 right-2 bg-black/60 text-white text-xs">
              1/{post.media.length}
            </Badge>
          )}
        </div>
      )}

      <div className="p-4">
        <p className="text-sm text-foreground mb-3 leading-relaxed">
          {post.content}
        </p>

        {post.vibeTags && post.vibeTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {post.vibeTags.slice(0, 3).map((tag, index) => (
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

        <div className="flex items-center justify-between pt-2 border-t border-border/30">
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

        <div className="pt-3 border-t border-border/20 mt-3">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 p-2 rounded-lg hover:bg-muted/30 transition-colors"
            onClick={handleUserClick}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback className="text-sm">{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">@{post.user.username}</span>
              {post.user.verified && (
                <Badge variant="secondary" className="text-xs h-4 px-1">✓</Badge>
              )}
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserPostCarouselItem;
