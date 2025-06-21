
import { useState } from "react";
import { Layout } from "@/components/Layout";
import PostFeed from "@/components/PostFeed";
import CameraButton from "@/components/CameraButton";
import SearchVibes from "@/components/SearchVibes";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [currentFeedTab, setCurrentFeedTab] = useState("for-you");
  const featuredUsers = ['sarah_vibes', 'jay_experiences', 'adventure_alex', 'marco_travels', 'local_explorer'];
  const isMobile = useIsMobile();

  const handleSearch = (query: string, filterType: string, category: string) => {
    // Handle search functionality if needed
    console.log('Search:', { query, filterType, category });
  };

  const handleFeedTabChange = (tab: string) => {
    setCurrentFeedTab(tab);
  };

  return (
    <Layout>
      <main className={`container py-6 ${isMobile ? 'mobile-smooth-scroll' : ''}`}>
        <div className="flex flex-col gap-6">
          {/* Search bar with feed tabs */}
          <SearchVibes 
            onSearch={handleSearch}
            onFeedTabChange={handleFeedTabChange}
            currentFeedTab={currentFeedTab}
            isHomePage={true}
          />

          {/* Main content area */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold vibe-gradient-text`}>
                {currentFeedTab === "for-you" && "Discover the Vibe Right Now"}
                {currentFeedTab === "trending" && "Trending Vibes"}
                {currentFeedTab === "recent" && "Recent Activity"}
                {currentFeedTab === "nearby" && "Nearby Vibes"}
              </h1>
            </div>

            {/* Posts feed layout with enhanced mobile scrolling */}
            <div className={`w-full ${isMobile ? 'mobile-scroll-container' : ''}`}>
              <PostFeed 
                celebrityFeatured={featuredUsers} 
                feedType={currentFeedTab}
              />
            </div>
          </div>
        </div>
      </main>
      
      <CameraButton />
    </Layout>
  );
};

export default Index;
