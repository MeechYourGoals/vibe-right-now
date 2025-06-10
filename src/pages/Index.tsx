
import { Layout } from "@/components/Layout";
import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import TrendingLocations from "@/components/TrendingLocations";
import LocationsNearby from "@/components/LocationsNearby";
import RecommendedForYou from "@/components/RecommendedForYou";
import DiscountLocations from "@/components/DiscountLocations";

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <PostFeed />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <TrendingLocations />
              <LocationsNearby />
              <RecommendedForYou />
              <DiscountLocations />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Index;
