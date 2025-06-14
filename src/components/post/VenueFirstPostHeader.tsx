
import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
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
import { User, Location } from "@/types";

interface VenueFirstPostHeaderProps {
  user: User;
  timestamp: string;
  location?: Location;
  isPinned?: boolean;
  canDelete?: boolean;
  onDelete?: () => void;
}

const VenueFirstPostHeader: React.FC<VenueFirstPostHeaderProps> = ({
  user,
  timestamp,
  location,
  isPinned = false,
  canDelete = false,
  onDelete
}) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  const dateStr = new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const timeStr = new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
  
  // Add debugging for venue links in headers
  if (location) {
    console.log("VenueFirstPostHeader: Location:", location);
    console.log("VenueFirstPostHeader: Venue link will be:", `/venue/${location.id}`);
  }
  
  return (
    <div className="p-4 flex justify-between items-start">
      <div className="flex gap-3">
        {/* Venue Avatar - Primary - Only show if location exists */}
        {location && (
          <Link to={`/venue/${location.id}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={`https://source.unsplash.com/100x100/?${location.type},venue,${location.name}`} 
                alt={location.name} 
              />
              <AvatarFallback>{location.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
        
        <div>
          {/* Venue Name - Primary Header - Only show if location exists */}
          {location && (
            <div className="flex items-center gap-2 mb-1">
              <Link to={`/venue/${location.id}`} className="text-lg font-bold hover:underline">
                {location.name}
              </Link>
              {location.verified && (
                <VerifiedIcon className="h-4 w-4 text-blue-500" />
              )}
              {isPinned && (
                <Badge variant="outline" className="text-xs bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/60 flex items-center gap-1">
                  <Pin className="h-3 w-3" />
                  Pinned
                </Badge>
              )}
            </div>
          )}
          
          {/* Venue Location - Only show if location exists */}
          {location && (
            <div className="text-sm text-muted-foreground mb-2">
              {location.city}, {location.state}
            </div>
          )}
          
          {/* User Info - Secondary */}
          <div className="flex items-center gap-2 text-sm">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Link to={`/user/${user.username}`} className="font-medium hover:underline">
              {user.name}
            </Link>
            {user.verified && (
              <VerifiedIcon className="h-3 w-3 text-blue-500" />
            )}
          </div>
          
          {/* Timestamp */}
          <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground mt-1">
            <span>{timeAgo}</span>
            <span>• {dateStr} at {timeStr}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        {canDelete && onDelete && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
        
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

export default VenueFirstPostHeader;
