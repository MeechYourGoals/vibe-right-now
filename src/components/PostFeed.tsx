
import { useState } from "react";
import { mockPosts } from "@/mock/data";
import PostCard from "@/components/PostCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const PostFeed = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="sticky top-16 z-10 bg-background p-4 border-b">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder="Search vibes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vibes</SelectItem>
              <SelectItem value="restaurant">Restaurants</SelectItem>
              <SelectItem value="bar">Bars</SelectItem>
              <SelectItem value="event">Events</SelectItem>
              <SelectItem value="attraction">Attractions</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
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
