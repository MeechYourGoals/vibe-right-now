
import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import LocationsNearby from "@/components/LocationsNearby";
import TrendingLocations from "@/components/TrendingLocations";
import CameraButton from "@/components/CameraButton";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
              <LocationsNearby />
              <TrendingLocations />
            </div>
          )}
        </div>
      </main>
      
      <CameraButton />
    </div>
  );
};

export default Index;
