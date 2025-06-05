
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { VerifiedIcon } from '@/components/icons/VerifiedIcon';

interface User {
  id: string;
  username: string;
  avatar: string;
  verified?: boolean;
  followersCount?: number;
}

interface PostUsersListProps {
  users: User[];
  title: string;
  onUserClick?: (userId: string) => void;
}

const PostUsersList = ({ users, title, onUserClick }: PostUsersListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{user.username}</span>
                  {user.verified && <VerifiedIcon size="sm" />}
                </div>
                {user.followersCount !== undefined && (
                  <span className="text-sm text-muted-foreground">
                    {user.followersCount.toLocaleString()} followers
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUserClick?.(user.id)}
            >
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostUsersList;
