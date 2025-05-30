
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
      userId: mockUsers[0].id,
      user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
      content: "This place looks amazing! How's the crowd right now?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      vibedHere: false,
      likes: 0
    });
    
    // "Vibed Here" comment
    exampleComments.push({
      id: `example-${postId}-2`,
      postId: postId,
      userId: mockUsers[1].id,
      user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
      content: "I was here yesterday and it was incredible! The line moves fast if you go around to the side entrance.",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      vibedHere: true,
      likes: 0
    });
    
    // Add a third comment if needed
    if (commentCount > 2) {
      exampleComments.push({
        id: `example-${postId}-3`,
        postId: postId,
        userId: mockUsers[2].id,
        user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
        content: "Heading there now! Anyone want to meet up?",
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        vibedHere: Math.random() > 0.5,
        likes: 0
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
          No comments yet. Be the first to share your thoughts!
        </div>
      )}
      
      <div className="mt-4 space-y-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[60px]"
        />
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            size="sm"
          >
            <Send className="h-3 w-3 mr-1" />
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
