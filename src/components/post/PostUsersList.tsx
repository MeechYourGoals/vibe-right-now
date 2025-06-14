
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Location } from '@/types';

interface PostUsersListProps {
  users?: User[];
  location?: Location;
  maxVisible?: number;
  showBadges?: boolean;
  setShowAllUsers?: (show: boolean) => void;
}

const PostUsersList: React.FC<PostUsersListProps> = ({
  users = [],
  location,
  maxVisible = 3,
  showBadges = true,
  setShowAllUsers
}) => {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = Math.max(0, users.length - maxVisible);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-2">
        {visibleUsers.map((user, index) => (
          <div key={user.id} className="relative">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {showBadges && user.verified && (
              <Badge className="absolute -top-1 -right-1 h-3 w-3 p-0 bg-blue-500">
                <span className="sr-only">Verified</span>
              </Badge>
            )}
          </div>
        ))}
      </div>
      
      {remainingCount > 0 && (
        <span className="text-sm text-muted-foreground">
          +{remainingCount} more
        </span>
      )}
      
      {location && setShowAllUsers && (
        <button 
          onClick={() => setShowAllUsers(false)}
          className="text-sm text-blue-500 hover:underline"
        >
          View at {location.name}
        </button>
      )}
    </div>
  );
};

export default PostUsersList;
