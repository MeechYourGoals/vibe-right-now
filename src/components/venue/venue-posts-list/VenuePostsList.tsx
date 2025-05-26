
import React from "react";
import { Post, Comment, Location } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share, MapPin, Star } from "lucide-react";
import Verified from "@/components/Verified";

interface VenuePostsListProps {
  posts: Post[];
  venue: Location;
  viewMode: "list" | "grid";
  getComments: (postId: string) => Comment[];
  subscriptionTier?: 'standard' | 'plus' | 'premium' | 'pro';
  canDelete?: boolean;
  onPostDeleted?: (postId: string) => void;
}

const VenuePostsList: React.FC<VenuePostsListProps> = ({
  posts,
  venue,
  viewMode,
  getComments,
  subscriptionTier = 'standard',
  canDelete = false,
  onPostDeleted
}) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-400">No posts found for {venue.name}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="bg-neutral-900 border-neutral-700">
          <CardHeader className="pb-3">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {post.user.name}
                  </h3>
                  {post.user.isVerified && <Verified />}
                  <span className="text-xs text-neutral-400">
                    @{post.user.username}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-3 w-3 text-neutral-400" />
                  <span className="text-xs text-neutral-400">
                    {post.location.name}, {post.location.city}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-neutral-400">
                      {post.location.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm text-neutral-200 mb-4">{post.content}</p>
            
            {post.media && post.media.length > 0 && (
              <div className="mb-4">
                <img
                  src={post.media[0].url}
                  alt="Post media"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-neutral-700">
              <Button
                variant="ghost"
                size="sm"
                className="text-neutral-400 hover:text-red-500"
              >
                <Heart className="h-4 w-4 mr-1" />
                {post.likes}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-neutral-400 hover:text-blue-500"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {post.comments.length}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-neutral-400 hover:text-green-500"
              >
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VenuePostsList;
