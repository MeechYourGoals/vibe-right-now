
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types";
import { DollarSign, CreditCard, Video } from "lucide-react";
import { isEligibleForPriceComparison } from "@/utils/venue/travelIntegrationUtils";
import { CreditCardType } from "@/utils/creditCardRedemption";
import { toast } from "sonner";

interface VenueBadgesProps {
  venue: Location;
  showComparisons: boolean;
  setShowComparisons: (show: boolean) => void;
}

const VenueBadges = ({ venue, showComparisons, setShowComparisons }: VenueBadgesProps) => {
  const hasLivestream = venue.id.charCodeAt(0) % 3 === 0;
  const [showLivestream, setShowLivestream] = useState(false);
  
  const toggleLivestream = () => {
    setShowLivestream(!showLivestream);
  };
  
  const isEligible = isEligibleForPriceComparison(venue);
  const showCompareButton = isEligible;
  
  const isEligibleForPoints = venue.type === 'attraction' || 
                              venue.name.toLowerCase().includes('hotel') || 
                              venue.id.charCodeAt(0) % 3 === 0;
                              
  const acceptedCards: CreditCardType[] = ['amex', 'chase', 'capital_one'].filter(
    (_, index) => venue.id.charCodeAt(0) % (index + 2) === 0
  ) as CreditCardType[];
  
  const showRedeemPoints = isEligibleForPoints && acceptedCards.length > 0;
  
  const handleRedeemPoints = () => {
    const pointsRequired = venue.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) * 100;
    toast.success(`Points redemption requested for ${venue.name}`);
    toast.info(`${pointsRequired.toLocaleString()} points will be deducted from your account`);
  };
  
  return (
    <>
      {venue.verified && (
        <div className="ml-2 text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path></svg>
        </div>
      )}
      
      {hasLivestream && (
        <Badge variant="outline" className="ml-2 bg-red-500/10 text-red-500 border-red-300 cursor-pointer" onClick={toggleLivestream}>
          <span className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          LIVE
        </Badge>
      )}
      
      {showCompareButton && (
        <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500 border-blue-300 cursor-pointer" onClick={() => setShowComparisons(!showComparisons)}>
          <DollarSign className="h-3 w-3 mr-1" />
          Compare Prices
        </Badge>
      )}
      
      {showRedeemPoints && (
        <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 border-green-300 cursor-pointer" onClick={handleRedeemPoints}>
          <CreditCard className="h-3 w-3 mr-1" />
          Redeem Points
        </Badge>
      )}
      
      {showLivestream && hasLivestream && (
        <div className="mt-4 bg-black aspect-video rounded-md flex items-center justify-center relative">
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="outline" className="bg-red-500 text-white border-red-700">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              LIVE
            </Badge>
          </div>
          <div className="text-center text-white">
            <Video className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm opacity-70">Live stream from {venue.name}</p>
            <p className="text-xs mt-1 opacity-50">Viewers: {Math.floor(Math.random() * 100) + 10}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default VenueBadges;
