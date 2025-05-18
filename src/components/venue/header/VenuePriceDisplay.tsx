
import { Location } from "@/types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Helper function to determine price tier based on venue
const getPriceTier = (venue: Location): number => {
  const basePrice = {
    restaurant: 2,
    bar: 2,
    event: 3,
    attraction: 2,
    sports: 3,
    other: 2
  }[venue.type] || 2;
  
  const idSum = venue.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  let adjustment = (idSum % 3) - 1;
  
  return Math.max(1, Math.min(4, basePrice + adjustment));
};

const renderPriceTier = (tier: number) => {
  const dollars = Array(tier).fill('$').join('');
  return (
    <span className="flex items-center">
      <span className={`font-semibold ${tier > 2 ? 'text-amber-500' : 'text-green-600'}`}>{dollars}</span>
      <span className="text-muted-foreground ml-1">
        {Array(4 - tier).fill('$').join('')}
      </span>
    </span>
  );
};

interface VenuePriceDisplayProps {
  venue: Location;
}

const VenuePriceDisplay = ({ venue }: VenuePriceDisplayProps) => {
  const priceTier = getPriceTier(venue);
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-help">{renderPriceTier(priceTier)}</div>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto p-2">
        <p className="text-sm">Price level: {priceTier}/4</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default VenuePriceDisplay;
