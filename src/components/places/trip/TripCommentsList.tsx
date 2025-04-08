
import React from 'react';
import { TripComment } from './hooks/useTripComments';
import { TripCommentItem } from './TripCommentItem';

interface TripCommentsListProps {
  comments: TripComment[];
}

export const TripCommentsList: React.FC<TripCommentsListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No comments yet. Be the first to post on the trip wall!
      </p>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
      {comments.map((comment) => (
        <TripCommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
