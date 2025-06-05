
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types';
import { useNavigate } from 'react-router-dom';

interface PostUsersListProps {
  posts: Post[];
  locationPostCount: number;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ posts, locationPostCount }) => {
  const navigate = useNavigate();
  
  // Get unique users from all posts at this location
  const uniqueUsers = posts.reduce((acc, post) => {
    const userId = post.user.id;
    if (!acc.find(user => user.id === userId)) {
      acc.push(post.user);
    }
    return acc;
  }, [] as typeof posts[0]['user'][]);

  const displayUsers = uniqueUsers.slice(0, 3);
  const remainingCount = Math.max(0, locationPostCount - displayUsers.length);

  const handleUserClick = (username: string) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="flex items-center space-x-2 mt-2">
      <div className="flex -space-x-2">
        {displayUsers.map((user) => (
          <Avatar
            key={user.id}
            className="h-8 w-8 border-2 border-background cursor-pointer hover:scale-110 transition-transform"
            onClick={() => handleUserClick(user.username)}
          >
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      
      {remainingCount > 0 && (
        <Badge variant="secondary" className="text-xs">
          +{remainingCount} more
        </Badge>
      )}
      
      <span className="text-sm text-muted-foreground">
        vibed here recently
      </span>
    </div>
  );
};

export default PostUsersList;
