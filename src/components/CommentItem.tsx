
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
  const content = comment.content || comment.text || "";

  return (
    <div className={`flex items-start space-x-2 py-2 ${comment.vibedHere ? 'bg-amber-50/30 border border-amber-200/50 rounded-md px-2' : ''}`}>
      <Avatar className="h-6 w-6">
        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <span className="font-medium text-sm">@{comment.user.username}</span>
          {comment.vibedHere && (
            <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 text-[10px] h-4 px-1">
              <MapPin className="h-2 w-2 mr-1" />
              <span className="font-bold">VH</span>
            </Badge>
          )}
          <span className="text-xs text-muted-foreground ml-auto">{timeAgo}</span>
        </div>
        <p className="text-sm mt-1">{content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
