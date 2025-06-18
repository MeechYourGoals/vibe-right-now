
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from '@/types';

interface UserProfileHeaderProps {
  user: User;
  onFollow?: (userToFollow: string) => Promise<boolean>;
  onUnfollow?: (userToUnfollow: string) => Promise<boolean>;
  onUpdateBio?: (newBio: string) => Promise<boolean>;
  onBlock?: (userToBlock: string) => Promise<boolean>;
  onReport?: (userToReport: string, reason: string) => Promise<boolean>;
  isPrivate?: boolean;
  getUserBio?: () => string;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  user,
  onFollow,
  onUnfollow,
  onUpdateBio,
  onBlock,
  onReport,
  isPrivate = false,
  getUserBio
}) => {
  return (
    <div className="bg-card rounded-lg p-6 mb-6">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {user.verified && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Verified
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground mb-2">@{user.username}</p>
          
          {user.bio && (
            <p className="text-foreground mb-4">{user.bio}</p>
          )}
          
          <div className="flex gap-4 text-sm">
            <span><strong>{user.posts || 0}</strong> posts</span>
            <span><strong>0</strong> followers</span>
            <span><strong>0</strong> following</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={() => onFollow?.(user.username)}>
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
