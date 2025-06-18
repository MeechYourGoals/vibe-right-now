
import React from "react";
import RecommendedForYou from "@/components/RecommendedForYou";
import TrendingLocations from "@/components/TrendingLocations";
import DiscountLocations from "@/components/DiscountLocations";

interface ExploreSidebarProps {
  isMobile: boolean;
}

const ExploreSidebar: React.FC<ExploreSidebarProps> = ({ isMobile }) => {
  const sidebarContent = (
    <div className="space-y-6">
      <RecommendedForYou featuredLocations={["5", "7", "10", "13", "20"]} />
      <TrendingLocations />
      <DiscountLocations />
    </div>
  );

  if (isMobile) {
    return (
      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-bold mb-4 vibe-gradient-text">Around You</h2>
        {sidebarContent}
      </div>
    );
  }

  return (
    <div className="w-1/4 space-y-6">
      {sidebarContent}
    </div>
  );
};

export default ExploreSidebar;
