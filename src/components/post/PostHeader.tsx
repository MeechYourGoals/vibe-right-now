
import React from 'react';
import { Post, Location } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Pin, Trash2, MapPin } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deletePost } from "@/utils/venue/postManagementUtils";
import { toast } from "sonner";

interface PostHeaderProps {
  post: Post;
  canDelete?: boolean;
  venue?: Location;
  onPostDeleted?: (postId: string) => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ 
  post, 
  canDelete = false, 
  venue,
  onPostDeleted 
}) => {
  const handleDeletePost = () => {
    if (venue && deletePost(post.id, venue)) {
      if (onPostDeleted) {
        onPostDeleted(post.id);
      }
    }
  };

  // Safely access user properties
  const userName = post.user?.name || 'Unknown User';
  const userUsername = post.user?.username || 'unknown';
  const userAvatar = post.user?.avatar;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center space-x-2">
            <p className="font-semibold text-sm">{userName}</p>
            {post.isPinned && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                <Pin className="h-3 w-3 mr-1" />
                Pinned
              </Badge>
            )}
            {post.isVenuePost && (
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Venue
              </Badge>
            )}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>@{userUsername}</span>
            {post.location && (
              <>
                <span className="mx-1">•</span>
                <MapPin className="h-3 w-3 mr-1" />
                <span>{post.location.name}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {canDelete && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDeletePost} className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default PostHeader;
