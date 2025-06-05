
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { VerifiedIcon } from '@/components/icons/VerifiedIcon';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import PostFooter from '@/components/post/PostFooter';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
  isDetailView?: boolean;
}

const PostCard = ({ post, isDetailView = false }: PostCardProps) => {
  return (
    <Card className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden">
      <CardHeader className="flex items-center space-x-4 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.userAvatar} alt={post.username} />
          <AvatarFallback>{post.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-1">
            <h2 className="text-sm font-semibold">{post.username}</h2>
            {post.userVerified && <VerifiedIcon size="sm" />}
          </div>
          <p className="text-xs text-muted-foreground">{post.location}</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        <p className="text-sm">{post.content}</p>
        {post.mediaType !== 'none' && post.mediaUrl && (
          <img src={post.mediaUrl} alt="Post Media" className="mt-3 rounded-md w-full aspect-video object-cover" />
        )}
      </CardContent>

      <PostFooter 
        post={post}
        isDetailView={false}
        onLike={() => {}}
        onComment={() => {}}
        onShare={() => {}}
        onSave={() => {}}
      />

      {isDetailView && (
        <CardFooter className="p-4">
          <p className="text-sm text-muted-foreground">
            Posted on {new Date(post.timestamp).toLocaleDateString()}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostCard;
