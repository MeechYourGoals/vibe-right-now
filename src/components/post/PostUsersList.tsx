
import React from 'react';
import { getUserByHash } from '@/mock/users';

interface PostUsersListProps {
  userIds: string[];
  maxDisplay?: number;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ 
  userIds, 
  maxDisplay = 3 
}) => {
  const displayUsers = userIds.slice(0, maxDisplay);
  const remainingCount = userIds.length - maxDisplay;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-2">
        {displayUsers.map((userId, index) => {
          const user = getUserByHash(userId);
          return (
            <img
              key={index}
              src={user.avatar}
              alt={user.name}
              className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
            />
          );
        })}
      </div>
      
      {remainingCount > 0 && (
        <span className="text-sm text-gray-500 font-medium">
          +{remainingCount} others
        </span>
      )}
      
      <span className="text-sm text-gray-500">
        liked this
      </span>
    </div>
  );
};

export default PostUsersList;
