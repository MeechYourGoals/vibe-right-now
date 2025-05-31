import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MapPin, Phone, ExternalLink, Share2 } from "lucide-react";
import PostHeader from "@/components/post/PostHeader";
import PostContent from "@/components/post/PostContent";
import PostMedia from "@/components/post/PostMedia";
import PostFooter from "@/components/post/PostFooter";
import PostUsersList from "@/components/post/PostUsersList";
import { Post } from "@/types";

interface PostCardProps {
  posts: Post[];
  locationPostCount: number;
  getComments: (postId: string) => any[];
  isDetailView?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ posts, locationPostCount, getComments, isDetailView = false }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  const visiblePosts = posts.slice(0, visibleCount);
  const firstPost = posts[0];

  return (
    <Card className="w-full max-w-3xl mx-auto mb-4 overflow-hidden">
      {/* Location Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-vibe rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-base">{firstPost.location.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {firstPost.location.address}, {firstPost.location.city}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {locationPostCount} posts
            </Badge>
            {showAllUsers && (
              <PostUsersList
                location={firstPost.location}
                setShowAllUsers={setShowAllUsers}
              />
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAllUsers(true)}
              className="text-xs h-7"
            >
              View All
            </Button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="divide-y divide-border">
        {visiblePosts.map((post, index) => (
          <div key={post.id} className="p-4">
            {/* Post Header */}
            <PostHeader post={post} />

            {/* Post Content */}
            <PostContent post={post} />

            {/* Post Media */}
            {post.media && post.media.length > 0 && (
              <PostMedia media={post.media} />
            )}

            {/* Post Footer */}
            <PostFooter 
              post={post}
              isDetailView={false}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {posts.length > visibleCount && (
        <div className="p-4 border-t border-border bg-muted/20">
          <Button
            variant="ghost"
            className="w-full text-sm"
            onClick={loadMore}
          >
            Load more posts from {firstPost.location.name} ({posts.length - visibleCount} remaining)
          </Button>
        </div>
      )}

      {/* Venue Actions */}
      {!isDetailView && (
        <div className="p-4 border-t border-border bg-background/50">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      )}

      {/* Show single post details */}
      {posts.length === 1 && isDetailView && (
        <div className="p-4 border-t border-border">
          <PostFooter 
            post={firstPost}
            isDetailView={true}
          />
        </div>
      )}
    </Card>
  );
};

export default PostCard;
