import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockLocations, mockPosts } from "@/mock/data";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, VerifiedIcon, Clock, ExternalLink, Grid2X2, 
  ListIcon, PlusCircle, Heart, Map, Maximize, Minimize
} from "lucide-react";
import PostCard from "@/components/PostCard";
import VenuePost from "@/components/VenuePost";
import CameraButton from "@/components/CameraButton";
import Header from "@/components/Header";
import { mockComments } from "@/mock/data";
import { Comment, Post } from "@/types";
import { toast } from "@/hooks/use-toast";
import MapboxMap from "@/components/map/MapboxMap";
import OpenStreetMap from "@/components/map/OpenStreetMap";

const getOfficialTicketUrl = (venueId: string) => {
  const ticketUrls: Record<string, string> = {
    "30": "https://www.axs.com/events/crypto-com-arena",
    "31": "https://www.therams.com/tickets/",
    "32": "https://www.mlb.com/dodgers/tickets",
    "33": "https://www.lagalaxy.com/tickets/",
    "34": "https://www.vbusa.org/tickets",
    "35": "https://wmphoenixopen.com/tickets/",
  };
  
  return ticketUrls[venueId] || "";
};

const VenueProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("ugv");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  
  const venue = mockLocations.find(location => location.id === id);
  const venuePosts = mockPosts.filter(post => post.location.id === id);
  const officialTicketUrl = venue?.type === "sports" ? getOfficialTicketUrl(id || "") : "";

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    
    if (isFollowing) {
      toast({
        title: "Unfollowed",
        description: `You are no longer following ${venue?.name}`,
      });
    } else {
      toast({
        title: "Following!",
        description: `You are now following ${venue?.name}`,
      });
    }
  };
  
  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);
    
    setTimeout(() => {
      if (window.resizeMap) {
        window.resizeMap();
      }
    }, 10);
  };
  
  if (!venue) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Venue not found</h1>
          <p className="text-muted-foreground">This venue doesn't exist or has been removed.</p>
          <Button className="mt-6" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {isMapExpanded && (
        <div className="fixed inset-0 z-50 bg-background p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{venue.name} Location</h2>
            <Button variant="ghost" size="sm" className="gap-1" onClick={toggleMapExpansion}>
              <Minimize className="h-4 w-4" />
              Close Map
            </Button>
          </div>
          <div className="h-[85vh] rounded-lg overflow-hidden">
            <OpenStreetMap
              userLocation={null}
              locations={[venue]}
              searchedCity={venue.city}
              mapStyle="default"
              selectedLocation={null}
              userAddressLocation={null}
              onLocationSelect={() => {}}
              showAllCities={!venue.city}
            />
          </div>
        </div>
      )}
      
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect p-6 rounded-xl mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={`https://source.unsplash.com/random/200x200/?${venue.type}`} alt={venue.name} />
                  <AvatarFallback>{venue.name[0]}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h1 className="text-2xl font-bold flex items-center">
                    {venue.name}
                    {venue.verified && (
                      <VerifiedIcon className="h-5 w-5 ml-2 text-primary" />
                    )}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{venue.address}, {venue.city}, {venue.state}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 p-0 hover:bg-transparent hover:text-primary"
                      onClick={toggleMapExpansion}
                    >
                      <Map className="h-4 w-4" />
                      <span className="ml-1 text-xs">View Map</span>
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-muted/30">{venue.type}</Badge>
                    <Badge variant="outline" className="bg-primary/20">Open Now</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <Button 
                  variant={isFollowing ? "default" : "outline"}
                  onClick={handleFollowToggle}
                  className={isFollowing ? "bg-primary" : ""}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="default" className="bg-gradient-vibe">Check In</Button>
                {venue.type === "sports" && officialTicketUrl && (
                  <a 
                    href={officialTicketUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-2"
                  >
                    <Button 
                      variant="outline" 
                      className="bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500/30"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buy Tickets Direct
                    </Button>
                  </a>
                )}
                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Posts expire in 24h
                </p>
              </div>
            </div>
            
            <div className="mt-4 h-48 rounded-md overflow-hidden relative">
              <OpenStreetMap
                userLocation={null}
                locations={[venue]}
                searchedCity={venue.city}
                mapStyle="default"
                selectedLocation={null}
                userAddressLocation={null}
                onLocationSelect={() => {}}
                showAllCities={false}
              />
              <div className="absolute bottom-2 right-2">
                <Button size="sm" variant="secondary" onClick={toggleMapExpansion}>
                  <Maximize className="h-4 w-4 mr-1" />
                  Expand
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="ugv" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <TabsList className="grid grid-cols-2 w-[200px]">
                <TabsTrigger value="ugv">User Vibes</TabsTrigger>
                <TabsTrigger value="vgv">Venue Vibes</TabsTrigger>
              </TabsList>
              
              {activeTab === "ugv" && (
                <div className="flex gap-2">
                  <Button 
                    variant={viewMode === "list" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === "grid" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <TabsContent value="ugv" className="mt-4 space-y-4">
              {venuePosts.length > 0 ? (
                viewMode === "list" ? (
                  <PostCard 
                    posts={venuePosts} 
                    locationPostCount={venuePosts.length}
                    getComments={getPostComments} 
                  />
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {venuePosts.map((post) => (
                      <PostGridItem key={post.id} post={post} />
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-2">No user vibes yet</h3>
                  <p className="text-muted-foreground">Be the first to post a vibe here!</p>
                  <Button className="mt-4 bg-gradient-vibe">Post a Vibe</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="vgv" className="mt-4 space-y-4">
              <VenuePost 
                venue={venue}
                content="Check out our live DJ set tonight from 9PM! No cover charge before 10PM."
                media={{ type: "image", url: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" }}
                timestamp={new Date().toISOString()}
              />
              <VenuePost 
                venue={venue}
                content="Today's special: Truffle pasta with wild mushrooms!"
                media={{ type: "image", url: "https://images.unsplash.com/photo-1588689115105-0361a0adbbb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" }}
                timestamp={new Date().toISOString()}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <CameraButton />
    </div>
  );
};

interface PostGridItemProps {
  post: Post;
}

const PostGridItem = ({ post }: PostGridItemProps) => {
  const [liked, setLiked] = useState(false);
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <Link to={`/post/${post.id}`} className="group relative block aspect-square overflow-hidden rounded-lg">
      {post.media[0]?.type === "image" ? (
        <img 
          src={post.media[0].url}
          alt={`Post by ${post.user.username}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      ) : post.media[0]?.type === "video" ? (
        <video
          src={post.media[0].url}
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">
          <p className="p-2 text-center text-sm">{post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''}</p>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border border-white">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-white">@{post.user.username}</span>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLike} 
              className="h-8 px-2 text-white hover:bg-black/20"
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="ml-1">{post.likes + (liked ? 1 : 0)}</span>
            </Button>
            <span className="text-xs text-white">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueProfile;
