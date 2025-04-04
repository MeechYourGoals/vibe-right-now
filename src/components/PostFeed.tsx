
import { useState } from "react";
import { mockPosts } from "@/mock/data";
import PostCard from "@/components/PostCard";
import SearchVibes from "@/components/SearchVibes";

const PostFeed = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string, filterType: string) => {
    setSearchQuery(query);
    if (filterType !== "All") {
      setFilter(filterType.toLowerCase());
    } else {
      setFilter("all");
    }
  };

  const filteredPosts = mockPosts.filter((post) => {
    if (filter !== "all" && post.location.type !== filter) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.location.name.toLowerCase().includes(query) ||
        post.location.city.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Calculate the number of posts per location in the last 24 hours
  const locationPostCounts = filteredPosts.reduce((acc, post) => {
    const locationId = post.location.id;
    acc[locationId] = (acc[locationId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-3xl mx-auto">
      <SearchVibes onSearch={handleSearch} />

      <div className="p-4 space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              locationPostCount={locationPostCounts[post.location.id]}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No vibes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or post your own vibe!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostFeed;
