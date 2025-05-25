
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import Verified from "@/components/Verified";
import { hashString } from "@/mock/users";

interface PostUsersListProps {
  users: User[];
  maxVisible?: number;
  showCount?: boolean;
}

const PostUsersList: React.FC<PostUsersListProps> = ({
  users,
  maxVisible = 3,
  showCount = true
}) => {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = Math.max(0, users.length - maxVisible);

  const getColorFromHash = (str: string) => {
    const hash = hashString(str);
    const colors = [
      "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
    ];
    return colors[hash % colors.length];
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-2">
        {visibleUsers.map((user) => (
          <Avatar key={user.id} className="h-8 w-8 border-2 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className={getColorFromHash(user.name)}>
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      
      {remainingCount > 0 && showCount && (
        <Badge variant="secondary" className="text-xs">
          +{remainingCount} more
        </Badge>
      )}
      
      <div className="flex items-center space-x-1">
        {visibleUsers.slice(0, 2).map((user) => (
          <div key={user.id} className="flex items-center space-x-1">
            <span className="text-sm font-medium">{user.name}</span>
            {user.isVerified && <Verified />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostUsersList;
