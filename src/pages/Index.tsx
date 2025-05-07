
import { useState } from "react";
import { Layout } from "@/components/Layout";
import PostFeed from "@/components/PostFeed";
import LocationsNearby from "@/components/LocationsNearby";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import CameraButton from "@/components/CameraButton";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import RecommendedForYou from "@/components/RecommendedForYou";
import VernonNext from "@/components/VernonNext";
import { useIsMobile } from "@/hooks/use-mobile";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { mockLocations } from "@/mock/data";
import SearchVibes from "@/components/SearchVibes";

const Index = () => {
  const isMobile = useIsMobile();
  const featuredUsers = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'];
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const navigate = useNavigate();

  const handleFutureSearch = (range: DateRange | undefined) => {
    if (range?.from) {
      const searchParams = new URLSearchParams();
      searchParams.set('from', range.from.toISOString().split('T')[0]);
      if (range.to) {
        searchParams.set('to', range.to.toISOString().split('T')[0]);
      }
      navigate(`/explore?${searchParams.toString()}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <Layout>
      <main className="container py-6">
        <div className="flex flex-col gap-6">
          {/* Main content area */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-2">
              <h1 className="text-3xl font-bold vibe-gradient-text mb-3 md:mb-0">
                Discover the Vibe Right Now
              </h1>
            </div>

            {/* Search bar with integrated future tab */}
            <div className="w-full mb-4">
              <SearchVibes onSearch={() => {}} onFutureSearch={handleFutureSearch} />
            </div>

            {/* Map positioned between search bar and filters */}
            <div className="w-full mb-4">
              <NearbyVibesMap 
                locations={mockLocations.slice(0, 5)}
                isRealData={false}
              />
            </div>

            {/* Posts feed and sidebar layout */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-3/4">
                <PostFeed celebrityFeatured={featuredUsers} />
              </div>
              
              {!isMobile && (
                <div className="w-full md:w-1/4 space-y-6">
                  <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
                  <TrendingLocations />
                  <DiscountLocations />
                </div>
              )}
            </div>
          </div>
          
          {isMobile && (
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-bold mb-4 vibe-gradient-text">Around You</h2>
              <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
              <TrendingLocations />
              <DiscountLocations />
            </div>
          )}
        </div>
      </main>
      
      <CameraButton />
      <VernonNext />
    </Layout>
  );
};

export default Index;
