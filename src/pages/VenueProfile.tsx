
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockLocations } from "@/mock/data";
import { Location } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import VenueHeader from "@/components/venue/VenueHeader";
import VenueAbout from "@/components/venue/VenueAbout";
import VenueMap from "@/components/venue/VenueMap";
import VenueAssistant from "@/components/venue/VenueAssistant";
import VenueManagedBy from "@/components/venue/VenueManagedBy";
import VenueDiscussions from "@/components/venue/VenueDiscussions";
import VenuePostsList from "@/components/venue/venue-posts-list/VenuePostsList";
import { getVenueById } from "@/services/VenueService";
import { getPostsForVenue } from "@/services/PostService";
import { getCommentsForPost } from "@/services/CommentService";
import { Layout } from "@/components/Layout";
import { SkeletonVenueHeader } from "@/components/SkeletonVenueHeader";
import { SkeletonVenueAbout } from "@/components/SkeletonVenueAbout";
import { SkeletonVenueMap } from "@/components/SkeletonVenueMap";
import { SkeletonVenuePosts } from "@/components/SkeletonVenuePosts";
import { SkeletonVenueAssistant } from "@/components/SkeletonVenueAssistant";
import { SkeletonVenueReviews } from "@/components/SkeletonVenueReviews";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const VenueProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [venue, setVenue] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [mapDialogOpen, setMapDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadVenue = async () => {
      try {
        // In a real app, this would be an API call to fetch the venue by ID
        // For now, we'll just use mock data
        const foundVenue = mockLocations.find(loc => loc.id === id);
        
        if (foundVenue) {
          setVenue(foundVenue);
          setLoading(false);
        } else {
          setError("Venue not found");
          setLoading(false);
          toast({
            title: "Error",
            description: "The requested venue could not be found.",
            variant: "destructive"
          });
          
          // Navigate back to explore page after a delay
          setTimeout(() => {
            navigate("/explore");
          }, 3000);
        }
      } catch (err) {
        console.error("Error loading venue:", err);
        setError("Failed to load venue data");
        setLoading(false);
      }
    };
    
    loadVenue();
  }, [id, navigate, toast]);
  
  // Check if the current user is the owner of the venue
  const isOwner = () => {
    if (!venue || !venue.ownerIdentifier) return false;
    // In a real app, this would check if the current user's ID matches the venue's owner ID
    return false; // Default to false for now
  };
  
  const handleExpandMap = () => {
    setMapDialogOpen(true);
  };

  return (
    <Layout>
      <main className="container py-6">
        {loading ? (
          <div className="space-y-8">
            <SkeletonVenueHeader />
            <SkeletonVenueAbout />
            <SkeletonVenueMap />
            <SkeletonVenuePosts />
            <SkeletonVenueAssistant />
            <SkeletonVenueReviews />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Error</h2>
            <p className="text-muted-foreground">{error}</p>
            <p className="mt-4">Redirecting to Explore page...</p>
          </div>
        ) : venue ? (
          <div className="space-y-8">
            {/* Venue Header */}
            <VenueHeader venue={venue} isOwner={isOwner()} />
            
            {/* Venue Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="assistant">Vernon AI</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <VenueAbout venue={venue} />
                  </div>
                  <div className="md:col-span-1">
                    <VenueMap venue={venue} onExpand={handleExpandMap} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="posts" className="mt-6">
                <VenuePostsList venue={venue} />
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <VenueDiscussions venue={venue} />
              </TabsContent>
              
              <TabsContent value="assistant" className="mt-6">
                <VenueAssistant venue={venue} />
              </TabsContent>
            </Tabs>
            
            {/* Map Dialog */}
            <Dialog open={mapDialogOpen} onOpenChange={setMapDialogOpen}>
              <DialogContent className="sm:max-w-[90vw] h-[80vh] p-0">
                <div className="h-full">
                  {/* You would implement a full-screen map here */}
                  <iframe
                    title={`Map for ${venue.name}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBQwBQcUxHAzfHjUZPd47Q3zOcQLfFAUA4&q=${encodeURIComponent(
                      `${venue.name}, ${venue.address}, ${venue.city}, ${venue.state || ''}`
                    )}`}
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : null}
      </main>
    </Layout>
  );
};

export default VenueProfile;
