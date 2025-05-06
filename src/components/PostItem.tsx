
import React from 'react';
import { Post } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Clock, Pin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getMediaType, getMediaUrl, hasMedia, ensureMediaFormat } from "@/utils/mediaUtils";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  // Ensure media is in the correct format
  const formattedMedia = post.media ? ensureMediaFormat(post.media) : [];
  
  return (
    <Card className="mb-4 border-border/40">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.user?.avatar} />
              <AvatarFallback>{post.user?.username?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <p className="font-medium">{post.user?.name}</p>
                {post.user?.verified && (
                  <span className="ml-1 text-blue-500">✓</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{post.user?.username}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDistanceToNow(new Date(post.timestamp))} ago</span>
            </div>
            {post.isPinned && (
              <div className="flex items-center mt-1">
                <Pin className="h-3 w-3 text-primary mr-1" />
                <span className="text-xs text-primary">Pinned</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm">{post.content}</p>
        </div>

        {hasMedia(post.media) && formattedMedia.length > 0 && (
          <div className="mt-3 grid grid-cols-1 gap-2">
            {getMediaType(formattedMedia[0]) === "image" ? (
              <img
                src={getMediaUrl(formattedMedia[0])}
                alt="Post content"
                className="rounded-md w-full object-cover max-h-96"
              />
            ) : (
              <video
                src={getMediaUrl(formattedMedia[0])}
                controls
                className="rounded-md w-full"
              />
            )}
          </div>
        )}
        
        {post.vibeTags && post.vibeTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.vibeTags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-3 pt-0 border-t border-border/40 flex justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{typeof post.comments === 'number' ? post.comments : 0}</span>
          </button>
        </div>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <Share2 className="h-4 w-4" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default PostItem;
