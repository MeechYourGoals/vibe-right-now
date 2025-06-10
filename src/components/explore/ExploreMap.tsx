
import React from "react";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import { Location } from "@/types";

interface ExploreMapProps {
  searchQuery: string;
  filteredLocations: Location[];
}

const ExploreMap = ({ searchQuery, filteredLocations }: ExploreMapProps) => {
  return (
    <div className="w-full mb-6">
      <NearbyVibesMap 
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default ExploreMap;
