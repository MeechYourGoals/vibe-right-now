
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";
import { Post } from "@/types";

interface PostUsersListProps {
  posts: Post[];
  title: string;
  onUserClick?: (userId: string) => void;
}

const PostUsersList: React.FC<PostUsersListProps> = ({ posts, title, onUserClick }) => {
  // Sort posts by engagement (likes + comments + shares)
  const sortedPosts = [...posts].sort((a, b) => {
    const aEngagement = Number(a.likes) + Number(a.comments) + Number(a.shares || 0);
    const bEngagement = Number(b.likes) + Number(b.comments) + Number(b.shares || 0);
    return bEngagement - aEngagement;
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-3">
        {sortedPosts.slice(0, 10).map((post) => {
          const totalEngagement = Number(post.likes) + Number(post.comments) + Number(post.shares || 0);
          
          return (
            <div key={post.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.user.avatar} alt={post.user.username} />
                  <AvatarFallback>{post.user.username[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm">{post.user.username}</h4>
                    {post.user.verified && (
                      <Verified className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {post.content}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {totalEngagement} interactions
                </Badge>
                {onUserClick && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onUserClick(post.user.id)}
                  >
                    View
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostUsersList;
