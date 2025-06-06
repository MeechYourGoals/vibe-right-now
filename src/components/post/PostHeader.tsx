
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { User, Location } from "@/types";

interface PostHeaderProps {
  user: User;
  location: Location;
  timestamp: string;
  onUserClick?: (userId: string) => void;
  onLocationClick?: (locationId: string) => void;
}

const PostHeader = ({ 
  user, 
  location, 
  timestamp, 
  onUserClick, 
  onLocationClick 
}: PostHeaderProps) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.floor(diffInHours * 60)}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return `${Math.floor(diffInHours / 24)}d`;
    }
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-3">
        <Avatar 
          className="cursor-pointer" 
          onClick={() => onUserClick?.(user.id)}
        >
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div>
          <div className="flex items-center space-x-1">
            <span 
              className="font-semibold cursor-pointer hover:underline"
              onClick={() => onUserClick?.(user.id)}
            >
              {user.username}
            </span>
            {user.verified && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span 
              className="cursor-pointer hover:underline"
              onClick={() => onLocationClick?.(location.id)}
            >
              {location.name}
            </span>
            <span>•</span>
            <span>{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>
      
      <Badge variant="secondary" className="text-xs">
        {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
      </Badge>
    </div>
  );
};

export default PostHeader;
