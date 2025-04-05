
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
  // For demo purposes, add variation to the counts
  const locationPostCounts = (() => {
    const counts: Record<string, number> = {};
    
    // Define specific counts for certain locations to ensure variety
    const specificCounts: Record<string, number> = {
      "1": 15, // Sunset Lounge
      "2": 23, // Artisan Coffee House
      "3": 8,  // Summer Music Festival
      "4": 3,  // Modern Art Museum
      "5": 42, // Skyline Rooftop Bar
      "6": 67, // Madison Square Garden
      "7": 89, // Encore Beach Club
      "8": 35, // Christ the Redeemer
      "9": 12, // Aspen Highlands
      "10": 121, // Allegiant Stadium (Super Bowl)
      "13": 78, // Houston Rodeo
      "14": 19, // Laugh Factory
      "18": 53, // Sydney Opera House
      "19": 145, // Eiffel Tower
      "20": 104, // Coachella Valley Music Festival
      "21": 31, // Gucci Pop-Up
    };
    
    // Apply the specific counts where defined, and calculate naturally for others
    filteredPosts.forEach(post => {
      const locationId = post.location.id;
      if (locationId in specificCounts) {
        counts[locationId] = specificCounts[locationId];
      } else {
        counts[locationId] = (counts[locationId] || 0) + 1;
      }
    });
    
    return counts;
  })();

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
