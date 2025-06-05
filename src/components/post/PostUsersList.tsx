
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Post } from "@/types";

interface PostUsersListProps {
  post: Post;
  userCount: number;
  setShowAllUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ 
  post, 
  userCount, 
  setShowAllUsers 
}) => {
  // Generate mock users based on post ID for consistency
  const generateMockUsers = (postId: string, count: number) => {
    const users = [];
    const seed = parseInt(postId) || postId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    for (let i = 0; i < count; i++) {
      const userId = (seed + i) % 50 + 1;
      users.push({
        id: `user${userId}`,
        name: `User ${userId}`,
        username: `user${userId}`,
        avatar: `https://i.pravatar.cc/150?img=${userId}`,
        isHere: Math.random() > 0.7, // 30% chance of being "here now"
        lastSeen: Math.random() > 0.5 ? 'now' : `${Math.floor(Math.random() * 60) + 1}m ago`
      });
    }
    
    return users;
  };

  const users = generateMockUsers(post.id, userCount);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-md max-h-[70vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">
            {userCount} people vibing here
          </h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowAllUsers(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="overflow-y-auto max-h-[50vh]">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-3 p-3 hover:bg-muted/50">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{user.name}</span>
                  {user.isHere && (
                    <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {user.isHere ? 'Here now' : `Last seen ${user.lastSeen}`}
                </p>
              </div>
              
              <Button variant="outline" size="sm" className="text-xs">
                Follow
              </Button>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t bg-muted/20">
          <p className="text-xs text-muted-foreground text-center">
            Connect with people vibing at {post.location?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostUsersList;
