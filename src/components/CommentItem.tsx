
import { Comment } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const timeAgo = formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true });

  return (
    <div className="flex items-start space-x-2 py-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <span className="font-medium text-sm">@{comment.user.username}</span>
          {comment.vibedHere && (
            <Badge variant="outline" className="bg-primary/10 text-primary text-[10px] h-4 px-1">
              <MapPin className="h-2 w-2 mr-1" />
              Vibed Here
            </Badge>
          )}
          <span className="text-xs text-muted-foreground ml-auto">{timeAgo}</span>
        </div>
        <p className="text-sm mt-1">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
