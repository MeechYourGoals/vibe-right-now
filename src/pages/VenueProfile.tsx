
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CameraButton from "@/components/CameraButton";
import Header from "@/components/Header";
import VenueProfileContent from "@/components/venue/VenueProfileContent";
import { useVenueProfile } from "@/hooks/useVenueProfile";

const VenueProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    venue, 
    venuePosts, 
    generatedVenuePosts, 
    isVenueOwner,
    subscriptionTier,
    isMapExpanded,
    toggleMapExpansion,
    getPostComments
  } = useVenueProfile(id);

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
      
      <VenueProfileContent
        venue={venue}
        venuePosts={venuePosts}
        generatedVenuePosts={generatedVenuePosts}
        getPostComments={getPostComments}
        isVenueOwner={isVenueOwner}
        subscriptionTier={subscriptionTier}
        isMapExpanded={isMapExpanded}
        toggleMapExpansion={toggleMapExpansion}
      />
      
      <CameraButton />
    </div>
  );
};

export default VenueProfile;
