
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  MessageSquare,
  Heart,
  MapPin,
  Share2,
  MoreHorizontal,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Post, User } from "@/types";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Post unliked" : "Post liked!");
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Post removed from saved" : "Post saved!");
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    toast.success("Post deleted successfully!");
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: post.content,
          text: post.content,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      toast.error("Web Share API not supported!");
    }
  };

  const goToLocation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/location/${post.locationId}`);
  };

  // Change event type to accommodate div click
  const goToUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/user/${post?.user?.username}`);
  };

  // Get image URL safely
  const getImageUrl = (media: string | any) => {
    if (typeof media === 'string') {
      return media;
    } else if (media && media.url) {
      return media.url;
    }
    return '';
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4" onClick={goToUser} style={{ cursor: 'pointer' }}>
          <Avatar>
            <AvatarImage src={post?.user?.avatar} />
            <AvatarFallback>{post?.user?.username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle>{post?.user?.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              @{post?.user?.username}
            </CardDescription>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="aspect-video overflow-hidden">
        {post.media && post.media.length > 0 ? (
          <img
            src={getImageUrl(post.media[0])}
            alt="Post Media"
            className="h-full w-full object-cover"
          />
        ) : (
          <p>{post.content}</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <Button variant="ghost" size="icon" onClick={handleLike}>
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          {post.locationId && (
            <Button variant="outline" size="sm" onClick={goToLocation}>
              <MapPin className="mr-2 h-4 w-4" />
              {post?.location?.name}
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
        {post.vibeTags && post.vibeTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.vibeTags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
