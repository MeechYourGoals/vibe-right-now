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
  HeartFilled,
  BookmarkFilled,
} from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLike, deleteLike, deletePost, savePost } from "@/lib/actions";
import { useUser } from "@clerk/clerk-react";
import { Post, User } from "@/types";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
	const { user } = useUser();

  const likeMutation = useMutation({
    mutationFn: isLiked ? deleteLike : createLike,
    onSuccess: () => {
      setIsLiked(!isLiked);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.log(error);
    },
  });

  const saveMutation = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      setIsSaved(!isSaved);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.log(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
    onError: (error) => {
      toast.error("Something went wrong!");
      console.log(error);
    },
  });

  const handleLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    likeMutation.mutate({ postId: post.id });
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    saveMutation.mutate({ postId: post.id });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteMutation.mutate({ postId: post.id });
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

  const goToUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/user/${post?.user?.username}`);
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar onClick={goToUser} className="cursor-pointer">
            <AvatarImage src={post?.user?.avatar} />
            <AvatarFallback>{post?.user?.username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle onClick={goToUser} className="cursor-pointer">
              {post?.user?.name}
            </CardTitle>
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
            src={post.media[0]}
            alt="Post Media"
            className="h-full w-full object-cover"
          />
        ) : (
          <p>{post.content}</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground">
          {dayjs(post.timestamp).fromNow()}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <Button variant="ghost" size="icon" onClick={handleLike}>
              {isLiked ? <HeartFilled className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
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
            {isSaved ? <BookmarkFilled className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
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
