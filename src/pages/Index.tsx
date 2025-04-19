import { Layout } from "@/components/Layout";
import RecommendedForYou from "@/components/RecommendedForYou";
import PostFeed from "@/components/PostFeed";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import { LocationsNearby } from "@/components/LocationsNearby";
import { useState } from "react";

const Index = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <Layout>
      <main className="container relative py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold vibe-gradient-text mb-4">
              Discover Local Vibes
            </h1>
            <PostFeed />
          </div>
          <aside className="space-y-6">
            <RecommendedForYou />
            <LocationsNearby />
          </aside>
        </div>

        {showMap && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4">
              <button
                className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center"
                onClick={() => setShowMap(false)}
              >
                X
              </button>
              <NearbyVibesMap />
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Index;
