// VenueProfile.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const VenueProfile: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [venue, setVenue] = useState<Location | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [generatedVenuePosts, setGeneratedVenuePosts] = useState<Post[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  useEffect(() => {
    if (venueId) {
      const foundVenue = mockLocations.find(location => location.id === venueId);
      setVenue(foundVenue);

      if (foundVenue) {
        const venueMedia = getMediaForLocation(foundVenue);
        const venuePosts = generateVenuePosts(foundVenue, venueMedia);
        setGeneratedVenuePosts(venuePosts);

        // Fetch all posts and filter based on the venue
        const allPostsForVenue = mockPosts.filter(post => post.location?.id === venueId);
        setAllPosts(allPostsForVenue);
        setFilteredPosts(allPostsForVenue);
      }
    }
  }, [venueId]);

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  if (!venue) {
    return <Layout><div>Venue not found</div></Layout>;
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
                <VenueMap venue={venue} />
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

// Somewhere in your component:
const VenueMap = ({ venue, onMapExpand }: { venue: Location, onMapExpand: () => void }) => {
  return (
    <div className="venue-map">
      {venue?.lat && venue?.lng ? (
        <iframe
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${venue.name},${venue.city}`}
        ></iframe>
      ) : (
        <p>Map Unavailable</p>
      )}
      <button onClick={onMapExpand}>Expand Map</button>
    </div>
  );
};
