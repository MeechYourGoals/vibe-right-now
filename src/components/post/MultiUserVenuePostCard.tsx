
import React, { useState } from "react";
import { Post } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ASPECT_RATIO = "aspect-[4/5]";

interface MultiUserVenuePostCardProps {
  posts: Post[]; // All posts from different users about the same venue
}

const MultiUserVenuePostCard: React.FC<MultiUserVenuePostCardProps> = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = posts.length;
  const post = posts[currentIndex];

  const next = () => setCurrentIndex((i) => (i + 1) % total);
  const prev = () => setCurrentIndex((i) => (i - 1 + total) % total);

  return (
    <div className={`bg-card rounded-lg overflow-hidden shadow-md w-full flex flex-col ${ASPECT_RATIO} relative`}>
      {/* Venue at top always */}
      <div className="px-4 pt-3 pb-2 flex items-center gap-2 bg-background absolute top-0 left-0 w-full z-10">
        <span className="font-semibold">{post.location?.name}</span>
      </div>
      {/* Image/video and user info */}
      <div className={`flex-1 relative w-full h-full flex items-center justify-center ${ASPECT_RATIO}`}>
        {post.media[0]?.type === "image" ? (
          <img
            src={post.media[0].url}
            alt="Venue photo"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : post.media[0]?.type === "video" ? (
          <video
            src={post.media[0].url}
            className="absolute inset-0 w-full h-full object-cover"
            poster={post.media[0]?.thumbnail}
            controls
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted bg-muted h-full">No media</div>
        )}

        {total > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full h-8 w-8 z-10"
              onClick={prev}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40 rounded-full h-8 w-8 z-10"
              onClick={next}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {posts.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full ${i === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* User/caption at bottom */}
      <div className="bg-background bg-opacity-60 p-4 flex items-start gap-3 absolute bottom-0 left-0 w-full z-10">
        <Avatar className="h-8 w-8">
          <AvatarImage src={post.user.avatar} alt={post.user.name} />
          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">@{post.user.username}</div>
          <div className="text-xs">{post.content}</div>
        </div>
        <span className="text-xs text-muted-foreground ml-auto">{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
      </div>
    </div>
  );
};

export default MultiUserVenuePostCard;
