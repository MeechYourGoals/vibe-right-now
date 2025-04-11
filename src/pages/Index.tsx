
import { Layout } from "@/components/Layout";
import PostFeed from "@/components/PostFeed";
import LocationsNearby from "@/components/LocationsNearby";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import CameraButton from "@/components/CameraButton";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import RecommendedForYou from "@/components/RecommendedForYou";
import VernonChat from "@/components/VernonChat";
import { useIsMobile } from "@/hooks/use-mobile";
import { getFeaturedUsers } from "@/mock/users";

const Index = () => {
  const isMobile = useIsMobile();
  const featuredUsers = getFeaturedUsers();

  return (
    <Layout>
      <main className="container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <div className="flex justify-center mb-6">
              <h1 className="text-3xl font-bold vibe-gradient-text">
                Discover the Vibe Right Now
              </h1>
            </div>
            <PostFeed celebrityFeatured={featuredUsers} />
          </div>
          
          {!isMobile ? (
            <div className="w-full md:w-1/4 space-y-6">
              <NearbyVibesMap />
              <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
              <TrendingLocations />
              <DiscountLocations />
            </div>
          ) : null}
        </div>
        
        {/* Add mobile sidebar content below the main feed on mobile */}
        {isMobile && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-bold mb-4 vibe-gradient-text">Around You</h2>
            <NearbyVibesMap />
            <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
            <TrendingLocations />
            <DiscountLocations />
          </div>
        )}
      </main>
      
      <CameraButton />
      <VernonChat />
    </Layout>
  );
};

export default Index;
