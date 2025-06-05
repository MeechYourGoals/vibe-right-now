
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";

interface PostUsersListProps {
  users: User[];
  maxUsers?: number;
  showFollowerCount?: boolean;
}

const PostUsersList: React.FC<PostUsersListProps> = ({
  users,
  maxUsers = 5,
  showFollowerCount = false
}) => {
  const displayUsers = users.slice(0, maxUsers);
  const remainingCount = Math.max(0, users.length - maxUsers);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-2">
        {displayUsers.map((user) => (
          <div key={user.id} className="relative group">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              <div className="font-medium">{user.name}</div>
              <div className="text-gray-300">@{user.username}</div>
              {showFollowerCount && user.followers && (
                <div className="text-gray-300">
                  {(user.followers / 1000).toFixed(1)}k followers
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {remainingCount > 0 && (
        <Badge variant="secondary" className="text-xs">
          +{remainingCount} more
        </Badge>
      )}
    </div>
  );
};

export default PostUsersList;
