
import { MapPin, CreditCard } from "lucide-react";
import { Location } from "@/types";
import { Badge } from "@/components/ui/badge";
import VenuePriceDisplay from "./VenuePriceDisplay";
import { CreditCardType } from "@/utils/creditCardRedemption";

interface VenueCardInfoProps {
  venue: Location;
}

const VenueCardInfo = ({ venue }: VenueCardInfoProps) => {
  const isEligibleForPoints = venue.type === 'attraction' || 
                             venue.name.toLowerCase().includes('hotel') || 
                             venue.id.charCodeAt(0) % 3 === 0;
                             
  const acceptedCards: CreditCardType[] = ['amex', 'chase', 'capital_one'].filter(
    (_, index) => venue.id.charCodeAt(0) % (index + 2) === 0
  ) as CreditCardType[];
  
  const showRedeemPoints = isEligibleForPoints && acceptedCards.length > 0;
  
  return (
    <div className="flex flex-col items-end">
      <div className="flex gap-2 mb-1">
        <Badge variant="outline" className="capitalize">{venue.type}</Badge>
        <VenuePriceDisplay venue={venue} />
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <MapPin className="h-4 w-4 mr-1" />
        <span>
          {venue.address}, {venue.city}, {venue.state}
        </span>
      </div>
      {showRedeemPoints && (
        <div className="flex items-center text-xs text-green-600 mt-1">
          <CreditCard className="h-3 w-3 mr-1" />
          <span>
            Accepts points: {acceptedCards.map(card => 
              card === 'amex' ? 'Amex' : 
              card === 'capital_one' ? 'Capital One' : 
              card.charAt(0).toUpperCase() + card.slice(1)
            ).join(', ')}
          </span>
        </div>
      )}
    </div>
  );
};

export default VenueCardInfo;
