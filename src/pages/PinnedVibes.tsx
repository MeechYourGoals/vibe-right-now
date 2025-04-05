
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Bookmark, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Sample pinned content
const pinnedPosts = [
  {
    id: "1",
    venue: {
      id: "123",
      name: "Griffith Observatory",
      type: "attraction",
      city: "Los Angeles",
      state: "CA",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    },
    content: "Stunning views of LA from the Griffith Observatory. Perfect for sunset visits!",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1566159196870-a69f1d122ae4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: "2",
    venue: {
      id: "456",
      name: "The Getty",
      type: "attraction",
      city: "Los Angeles",
      state: "CA",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    },
    content: "Amazing art exhibits at The Getty today. The architecture is almost as impressive as the art itself!",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1594132542197-3e73ebb341a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  },
  {
    id: "3",
    venue: {
      id: "30",
      name: "Lakers Game",
      type: "sports",
      city: "Los Angeles",
      state: "CA",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    },
    content: "Caught the Lakers game last night - incredible atmosphere at the Crypto.com Arena!",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  }
];

const PinnedVibes = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">Pinned Vibes</h1>
        <p className="text-muted-foreground mb-6">Your saved posts and places for quick access.</p>
        
        <div className="space-y-6">
          {pinnedPosts.map(post => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={`https://source.unsplash.com/random/200x200/?${post.venue.type}`} alt={post.venue.name} />
                      <AvatarFallback>{post.venue.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center">{post.venue.name}</div>
                      <div className="text-sm text-muted-foreground">{post.venue.city}, {post.venue.state}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Pinned {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="mb-3">{post.content}</p>
                <div className="rounded-lg overflow-hidden">
                  {post.media.type === "image" ? (
                    <img
                      src={post.media.url}
                      alt={`Media by ${post.venue.name}`}
                      className="w-full h-auto object-cover rounded-md"
                    />
                  ) : (
                    <video
                      src={post.media.url}
                      controls
                      className="w-full h-auto rounded-md"
                      poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="bg-muted">{post.venue.type}</Badge>
                  <div className="flex items-center ml-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{post.venue.city}, {post.venue.state}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                <Button 
                  variant="outline"
                  size="sm" 
                  className="bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500/30"
                >
                  <Bookmark className="h-4 w-4 mr-1" />
                  Unpin
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 rounded-lg bg-muted/50 p-4 text-xs text-muted-foreground">
          <p className="font-medium">Community Guidelines</p>
          <p className="mt-1">Post vibes that make others want to visit. No memes, flyers, or unrelated posts please.</p>
        </div>
      </div>
    </Layout>
  );
};

export default PinnedVibes;
