import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, MoreHorizontal, CheckCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Post, User, Media } from "@/types";
import { Link } from "react-router-dom";
import PostMedia from "./PostMedia";
import { VerifiedBadge } from "../user/VerifiedBadge";

interface PostCardProps {
  post: Post;
  likePost: (postId: string) => void;
  commentPost: (postId: string, comment: string) => void;
  sharePost: (postId: string) => void;
  reportPost: (postId: string) => void;
  deletePost: (postId: string) => void;
}

// Helper function to safely process media items
const processMedia = (mediaItems: (string | Media)[]): Media[] => {
  if (!Array.isArray(mediaItems)) return [];
  
  return mediaItems.map(item => {
    if (typeof item === 'string') {
      // Convert string URLs to Media objects
      const isVideo = item.endsWith('.mp4') || item.endsWith('.mov');
      return {
        url: item,
        type: isVideo ? 'video' : 'image'
      };
    }
    return item as Media;
  });
};

const PostCard = ({
  post,
  likePost,
  commentPost,
  sharePost,
  reportPost,
  deletePost
}: PostCardProps) => {
  const [comment, setComment] = useState("");
  const media = processMedia(post.media);
  
  return (
    <Card className="w-full shadow-md rounded-lg bg-card text-card-foreground">
      <CardHeader className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
            <AvatarFallback>{post.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center space-x-1">
              <Link to={`/user/${post.user?.username}`} className="text-sm font-semibold hover:underline">
                {post.user?.name}
              </Link>
              {post.user?.isVerified && (
                <VerifiedBadge />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(post.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => reportPost(post.id)}>
              Report Post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deletePost(post.id)}>
              Delete Post
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/post/${post.id}`}>View Post</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent className="p-4">
        {post.text && (
          <p className="text-sm mb-4">
            {post.text}
          </p>
        )}
        
        {media.length > 0 && (
          <PostMedia media={media[0]} />
        )}
      </CardContent>
      
      <CardFooter className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => likePost(post.id)}>
            <Heart className="h-5 w-5 mr-2" />
            Like ({post.likes})
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="h-5 w-5 mr-2" />
            Comment ({post.comments})
          </Button>
          <Button variant="ghost" size="sm" onClick={() => sharePost(post.id)}>
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
