
import React from "react";
import LocationsNearby from "@/components/LocationsNearby";
import RecommendedForYou from "@/components/RecommendedForYou";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";
import { useIsMobile } from "@/hooks/use-mobile";

const ExploreSidebar = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-bold mb-4 vibe-gradient-text">Around You</h2>
        <LocationsNearby />
        <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
        <TrendingLocations />
        <DiscountLocations />
      </div>
    );
  }

  return (
    <div className="w-1/4 space-y-6">
      <LocationsNearby />
      <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
      <TrendingLocations />
      <DiscountLocations />
    </div>
  );
};

export default ExploreSidebar;
