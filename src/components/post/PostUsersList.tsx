
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MockUserProfile } from "@/mock/users";

interface PostUsersListProps {
  users: MockUserProfile[];
  maxVisible?: number;
  onUserClick?: (userId: string) => void;
}

const PostUsersList = ({ users, maxVisible = 3, onUserClick }: PostUsersListProps) => {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = Math.max(0, users.length - maxVisible);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-2">
        {visibleUsers.map((user) => (
          <Avatar
            key={user.id}
            className="h-6 w-6 border-2 border-background cursor-pointer hover:z-10 transition-transform hover:scale-110"
            onClick={() => onUserClick?.(user.id)}
          >
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="text-xs">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      
      {remainingCount > 0 && (
        <span className="text-sm text-muted-foreground">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};

export default PostUsersList;
