
import { Layout } from "@/components/Layout";
import PostFeed from "@/components/PostFeed";
import LocationsNearby from "@/components/LocationsNearby";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import CameraButton from "@/components/CameraButton";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import RecommendedForYou from "@/components/RecommendedForYou";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

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
            <PostFeed />
          </div>
          
          {!isMobile && (
            <div className="w-full md:w-1/4 space-y-6">
              <NearbyVibesMap />
              <RecommendedForYou />
              <TrendingLocations />
              <DiscountLocations />
            </div>
          )}
        </div>
      </main>
      
      <CameraButton />
    </Layout>
  );
};

export default Index;
