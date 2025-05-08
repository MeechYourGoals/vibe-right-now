
import { useState } from "react";
import { Layout } from "@/components/Layout";
import PostFeed from "@/components/PostFeed";
import RecommendedForYou from "@/components/RecommendedForYou";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import CameraButton from "@/components/CameraButton";
import VernonNext from "@/components/VernonNext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const featuredUsers = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'];

  return (
    <Layout>
      <main className="container py-6">
        <div className="flex flex-col gap-6">
          {/* Main content area */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold vibe-gradient-text">
                Discover the Vibe Right Now
              </h1>
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
