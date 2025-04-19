
import { Layout } from "@/components/Layout";
import RecommendedForYou from "@/components/RecommendedForYou";
import PostFeed from "@/components/PostFeed";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import { LocationsNearby } from "@/components/LocationsNearby";

const Index = () => {
  return (
    <Layout>
      <main className="container relative py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold vibe-gradient-text mb-4">
              Discover Local Vibes
            </h1>
            <div className="mb-6">
              <NearbyVibesMap />
            </div>
            <PostFeed />
          </div>
          <aside className="space-y-6">
            <RecommendedForYou />
            <LocationsNearby />
          </aside>
        </div>
      </main>
    </Layout>
  );
};

export default Index;
