import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface TripComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  colorCode: string;
  content: string;
  timestamp: Date;
}

interface TripCommentsWallProps {
  tripId: string | undefined;
  collaborators: Array<{ id: string; name: string; avatar: string }>;
  userColors: Array<{ id: string; color: string }>;
}

export const TripCommentsWall: React.FC<TripCommentsWallProps> = ({ 
  tripId, 
  collaborators, 
  userColors 
}) => {
  const [comments, setComments] = useState<TripComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load or create example comments
  useEffect(() => {
    if (!tripId) return;

    const storedComments = localStorage.getItem(`trip_comments_${tripId}`);
    if (storedComments) {
      // Parse dates properly
      const parsedComments = JSON.parse(storedComments, (key, value) => {
        if (key === 'timestamp') {
          return new Date(value);
        }
        return value;
      });
      setComments(parsedComments);
    } else {
      // Create example comments based on trip ID
      let exampleComments: TripComment[] = [];
      
      if (tripId === "1") {
        // Paris Trip Comments
        exampleComments = [
          {
            id: `comment_1_1`,
            userId: collaborators[2]?.id || "3",
            userName: collaborators[2]?.name || "Stacy",
            userAvatar: collaborators[2]?.avatar || "https://randomuser.me/api/portraits/women/2.jpg",
            colorCode: userColors[2]?.color || "#10b981",
            content: "Stacy we've been to a museum in every city can you please suggest some fun things lol",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
          },
          {
            id: `comment_1_2`,
            userId: collaborators[1]?.id || "2",
            userName: collaborators[1]?.name || "Mom",
            userAvatar: collaborators[1]?.avatar || "https://randomuser.me/api/portraits/women/3.jpg",
            colorCode: userColors[1]?.color || "#ec4899",
            content: "Very inappropriate, your sister is on here please find something productive for us to do at night",
            timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
          }
        ];
      } else if (tripId === "2") {
        // Tokyo Trip Comments
        exampleComments = [
          {
            id: `comment_2_1`,
            userId: collaborators[1]?.id || "4",
            userName: collaborators[1]?.name || "Dave",
            userAvatar: collaborators[1]?.avatar || "https://randomuser.me/api/portraits/men/4.jpg",
            colorCode: userColors[1]?.color || "#ec4899",
            content: "Anyone want to check out the Robot Restaurant? I heard it's crazy but fun!",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
          },
          {
            id: `comment_2_2`,
            userId: collaborators[2]?.id || "5",
            userName: collaborators[2]?.name || "Alex",
            userAvatar: collaborators[2]?.avatar || "https://randomuser.me/api/portraits/men/5.jpg",
            colorCode: userColors[2]?.color || "#10b981",
            content: "I've added Tsukiji Fish Market for breakfast. We should get there by 5am if we want to see the tuna auction!",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1) // 1 hour ago
          }
        ];
      } else if (tripId === "3") {
        // Bali Trip Comments
        exampleComments = [
          {
            id: `comment_3_1`,
            userId: collaborators[1]?.id || "6",
            userName: collaborators[1]?.name || "Emma",
            userAvatar: collaborators[1]?.avatar || "https://randomuser.me/api/portraits/women/6.jpg",
            colorCode: userColors[1]?.color || "#ec4899",
            content: "I found this amazing beachside yoga retreat. Anyone interested in joining for a morning session?",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
          },
          {
            id: `comment_3_2`,
            userId: collaborators[2]?.id || "7",
            userName: collaborators[2]?.name || "Mike",
            userAvatar: collaborators[2]?.avatar || "https://randomuser.me/api/portraits/men/7.jpg",
            colorCode: userColors[2]?.color || "#10b981",
            content: "Just booked us a private tour to the rice terraces. They'll pick us up at 8am on Tuesday. Bring sunscreen!",
            timestamp: new Date(Date.now() - 1000 * 60 * 90) // 90 minutes ago
          },
          {
            id: `comment_3_3`,
            userId: collaborators[0]?.id || "1",
            userName: collaborators[0]?.name || "You",
            userAvatar: collaborators[0]?.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
            colorCode: userColors[0]?.color || "#3b82f6",
            content: "Has anyone heard about the water temple? We should definitely check that out.",
            timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
          }
        ];
      }
      
      setComments(exampleComments);
      localStorage.setItem(`trip_comments_${tripId}`, JSON.stringify(exampleComments));
    }
  }, [tripId, collaborators, userColors]);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !tripId) return;
    
    setIsSubmitting(true);
    
    // Get current user (first collaborator for demo)
    const currentUser = collaborators[0];
    const userColor = userColors[0].color;
    
    const newCommentObj: TripComment = {
      id: `comment_${tripId}_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      colorCode: userColor,
      content: newComment,
      timestamp: new Date()
    };
    
    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    localStorage.setItem(`trip_comments_${tripId}`, JSON.stringify(updatedComments));
    
    setNewComment("");
    setIsSubmitting(false);
    toast.success("Comment added to trip!");
  };

  return (
    <div className="mt-8 bg-muted/30 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2" />
        Trip Wall
      </h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3 p-3 bg-background rounded-lg">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                <AvatarFallback>{comment.userName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span 
                    className="font-medium text-sm" 
                    style={{ color: comment.colorCode }}
                  >
                    {comment.userName}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to post on the trip wall!
          </p>
        )}
      </div>
      
      <div className="flex gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage 
            src={collaborators[0]?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"} 
            alt="Your avatar" 
          />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex items-end gap-2">
          <Textarea
            placeholder="Post a message to the trip wall..."
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
