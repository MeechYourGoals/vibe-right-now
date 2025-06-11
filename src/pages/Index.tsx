
import { useState } from "react";
import { Layout } from "@/components/Layout";
import PostFeed from "@/components/PostFeed";
import CameraButton from "@/components/CameraButton";
import VernonNext from "@/components/VernonNext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const featuredUsers = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'];
  const isMobile = useIsMobile();

  return (
    <Layout>
      <main className="container py-6">
        <div className="flex flex-col gap-6">
          {/* Main content area */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold vibe-gradient-text`}>
                Discover the Vibe Right Now
              </h1>
            </div>

            {/* Posts feed layout */}
            <div className="w-full">
              <PostFeed celebrityFeatured={featuredUsers} />
            </div>
          </div>
        </div>
      </main>
      
      <CameraButton />
      <VernonNext />
    </Layout>
  );
};

export default Index;
