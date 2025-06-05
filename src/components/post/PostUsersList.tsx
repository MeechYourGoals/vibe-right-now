
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MockUserProfile } from "@/mock/users";

interface PostUsersListProps {
  users: MockUserProfile[];
  type: 'likes' | 'shares' | 'comments';
  maxDisplay?: number;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ 
  users, 
  type, 
  maxDisplay = 3 
}) => {
  const displayUsers = users.slice(0, maxDisplay);
  const remainingCount = Math.max(0, users.length - maxDisplay);

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-2">
      <div className="flex -space-x-2">
        {displayUsers.map((user, index) => (
          <Avatar key={user.id} className="h-6 w-6 border-2 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      
      <div className="text-sm text-muted-foreground">
        {users.length === 1 ? (
          <span>{displayUsers[0].name}</span>
        ) : (
          <span>
            {displayUsers.map(user => user.name).join(', ')}
            {remainingCount > 0 && ` and ${remainingCount} other${remainingCount === 1 ? '' : 's'}`}
          </span>
        )}
        {' '}
        {type === 'likes' && 'liked this'}
        {type === 'shares' && 'shared this'}
        {type === 'comments' && 'commented'}
      </div>
    </div>
  );
};

export default PostUsersList;
