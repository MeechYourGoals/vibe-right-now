
import React from 'react';
import { Post } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import UserPostCarouselItem from './UserPostCarouselItem';

interface UserPostCarouselProps {
  posts: Post[];
  onUserClick?: (userId: string) => void;
  onLocationClick?: (locationId: string) => void;
  fullSize?: boolean;
}

const UserPostCarousel = ({ posts, onUserClick, onLocationClick, fullSize = false }: UserPostCarouselProps) => {
  if (posts.length === 0) return null;

  // Show single post without carousel if only one post
  if (posts.length === 1) {
    return (
      <div className={fullSize ? "" : "p-4"}>
        <UserPostCarouselItem 
          post={posts[0]}
          onUserClick={onUserClick}
          onLocationClick={onLocationClick}
          fullSize={fullSize}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent className={fullSize ? "" : "-ml-2"}>
          {posts.map((post) => (
            <CarouselItem key={post.id} className={fullSize ? "" : "pl-2 md:basis-1/2 lg:basis-1/3"}>
              <div className={fullSize ? "" : "p-4"}>
                <UserPostCarouselItem 
                  post={post}
                  onUserClick={onUserClick}
                  onLocationClick={onLocationClick}
                  fullSize={fullSize}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {posts.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
      
      {/* Carousel indicator dots */}
      {posts.length > 1 && (
        <div className="flex justify-center gap-1 py-2">
          {posts.map((_, index) => (
            <div 
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPostCarousel;
