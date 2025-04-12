
import { useState } from "react";
import { Comment, User } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send } from "lucide-react";
import CommentItem from "@/components/CommentItem";
import { mockComments } from "@/mock/data";
import { mockUsers } from "@/mock/data";

interface CommentListProps {
  postId: string;
  commentsCount: number;
}

const CommentList = ({ postId, commentsCount }: CommentListProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter comments for this specific post
  let postComments = mockComments.filter(comment => comment.postId === postId);
  
  // If no comments found in mock data, generate example comments
  if (postComments.length === 0 && commentsCount > 0) {
    // Generate 2-3 example comments
    const commentCount = Math.min(commentsCount, Math.floor(Math.random() * 2) + 2);
    const exampleComments: Comment[] = [];
    
    // Regular comment
    exampleComments.push({
      id: `example-${postId}-1`,
      postId: postId,
      user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
      content: "This place looks amazing! How's the crowd right now?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      vibedHere: false
    });
    
    // "Vibed Here" comment
    exampleComments.push({
      id: `example-${postId}-2`,
      postId: postId,
      user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
      content: "I was here yesterday and it was incredible! The line moves fast if you go around to the side entrance.",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      vibedHere: true
    });
    
    // Add a third comment if needed
    if (commentCount > 2) {
      exampleComments.push({
        id: `example-${postId}-3`,
        postId: postId,
        user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
        content: "Heading there now! Anyone want to meet up?",
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
        vibedHere: Math.random() > 0.5 // 50% chance of being "Vibed Here"
      });
    }
    
    postComments = exampleComments;
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setNewComment("");
      setIsSubmitting(false);
      // In a real app, we would add the new comment to the list
    }, 500);
  };

  return (
    <div className="pt-3 border-t">
      <div className="flex items-center mb-3">
        <h4 className="font-medium flex items-center">
          <MessageSquare className="h-4 w-4 mr-1" />
          Comments ({commentsCount})
        </h4>
      </div>
      
      {postComments.length > 0 ? (
        <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
          {postComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-muted-foreground text-sm">
          No comments yet. Be the first to comment!
        </div>
      )}
      
      <div className="mt-3 flex gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="Your avatar" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex items-end gap-2">
          <Textarea
            placeholder="Add a comment..."
            className="min-h-[60px] flex-1"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button 
            size="icon"
            disabled={!newComment.trim() || isSubmitting}
            onClick={handleSubmitComment}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
