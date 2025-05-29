
import React from 'react';
import { Post, Comment, Location } from '@/types';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface VenuePostsListProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  canDelete: boolean;
  onPostDeleted: (postId: string) => void;
  subscriptionTier?: string;
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({
  posts,
  venue,
  viewMode,
  getComments,
  canDelete,
  onPostDeleted,
  subscriptionTier = 'standard'
}) => {
  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleDateString();
    } catch {
      return 'Unknown date';
    }
  };

  const getCommentsCount = (post: Post): number => {
    if (typeof post.comments === 'number') {
      return post.comments;
    }
    if (Array.isArray(post.comments)) {
      return post.comments.length;
    }
    return 0;
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts yet. Be the first to share a moment!</p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.user?.profileImage || post.user?.avatar} />
                    <AvatarFallback>
                      {post.user?.displayName?.[0] || post.user?.name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {post.user?.displayName || post.user?.name || 'Unknown User'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(post.timestamp)}
                    </p>
                  </div>
                </div>
                {canDelete && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => onPostDeleted(post.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              
              <p className="text-sm mb-3">{post.content}</p>
              
              {post.vibeTag && (
                <Badge variant="secondary" className="mb-3">
                  {post.vibeTag}
                </Badge>
              )}
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {getCommentsCount(post)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    {post.shares}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.user?.profileImage || post.user?.avatar} />
                  <AvatarFallback>
                    {post.user?.displayName?.[0] || post.user?.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {post.user?.displayName || post.user?.name || 'Unknown User'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatTimestamp(post.timestamp)}
                  </p>
                </div>
              </div>
              {canDelete && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => onPostDeleted(post.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            
            <p className="mb-4">{post.content}</p>
            
            {post.vibeTag && (
              <Badge variant="secondary" className="mb-4">
                {post.vibeTag}
              </Badge>
            )}
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  {post.likes} likes
                </span>
                <span className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  {getCommentsCount(post)} comments
                </span>
                <span className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  {post.shares} shares
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VenuePostsList;
