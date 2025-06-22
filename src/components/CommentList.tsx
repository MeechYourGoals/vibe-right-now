
import { useState } from "react";
import { Comment, User } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send } from "lucide-react";
import CommentItem from "@/components/CommentItem";
import { mockComments } from "@/mock/comments";
import { mockUsers } from "@/mock/users";

interface CommentListProps {
  postId: string;
  commentsCount: number;
}

const CommentList = ({ postId, commentsCount }: CommentListProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  let postComments = mockComments.filter(comment => comment.postId === postId);
  
  if (postComments.length === 0 && commentsCount > 0) {
    const commentCount = Math.min(commentsCount, Math.floor(Math.random() * 2) + 2);
    const exampleComments: Comment[] = [];
    
    const randomUser1 = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    exampleComments.push({
      id: `example-${postId}-1`,
      contentId: postId,
      postId: postId,
      parentId: undefined,
      user: randomUser1,
      author: randomUser1,
      body: "This place looks amazing! How's the crowd right now?",
      content: "This place looks amazing! How's the crowd right now?",
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      updatedAt: new Date(Date.now() - 1000 * 60 * 30),
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      vibedHere: false,
      likes: 0,
      status: 'published' as const,
      engagement: { likes: 0, replies: 0, reactions: [] },
      moderation: { status: 'approved' as const, flags: [] }
    });
    
    const randomUser2 = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    exampleComments.push({
      id: `example-${postId}-2`,
      contentId: postId,
      postId: postId,
      parentId: undefined,
      user: randomUser2,
      author: randomUser2,
      body: "I was here yesterday and it was incredible! The line moves fast if you go around to the side entrance.",
      content: "I was here yesterday and it was incredible! The line moves fast if you go around to the side entrance.",
      createdAt: new Date(Date.now() - 1000 * 60 * 120),
      updatedAt: new Date(Date.now() - 1000 * 60 * 120),
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      vibedHere: true,
      likes: 0,
      status: 'published' as const,
      engagement: { likes: 0, replies: 0, reactions: [] },
      moderation: { status: 'approved' as const, flags: [] }
    });
    
    if (commentCount > 2) {
      const randomUser3 = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      exampleComments.push({
        id: `example-${postId}-3`,
        contentId: postId,
        postId: postId,
        parentId: undefined,
        user: randomUser3,
        author: randomUser3,
        body: "Heading there now! Anyone want to meet up?",
        content: "Heading there now! Anyone want to meet up?",
        createdAt: new Date(Date.now() - 1000 * 60 * 10),
        updatedAt: new Date(Date.now() - 1000 * 60 * 10),
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        vibedHere: Math.random() > 0.5,
        likes: 0,
        status: 'published' as const,
        engagement: { likes: 0, replies: 0, reactions: [] },
        moderation: { status: 'approved' as const, flags: [] }
      });
    }
    
    postComments = exampleComments;
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setNewComment("");
      setIsSubmitting(false);
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
