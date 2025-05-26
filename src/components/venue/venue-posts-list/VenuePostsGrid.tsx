import React from "react";

interface VenuePostsGridProps {
  posts: any[];
}

const VenuePostsGrid = ({ posts }: VenuePostsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="aspect-w-1 aspect-h-1">
          <div className="relative w-full h-full">
            {post.media?.map((media, index) => (
              <img
                key={media.id || index}
                src={media.url}
                alt=""
                className="w-full h-full object-cover"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VenuePostsGrid;
