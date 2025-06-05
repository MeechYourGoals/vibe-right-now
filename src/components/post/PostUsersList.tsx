
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/types";

interface PostUsersListProps {
  post: Post;
  userCount: number;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ post, userCount }) => {
  // Generate mock users based on post ID
  const generateMockUsers = () => {
    const users = [];
    const seed = parseInt(post.id.replace(/\D/g, '')) || 1;
    
    for (let i = 0; i < Math.min(userCount, 5); i++) {
      const userId = seed + i;
      users.push({
        id: `user_${userId}`,
        name: `User ${userId}`,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + userId}?w=40&h=40&fit=crop&auto=format`
      });
    }
    
    return users;
  };

  const mockUsers = generateMockUsers();

  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-2">
        {mockUsers.map((user, index) => (
          <Avatar key={user.id} className="h-6 w-6 border-2 border-white">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      {userCount > 5 && (
        <span className="text-xs text-muted-foreground">+{userCount - 5} more</span>
      )}
    </div>
  );
};

export default PostUsersList;
