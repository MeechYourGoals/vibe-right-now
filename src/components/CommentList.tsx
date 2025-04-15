
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
  const [showAllComments, setShowAllComments] = useState(false);

  // Filter comments for this specific post
  let postComments = mockComments.filter(comment => comment.postId === postId);
  
  // If no comments found in mock data or not enough comments, generate example comments
  if (postComments.length < commentsCount) {
    // Calculate how many more comments to generate
    const additionalCommentsNeeded = Math.max(
      commentsCount - postComments.length,
      Math.min(5, commentsCount) // Always show at least a few comments but no more than 5 by default
    );
    
    for (let i = 0; i < additionalCommentsNeeded; i++) {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const hasVibedHere = Math.random() > 0.6; // 40% chance of having vibed at the venue before
      const minutesAgo = Math.floor(Math.random() * 120) + 1; // 1-120 minutes ago
      
      let commentContent = "";
      if (hasVibedHere) {
        const vibedHereComments = [
          "I was here last night! The crowd was amazing and the music was on point.",
          "Just left this place. The line moves fast if you go around to the side entrance.",
          "Been here 3 times this week! The staff recognizes me now haha.",
          "I'm actually here right now! The DJ just switched and it's getting even better!",
          "Was here yesterday and can confirm it was incredible. Going back tonight!",
          "This is my favorite spot in the city! Always good vibes here.",
          "I practically live here at this point. The drinks are always on point!",
          "Just checked in an hour ago. It's not too crowded if you come now.",
          "My third time here this month. Never disappoints!",
          "I'm a regular and can confirm this place is fire tonight!"
        ];
        commentContent = vibedHereComments[Math.floor(Math.random() * vibedHereComments.length)];
      } else {
        const regularComments = [
          "This looks amazing! How's the crowd right now?",
          "Is it worth heading over? Stuck in traffic but could reroute.",
          "What time do they close tonight?",
          "Is there a cover charge?",
          "How long is the wait for a table?",
          "Any recommendations on what to order?",
          "Can't wait to check this place out next weekend!",
          "Do they take reservations or is it walk-in only?",
          "Parking easy to find nearby?",
          "Is it kid friendly or more of an adult vibe?"
        ];
        commentContent = regularComments[Math.floor(Math.random() * regularComments.length)];
      }
      
      postComments.push({
        id: `generated-${postId}-${i}`,
        postId: postId,
        user: randomUser,
        content: commentContent,
        text: commentContent,
        timestamp: new Date(Date.now() - 1000 * 60 * minutesAgo).toISOString(),
        vibedHere: hasVibedHere,
        likes: Math.floor(Math.random() * 5)
      });
    }
    
    // Sort by timestamp (newest first)
    postComments.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // Show a limited number of comments unless "Show all" is clicked
  const displayComments = showAllComments ? postComments : postComments.slice(0, 3);

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
      
      {displayComments.length > 0 ? (
        <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
          {displayComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-muted-foreground text-sm">
          No comments yet. Be the first to comment!
        </div>
      )}
      
      {!showAllComments && postComments.length > 3 && (
        <Button 
          variant="ghost" 
          className="w-full text-sm mt-2 text-muted-foreground"
          onClick={() => setShowAllComments(true)}
        >
          View all {postComments.length} comments
        </Button>
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
