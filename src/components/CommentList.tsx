import React, { useState, useEffect } from 'react';
import { Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentItem from "@/components/CommentItem";

interface CommentListProps {
  postId: string;
}

const CommentList = ({ postId }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  
  useEffect(() => {
    // Mock comments for testing
    const mockComments: Comment[] = [
      {
        id: '1',
        postId: postId,
        user: {
          id: "user1",
          username: "johndoe",
          name: "John Doe",
          avatar: "/avatars/user-placeholder.png",
          followers: 123,
          following: 456
        },
        content: "Great vibe here!",
        timestamp: new Date().toISOString(),
        vibedHere: true,
        likes: 10
      },
      {
        id: '2',
        postId: postId,
        user: {
          id: "user2",
          username: "janedoe",
          name: "Jane Doe",
          avatar: "/avatars/user-placeholder.png",
          followers: 789,
          following: 101
        },
        content: "I love this place!",
        timestamp: new Date().toISOString(),
        vibedHere: false,
        likes: 5
      }
    ];
    
    setComments(mockComments);
  }, [postId]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // Create new comment with all required properties
    const comment: Comment = {
      id: Date.now().toString(),
      postId: postId,
      user: {
        id: "current-user",
        username: "currentuser",
        name: "Current User",
        avatar: "/avatars/user-placeholder.png",
        followers: 0,
        following: 0
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      vibedHere: false,
      likes: 0 // Add the missing likes property
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };
  
  const handleAddVibeComment = () => {
    // Create new "vibed here" comment with all required properties
    const comment: Comment = {
      id: Date.now().toString(),
      postId: postId,
      user: {
        id: "current-user",
        username: "currentuser",
        name: "Current User",
        avatar: "/avatars/user-placeholder.png",
        followers: 0,
        following: 0
      },
      content: "I vibed here! The atmosphere was amazing.",
      timestamp: new Date().toISOString(),
      vibedHere: true,
      likes: 0 // Add the missing likes property
    };
    
    setComments(prev => [comment, ...prev]);
  };
  
  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold">Comments</h4>
      
      <div className="space-y-2">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
      
      <form onSubmit={handleAddComment} className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatars/user-placeholder.png" alt="Your Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="sm">Post</Button>
      </form>
      
      <Button variant="secondary" size="sm" onClick={handleAddVibeComment}>
        Vibe Here!
      </Button>
    </div>
  );
};

export default CommentList;
