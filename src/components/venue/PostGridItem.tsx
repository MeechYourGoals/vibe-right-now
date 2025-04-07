
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types";

interface PostGridItemProps {
  post: Post;
  isVenuePost?: boolean;
}

const PostGridItem: React.FC<PostGridItemProps> = ({ post, isVenuePost = false }) => {
  const [liked, setLiked] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };

  const dayOfWeek = new Date(post.timestamp).toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <Link 
      to={`/post/${post.id}`} 
      className={`group relative block aspect-square overflow-hidden rounded-lg ${
        isVenuePost ? 'ring-2 ring-amber-500' : ''
      }`}
    >
      {post.media[0]?.type === "image" ? (
        <img 
          src={post.media[0].url}
          alt={`Post by ${post.user.username}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      ) : post.media[0]?.type === "video" ? (
        <video
          src={post.media[0].url}
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <p className="p-2 text-center text-sm">{post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center justify-between gap-2">
            <Avatar className="h-6 w-6 border border-white">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              {isVenuePost && <Badge className="bg-amber-500 text-[0.6rem] mr-1">Venue</Badge>}
              <Badge variant="outline" className="text-[0.6rem] bg-black/30 text-white border-white/20">{dayOfWeek}</Badge>
            </div>
          </div>
          
          <p className="mt-1 text-xs text-white line-clamp-2 overflow-hidden">
            {post.content.slice(0, 60)}{post.content.length > 60 ? '...' : ''}
          </p>
          
          <div className="mt-2 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike} 
              className="h-8 px-2 text-white hover:bg-black/20"
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="ml-1">{post.likes + (liked ? 1 : 0)}</span>
            </Button>
            <span className="text-xs text-white">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostGridItem;
