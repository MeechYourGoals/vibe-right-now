
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockLocations, mockPosts } from "@/mock/data";
import { Badge } from "@/components/ui/badge";
import { MapPin, VerifiedIcon, Clock, ExternalLink } from "lucide-react";
import PostCard from "@/components/PostCard";
import VenuePost from "@/components/VenuePost";
import CameraButton from "@/components/CameraButton";
import Header from "@/components/Header";

// Helper function to get official ticket URLs for sports venues
const getOfficialTicketUrl = (venueId: string) => {
  // Map venue IDs to official ticket URLs
  const ticketUrls: Record<string, string> = {
    "30": "https://www.axs.com/events/crypto-com-arena", // Lakers
    "31": "https://www.therams.com/tickets/", // Rams
    "32": "https://www.mlb.com/dodgers/tickets", // Dodgers
    "33": "https://www.lagalaxy.com/tickets/", // LA Galaxy
    "34": "https://www.vbusa.org/tickets", // Venice Beach Volleyball
    "35": "https://wmphoenixopen.com/tickets/", // WM Phoenix Open
  };
  
  return ticketUrls[venueId] || "";
};

const VenueProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("ugv");
  
  // Find the venue from mock data
  const venue = mockLocations.find(location => location.id === id);
  
  // Filter posts for this venue
  const venuePosts = mockPosts.filter(post => post.location.id === id);

  // Get official ticket URL if this is a sports venue
  const officialTicketUrl = venue?.type === "sports" ? getOfficialTicketUrl(id || "") : "";
  
  // Check if venue exists
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
      
      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          {/* Venue Header */}
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
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-muted/30">{venue.type}</Badge>
                    <Badge variant="outline" className="bg-primary/20">Open Now</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
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
          </div>
          
          {/* Venue Tabs */}
          <Tabs defaultValue="ugv" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="ugv">User Vibes</TabsTrigger>
              <TabsTrigger value="vgv">Venue Vibes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ugv" className="mt-4 space-y-4">
              {venuePosts.length > 0 ? (
                venuePosts.map((post) => <PostCard key={post.id} post={post} />)
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

export default VenueProfile;
