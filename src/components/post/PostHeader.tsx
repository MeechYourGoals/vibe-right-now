
import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  MoreHorizontal, 
  VerifiedIcon, 
  Pin, 
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/types";

interface PostHeaderProps {
  post: Post;
  onUserClick?: (userId: string) => void;
  onLocationClick?: (locationId: string) => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  post,
  onUserClick,
  onLocationClick
}) => {
  // Format the timestamp as a relative time (e.g., "2 hours ago")
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });
  
  // Format the timestamp as a date string
  const dateStr = new Date(post.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Format the timestamp as a time string
  const timeStr = new Date(post.timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
  
  return (
    <div className="p-4 flex justify-between items-start">
      <div className="flex gap-3">
        <Link to={`/user/${post.user.username}`}>
          <Avatar>
            <AvatarImage src={post.user.avatar} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        
        <div>
          <div className="flex items-center gap-2">
            <Link to={`/user/${post.user.username}`} className="font-semibold hover:underline">
              {post.user.name}
            </Link>
            {post.user.verified && (
              <VerifiedIcon className="h-4 w-4 text-blue-500" />
            )}
            {post.isPinned && (
              <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/60 flex items-center gap-1 ml-1">
                <Pin className="h-3 w-3" />
                Pinned
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
            <span>{timeAgo}</span>
            <span className="text-xs text-muted-foreground">• {dateStr} at {timeStr}</span>
          </div>
          
          {post.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <Link to={`/venue/${post.location.id}`} className="text-xs text-muted-foreground hover:underline">
                {post.location.name}, {post.location.city}
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem>
              Share post
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Report post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PostHeader;
