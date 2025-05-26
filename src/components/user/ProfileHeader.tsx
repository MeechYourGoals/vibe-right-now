
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/types";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center space-x-4 p-6">
      <Avatar className="h-20 w-20">
        <AvatarImage src={user.avatar} alt={user.username} />
        <AvatarFallback>{user.username[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-2xl font-bold">{user.username}</h1>
          {user.isVerified && (
            <Badge variant="secondary">
              ✓ Verified
            </Badge>
          )}
        </div>
        
        <p className="text-muted-foreground mb-2">{user.bio}</p>
        
        <div className="flex space-x-4 text-sm">
          <span><strong>{user.postsCount || 0}</strong> posts</span>
          <span><strong>{user.followersCount || 0}</strong> followers</span>
          <span><strong>{user.followingCount || 0}</strong> following</span>
        </div>
      </div>
      
      <Button variant="outline">Follow</Button>
    </div>
  );
};

export default ProfileHeader;
