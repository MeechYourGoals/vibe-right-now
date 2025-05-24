
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, MessageCircle } from "lucide-react";
import { SocialMediaPost as SocialMediaPostType } from "@/types";

interface SocialMediaPostProps {
  post: SocialMediaPostType;
}

const SocialMediaPost: React.FC<SocialMediaPostProps> = ({ post }) => {
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'google':
        return 'bg-blue-500 text-white';
      case 'yelp':
        return 'bg-red-500 text-white';
      case 'instagram':
        return 'bg-pink-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <Card className="bg-neutral-800 border-neutral-600">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{post.author}</p>
              <p className="text-xs text-neutral-400">{post.timestamp}</p>
            </div>
          </div>
          <Badge className={getSourceColor(post.source)}>
            {post.source.charAt(0).toUpperCase() + post.source.slice(1)}
          </Badge>
        </div>

        {post.rating && (
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(post.rating)}
          </div>
        )}

        <p className="text-white text-sm mb-3">{post.content}</p>

        <div className="flex items-center space-x-4 text-neutral-400">
          {post.likes && (
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{post.likes}</span>
            </div>
          )}
          {post.comments && (
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.comments}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaPost;
