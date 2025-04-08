
import React from 'react';
import { MessageCircle } from "lucide-react";
import { TripCommentsList } from './TripCommentsList';
import { TripCommentInput } from './TripCommentInput';
import { useTripComments } from './hooks/useTripComments';

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
  const {
    comments,
    newComment,
    setNewComment,
    isSubmitting,
    handleSubmitComment
  } = useTripComments({ tripId, collaborators, userColors });

  return (
    <div className="mt-8 bg-muted/30 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2" />
        Trip Wall
      </h3>
      
      <TripCommentsList comments={comments} />
      
      <TripCommentInput
        avatarUrl={collaborators[0]?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
        value={newComment}
        onChange={setNewComment}
        onSubmit={handleSubmitComment}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
