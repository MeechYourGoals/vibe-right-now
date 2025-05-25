
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import Verified from "@/components/Verified";
import { MapPin, Calendar, Users, Heart } from "lucide-react";

interface UserProfileHeaderProps {
  user: User;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex flex-col space-y-4 p-6 bg-card rounded-lg border">
      <div className="flex items-start space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">
            {user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {user.isVerified && <Verified />}
            {user.isCelebrity && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Celebrity
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground">@{user.username}</p>
          
          {user.bio && (
            <p className="text-sm">{user.bio}</p>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{user.followersCount || 0} followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{user.followingCount || 0} following</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{user.postsCount || 0} posts</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">Follow</Button>
          <Button variant="outline">Message</Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
