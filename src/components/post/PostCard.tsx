
import React, { useState } from 'react';
import { Post, Comment } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, Pin, 
  ChevronDown, ChevronUp, Bookmark, BookmarkCheck 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { getMediaType, getMediaUrl, hasMedia, ensureMediaFormat } from "@/utils/mediaUtils";

export interface PostCardProps {
  post: Post;
  comments?: Comment[];
  locationPostCount?: number;
  getComments?: (postId: string) => Comment[];
  canDelete?: boolean;
  venue?: any;
  onPostDeleted?: (postId: string) => void;
  posts?: Post[];
}

const PostCard = ({ post, comments, locationPostCount, getComments, canDelete, venue, onPostDeleted }: PostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(post.saved || false);
  
  // Get post comments if a getter function is provided
  const postComments = comments || (getComments ? getComments(post.id) : []);
  
  // Ensure media is in the correct format
  const formattedMedia = post.media ? ensureMediaFormat(post.media) : [];
  
  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };
  
  // Show only first few lines of content when not expanded
  const renderContent = () => {
    if (isExpanded || post.content.length < 150) {
      return post.content;
    }
    
    return (
      <>
        {post.content.substring(0, 150)}...
        <span 
          onClick={() => setIsExpanded(true)}
          className="text-primary cursor-pointer hover:underline ml-1"
        >
          Read more
        </span>
      </>
    );
  };
  
  return (
    <Card className="mb-4 overflow-hidden border-border/40">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={post.user?.avatar} alt={post.user?.username} />
                <AvatarFallback>{post.user?.name?.substring(0, 2) || "UN"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center">
                  <h3 className="text-sm font-medium">{post.user?.name || "Unknown User"}</h3>
                  {post.user?.verified && (
                    <span className="ml-1 text-blue-500">✓</span>
                  )}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <p>@{post.user?.username || "user"}</p>
                  <span className="mx-1">•</span>
                  <span>{formatDistanceToNow(new Date(post.timestamp))} ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              {post.isPinned && (
                <span className="mr-2 flex items-center text-xs text-primary">
                  <Pin className="h-3 w-3 mr-1" />
                  Pinned
                </span>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={toggleSaved}>
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="mr-2 h-4 w-4" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Save post</span>
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Post Content */}
        <div className="px-4 py-2">
          <p className="text-sm">{renderContent()}</p>
          
          {post.vibeTags && post.vibeTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.vibeTags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-primary/5">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Post Media */}
        {hasMedia(post.media) && formattedMedia.length > 0 && (
          <div className="mt-2">
            {getMediaType(formattedMedia[0]) === "image" ? (
              <img
                src={getMediaUrl(formattedMedia[0])}
                alt="Post"
                className="w-full object-cover max-h-96"
              />
            ) : (
              <video
                src={getMediaUrl(formattedMedia[0])}
                controls
                className="w-full max-h-96"
              />
            )}
          </div>
        )}
      </CardContent>
      
      {/* Post Footer */}
      <CardFooter className="p-3 border-t border-border/40 flex justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">{typeof post.comments === 'number' ? post.comments : (postComments?.length || 0)}</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        {isExpanded && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2"
            onClick={() => setIsExpanded(false)}
          >
            <ChevronUp className="h-4 w-4 mr-1" />
            <span className="text-xs">Collapse</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
