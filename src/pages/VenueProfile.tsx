
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockLocations, mockPosts, mockComments } from "@/mock/data";
import { Location, Post, Comment } from "@/types";
import { Layout } from "@/components/Layout";
import VenueHeader from "@/components/venue/VenueHeader";
import VenuePostsContent from "@/components/venue/VenuePostsContent";
import VenueMap from "@/components/venue/VenueMap";
import PerformanceMetrics from "@/components/venue/PerformanceMetrics";
import { getMediaForLocation } from "@/utils/map/locationMediaUtils";
import { generateVenuePosts } from "@/utils/mockVenuePosts";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const VenueProfile: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Location | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [generatedVenuePosts, setGeneratedVenuePosts] = useState<Post[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [showExpandedMap, setShowExpandedMap] = useState(false);

  useEffect(() => {
    if (venueId) {
      // Try to find the venue in mockLocations
      let foundVenue = mockLocations.find(location => location.id === venueId);
      
      // If not found, try to find by numeric ID (for compatibility with different ID formats)
      if (!foundVenue && !isNaN(Number(venueId))) {
        foundVenue = mockLocations.find(location => location.id === String(Number(venueId)));
      }
      
      // If still not found, redirect to a fallback venue
      if (!foundVenue) {
        // For demo purposes, redirect to a known venue that exists in mockLocations
        const fallbackVenue = mockLocations[0];
        toast.error("Venue not found, redirecting to a available venue");
        navigate(`/venue/${fallbackVenue.id}`);
        return;
      }
      
      setVenue(foundVenue);

      // Generate venue media and posts
      const venueMedia = getMediaForLocation(foundVenue);
      const venuePosts = generateVenuePosts(foundVenue, venueMedia);
      setGeneratedVenuePosts(venuePosts);

      // Fetch all posts and filter based on the venue
      const allPostsForVenue = mockPosts.filter(post => {
        // Check if post.location exists and has an id property
        if (post.location && post.location.id) {
          // Match either exact ID or numeric equivalent
          return post.location.id === venueId || 
                 post.location.id === String(Number(venueId));
        }
        return false;
      });
      
      setAllPosts(allPostsForVenue);
      setFilteredPosts(allPostsForVenue);
    }
  }, [venueId, navigate]);

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const handleMapExpand = () => {
    setShowExpandedMap(true);
  };

  if (!venue) {
    return (
      <Layout>
        <div className="container py-6">
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <h2 className="text-2xl font-bold mb-4">Loading venue information...</h2>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-6">
        <VenueHeader venue={venue} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="md:col-span-2">
            <VenuePostsContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              viewMode={viewMode}
              setViewMode={setViewMode}
              allPosts={allPosts}
              filteredPosts={filteredPosts}
              generatedVenuePosts={generatedVenuePosts}
              selectedDays={selectedDays}
              venue={venue}
              getPostComments={getPostComments}
            />
          </div>

          <div>
            <Card className="mb-6">
              <CardContent className="p-0">
                <VenueMap venue={venue} onExpand={handleMapExpand} />
              </CardContent>
            </Card>
            <PerformanceMetrics />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VenueProfile;
