
import { useState, useMemo, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockComments } from "@/mock/data";
import CameraButton from "@/components/CameraButton";
import Header from "@/components/Header";
import { Comment, Post, Location } from "@/types";
import GoogleMapComponent, { GoogleMapHandle } from "@/components/map/google/GoogleMap";
import { generateBusinessHours } from "@/utils/businessHoursUtils";
import {
  isWithinThreeMonths,
  createDaySpecificVenuePosts
} from "@/mock/time-utils";
import DayOfWeekFilter from "@/components/venue/DayOfWeekFilter";
import VenueProfileHeader from "@/components/venue/VenueProfileHeader";
import VenueMap from "@/components/venue/VenueMap";
import VenuePostsContent from "@/components/venue/VenuePostsContent";
import WaitTimeDisplay from "@/components/venue/WaitTimeDisplay";
import WaitTimeUpdater from "@/components/venue/WaitTimeUpdater";
import PremiumFeaturesContainer from "@/components/venue/PremiumFeaturesContainer";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { locationsRepo, postsRepo } from "@/services/data";

// Define an extended Post type that includes venue-specific properties
interface ExtendedPost extends Post {
  isVenuePost?: boolean;
  isPinned?: boolean;
  isExternalPost?: boolean;
}

const VenueProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const mapRef = useRef<GoogleMapHandle>(null);
  const [isVenueOwner, setIsVenueOwner] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'standard' | 'plus' | 'premium' | 'pro'>('standard');

  // Venue + posts are loaded from the data layer (Supabase with mock fallback).
  const [venue, setVenue] = useState<Location | null>(null);
  const [venuePosts, setVenuePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, isAuthenticated } = useSupabaseAuth();
  const { canAccessFeature } = useUserSubscription();

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);

    Promise.all([locationsRepo.getById(id), postsRepo.getByVenue(id)])
      .then(([loc, posts]) => {
        if (cancelled) return;
        if (loc) {
          // Derive business hours from the venue data when not present.
          if (!loc.hours) {
            loc.hours = generateBusinessHours(loc);
          }
          setVenue(loc);
        } else {
          setVenue(null);
        }
        // Keep only posts from the last three months for the venue feed.
        setVenuePosts((posts ?? []).filter((p) => isWithinThreeMonths(p.timestamp)));
      })
      .catch((err) => {
        console.error("Error loading venue:", err);
        if (!cancelled) setVenue(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (isAuthenticated && user && venue) {
      if (user.email === 'owner@example.com') {
        setIsVenueOwner(true);
        setSubscriptionTier('pro');
      }
    }
  }, [isAuthenticated, user, venue]);

  // Demo venue content (day-specific posts) generated from mock helpers as a fallback so
  // the feed is never empty even when the DB has no venue posts.
  const generatedVenuePosts = useMemo(() => {
    if (!venue) return [];
    return createDaySpecificVenuePosts(venue.id, venue.type) as unknown as Post[];
  }, [venue]);

  const filteredPosts = useMemo(() => {
    if (selectedDays.length === 0) {
      return venuePosts;
    }

    return venuePosts.filter(post =>
      selectedDays.includes(new Date(post.timestamp).getDay())
    );
  }, [venuePosts, selectedDays]);

  const allPosts = useMemo(() => {
    if (!venue) return [];

    const filteredVenuePosts = selectedDays.length === 0
      ? generatedVenuePosts
      : generatedVenuePosts.filter(post =>
          selectedDays.includes(new Date(post.timestamp).getDay())
        );

    const combined = [...filteredPosts, ...filteredVenuePosts].sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return combined;
  }, [filteredPosts, venue, generatedVenuePosts, selectedDays]);

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);

    setTimeout(() => {
      mapRef.current?.resize();
    }, 10);
  };

  const handleDayToggle = (dayIndex: number) => {
    setSelectedDays(prev => {
      if (prev.includes(dayIndex)) {
        return prev.filter(day => day !== dayIndex);
      } else {
        return [...prev, dayIndex];
      }
    });
  };

  const clearDayFilters = () => {
    setSelectedDays([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Loading venue...</p>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Venue not found</h1>
          <p className="text-muted-foreground">
            This venue doesn't exist or has been removed.
          </p>
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
            <GoogleMapComponent
              ref={mapRef}
              userLocation={null}
              locations={[venue]}
              searchedCity={venue.city}
              mapStyle="default"
              selectedLocation={null}
              onLocationSelect={() => {}}
              userAddressLocation={null}
            />
          </div>
        </div>
      )}

      <main className="container py-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect p-6 rounded-xl mb-6">
            <VenueProfileHeader venue={venue} onMapExpand={toggleMapExpansion} />

            <WaitTimeDisplay venueId={venue.id} className="mb-4" />

            <VenueMap venue={venue} onExpand={toggleMapExpansion} />

            {isVenueOwner && (
              <div className="mt-4">
                <WaitTimeUpdater
                  venueId={venue.id}
                  subscriptionTier={subscriptionTier}
                />
              </div>
            )}
          </div>

          <PremiumFeaturesContainer
            venueId={venue.id}
            venueName={venue.name}
          />

          <DayOfWeekFilter
            selectedDays={selectedDays}
            onDayToggle={handleDayToggle}
            onClearFilters={clearDayFilters}
          />

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
      </main>

      <CameraButton />
    </div>
  );
};

export default VenueProfile;
