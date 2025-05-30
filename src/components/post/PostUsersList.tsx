
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, User } from "lucide-react";
import { regularUsers } from '@/mock/users/regularUsers';

interface PostUsersListProps {
  type: 'likes' | 'comments' | 'shares';
  postId: string;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ type, postId }) => {
  // Mock data - in a real app, this would fetch based on postId and type
  const users = regularUsers.slice(0, 5);
  
  const getIcon = () => {
    switch (type) {
      case 'likes': return <Heart className="h-4 w-4 text-red-500" />;
      case 'comments': return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'shares': return <Share className="h-4 w-4 text-green-500" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'likes': return 'Liked by';
      case 'comments': return 'Comments from';
      case 'shares': return 'Shared by';
    }
  };

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          {getIcon()}
          <span className="ml-2">{getTitle()}</span>
          <Badge variant="outline" className="ml-2 text-neutral-400">
            {users.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-3 p-3 bg-neutral-800 rounded-lg">
            <img 
              src={user.profileImage} 
              alt={user.displayName}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-white">{user.displayName}</p>
              <p className="text-sm text-neutral-400">@{user.username}</p>
              {user.bio && (
                <p className="text-xs text-neutral-500 mt-1">{user.bio}</p>
              )}
            </div>
            <Button variant="outline" size="sm" className="text-white border-neutral-600">
              <User className="h-3 w-3 mr-1" />
              {user.isPrivate ? 'Request' : 'Follow'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PostUsersList;
