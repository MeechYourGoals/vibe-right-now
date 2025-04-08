
import React from 'react';
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TripComment } from './hooks/useTripComments';

interface TripCommentItemProps {
  comment: TripComment;
}

export const TripCommentItem: React.FC<TripCommentItemProps> = ({ comment }) => {
  return (
    <div className="flex space-x-3 p-3 bg-background rounded-lg">
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
  );
};
