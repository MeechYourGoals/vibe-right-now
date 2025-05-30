
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Verified from "@/components/Verified";
import { Heart, MessageCircle, Share, MoreHorizontal, Trash2 } from "lucide-react";
import { Post, Location, Comment } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface VenuePostsListProps {
  posts: Post[];
  venue: Location;
  viewMode: 'grid' | 'list';
  getComments: (postId: string) => Comment[];
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
  onPostDeleted: (postId: string) => void;
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({
  posts,
  venue,
  viewMode,
  getComments,
  subscriptionTier,
  onPostDeleted
}) => {
  const canDeletePosts = subscriptionTier === 'premium' || subscriptionTier === 'pro';

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No posts to display
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.user.profileImage} alt={post.user.displayName} />
                  <AvatarFallback>{post.user.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{post.user.displayName}</span>
                    {post.user.isVerified && <Verified />}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {post.vibeTag && (
                  <Badge variant="secondary" className="text-xs">
                    {post.vibeTag}
                  </Badge>
                )}
                {canDeletePosts && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPostDeleted(post.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <p className="text-sm">{post.content}</p>
            
            {post.images && post.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {post.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Share className="h-4 w-4" />
                  <span className="text-sm">{post.shares}</span>
                </Button>
              </div>
              
              {post.momentScore && (
                <Badge variant="outline" className="text-xs">
                  Moment: {post.momentScore}/10
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VenuePostsList;
