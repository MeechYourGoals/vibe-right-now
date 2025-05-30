
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, MapPin, Star } from "lucide-react";
import Verified from "@/components/Verified";
import { Post } from "@/types";

interface PostCardProps {
  post: Post;
  isLiked: boolean;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
  onShare: (postId: string) => void;
}

const PostCard = ({ post, isLiked, onLike, onComment, onShare }: PostCardProps) => {
  const handleLike = () => {
    onLike(post.id);
  };

  const handleComment = () => {
    onComment(post.id, '');
  };

  const handleShare = () => {
    onShare(post.id);
  };

  return (
    <Card className="bg-neutral-900 border-neutral-700">
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
            onClick={handleLike}
            className={`text-neutral-400 hover:text-red-500 ${
              isLiked ? 'text-red-500' : ''
            }`}
          >
            <Heart className={`h-4 w-4 mr-1 ${
              isLiked ? 'fill-current' : ''
            }`} />
            {post.likes + (isLiked && !post.isLiked ? 1 : 0)}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleComment}
            className="text-neutral-400 hover:text-blue-500"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            {post.comments.length}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-neutral-400 hover:text-green-500"
          >
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
