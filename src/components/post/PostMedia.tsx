
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Post } from "@/types";

interface PostMediaProps {
  posts: Post[];
  isSinglePost: boolean;
}

interface MediaItem {
  postId: string;
  media: Post['media'][0];
  user: Post['user'];
}

const PostMedia: React.FC<PostMediaProps> = ({ posts, isSinglePost }) => {
  const getAllMedia = () => {
    const allMedia: MediaItem[] = [];
    
    posts.forEach(post => {
      post.media.forEach(mediaItem => {
        allMedia.push({
          postId: post.id,
          media: mediaItem,
          user: post.user
        });
      });
    });
    
    return allMedia;
  };

  const allMedia = getAllMedia();
  
  return (
    <div className="mb-4">
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {allMedia.map((item, index) => (
              <CarouselItem 
                key={`${item.postId}-${index}`} 
                className={isSinglePost ? "basis-full" : "md:basis-1/2 lg:basis-1/3"}
              >
                <div className="relative group rounded-lg overflow-hidden aspect-square">
                  {item.media.type === "image" ? (
                    <img
                      src={item.media.url}
                      alt={`Post media`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.media.url}
                      controls
                      className="w-full h-full object-cover"
                      poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex flex-col items-center text-white">
                      <Avatar className="h-8 w-8 mb-1 border-2 border-white">
                        <AvatarImage src={item.user.avatar} alt={item.user.name} />
                        <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">@{item.user.username}</span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  );
};

export default PostMedia;
