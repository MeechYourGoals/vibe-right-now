
import { useState, useEffect, useMemo } from "react";
import { mockLocations, mockPosts, mockComments } from "@/mock/data";
import { Comment, Post, Location } from "@/types";
import { generateBusinessHours } from "@/utils/businessHoursUtils";
import { 
  isWithinThreeMonths,
  createDaySpecificVenuePosts
} from "@/mock/time-utils";
import { useAuth0 } from "@auth0/auth0-react";

export const useVenueProfile = (venueId: string | undefined) => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isVenueOwner, setIsVenueOwner] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'standard' | 'plus' | 'premium' | 'pro'>('standard');
  
  const { user, isAuthenticated } = useAuth0();
  
  const venue = useMemo(() => {
    const foundVenue = mockLocations.find(location => location.id === venueId);
    
    if (foundVenue && !foundVenue.hours) {
      foundVenue.hours = generateBusinessHours(foundVenue);
    }
    
    return foundVenue;
  }, [venueId]);

  const venuePosts = useMemo(() => {
    return venue ? mockPosts.filter(post => 
      post.location.id === venue.id && 
      isWithinThreeMonths(post.timestamp)
    ) : [];
  }, [venue]);

  const generatedVenuePosts = useMemo(() => {
    if (!venue) return [];
    // Create posts and cast the result to Post[]
    return createDaySpecificVenuePosts(venue.id, venue.type) as unknown as Post[];
  }, [venue]);

  const getPostComments = (postId: string): Comment[] => {
    return mockComments.filter(comment => comment.postId === postId);
  };

  const toggleMapExpansion = () => {
    setIsMapExpanded(!isMapExpanded);
    
    setTimeout(() => {
      if (window.resizeMap) {
        window.resizeMap();
      }
    }, 10);
  };
  
  useEffect(() => {
    // Check if the user is authenticated and is the owner of the venue
    // This would normally be a server-side check
    if (isAuthenticated && user && venue) {
      // Simulating a check - in production this would compare venue owner email with user email
      // or check a venues_owners table in the database
      if (user.email === 'owner@example.com') {
        setIsVenueOwner(true);
        
        // Simulating subscription tier check - in production would fetch from database
        setSubscriptionTier('pro');
      }
    }
  }, [isAuthenticated, user, venue]);

  return {
    venue,
    venuePosts,
    generatedVenuePosts,
    isVenueOwner,
    subscriptionTier,
    isMapExpanded,
    toggleMapExpansion,
    getPostComments
  };
};
