
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Clock, Eye } from "lucide-react";
import { Post } from "@/types";

interface PostOverlayProps {
  post: Post;
}

const PostOverlay = ({ post }: PostOverlayProps) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const isExpired = post.expiresAt ? post.expiresAt < new Date() : false;
  const isExpiringSoon = post.expiresAt ? 
    (post.expiresAt.getTime() - new Date().getTime()) < 3600000 : false; // 1 hour

  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
      {/* Top badges */}
      <div className="absolute top-2 left-2 flex space-x-2">
        {post.isVenuePost && (
          <Badge variant="secondary" className="text-xs bg-blue-600 text-white">
            <Eye className="h-3 w-3 mr-1" />
            Venue
          </Badge>
        )}
        {post.isPinned && (
          <Badge variant="secondary" className="text-xs bg-yellow-600 text-white">
            📌 Pinned
          </Badge>
        )}
      </div>

      {/* Expiration warning */}
      {post.expiresAt && (isExpired || isExpiringSoon) && (
        <div className="absolute top-2 right-2">
          <Badge 
            variant="secondary" 
            className={`text-xs ${isExpired ? 'bg-red-600' : 'bg-orange-600'} text-white`}
          >
            <Clock className="h-3 w-3 mr-1" />
            {isExpired ? 'Expired' : `${formatTimeAgo(post.expiresAt)} left`}
          </Badge>
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar} alt={post.author.username} />
              <AvatarFallback className="text-xs">
                {post.author.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">@{post.author.username}</span>
            {post.timestamp && (
              <span className="text-xs opacity-80">
                {formatTimeAgo(post.timestamp)}
              </span>
            )}
          </div>
        </div>

        {/* Content preview */}
        {post.title && (
          <h4 className="font-semibold text-sm mb-1 line-clamp-1">{post.title}</h4>
        )}
        <p className="text-xs opacity-90 line-clamp-2 mb-2">{post.content}</p>

        {/* Vibe tags */}
        {post.vibeTags && post.vibeTags.length > 0 && (
          <div className="flex space-x-1 mb-2">
            {post.vibeTags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-white/50 text-white">
                {tag}
              </Badge>
            ))}
            {post.vibeTags.length > 2 && (
              <Badge variant="outline" className="text-xs border-white/50 text-white">
                +{post.vibeTags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Engagement */}
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <Heart className="h-3 w-3" />
            <span>{post.likes || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-3 w-3" />
            <span>{post.comments || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostOverlay;
