
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { User, Location } from "@/types";
import { formatDistanceToNow } from "date-fns";

export interface PostHeaderProps {
  user: User;
  timestamp: string;
  location?: Location;
}

const PostHeader = ({ user, timestamp, location }: PostHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-sm">{user.username}</span>
            {user.isVerified && (
              <Badge variant="secondary" className="text-xs">
                ✓
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}</span>
            </div>
            
            {location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{location.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
