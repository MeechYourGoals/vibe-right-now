
import { useState } from "react";
import { Location } from "@/types";
import { Badge } from "@/components/ui/badge";
import BusinessHours from "@/components/BusinessHours";
import VenueBadges from "./header/VenueBadges";
import VenueCardInfo from "./header/VenueCardInfo";
import VenuePriceComparisons from "./header/VenuePriceComparisons";
import VenueActionButtons from "./header/VenueActionButtons";

const VenueProfileHeader = ({ venue, onMapExpand }: { venue: Location, onMapExpand: () => void }) => {
  const [showComparisons, setShowComparisons] = useState(false);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          {venue.name}
          <VenueBadges
            venue={venue}
            showComparisons={showComparisons}
            setShowComparisons={setShowComparisons}
          />
        </h1>
        
        <VenueCardInfo venue={venue} />
      </div>
      
      <VenuePriceComparisons 
        venue={venue} 
        showComparisons={showComparisons} 
        setShowComparisons={setShowComparisons} 
      />
      
      <BusinessHours venue={venue} />
      
      <VenueActionButtons venue={venue} />

      {venue.hours && venue.hours.isOpen24Hours && (
        <Badge className="mt-2 bg-green-500 hover:bg-green-600">Open 24 Hours</Badge>
      )}
    </div>
  );
};

export default VenueProfileHeader;
