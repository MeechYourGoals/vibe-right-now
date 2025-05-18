
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { Globe } from "lucide-react";
import { getPriceComparisons } from "@/utils/venue/travelIntegrationUtils";
import { Badge } from "@/components/ui/badge";

interface VenuePriceComparisonsProps {
  venue: Location;
  showComparisons: boolean;
  setShowComparisons: (show: boolean) => void;
}

const VenuePriceComparisons = ({ venue, showComparisons, setShowComparisons }: VenuePriceComparisonsProps) => {
  const priceComparisons = getPriceComparisons(venue);
  
  if (!showComparisons || priceComparisons.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4 bg-muted/20 border rounded-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Price Comparisons</h3>
        <Button variant="ghost" size="sm" onClick={() => setShowComparisons(false)}>Close</Button>
      </div>
      <div className="space-y-2">
        {priceComparisons.map((comparison) => (
          <a 
            key={comparison.site} 
            href={comparison.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium capitalize">
                {comparison.site}
              </div>
              {comparison.discount && (
                <Badge className="bg-green-500 text-xs">
                  {comparison.discount}% OFF
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">${comparison.price}</span>
              <Globe className="h-3 w-3 text-muted-foreground" />
            </div>
          </a>
        ))}
        <div className="text-xs text-center text-muted-foreground pt-2">
          Prices may vary. Compare rates before booking.
        </div>
      </div>
    </div>
  );
};

export default VenuePriceComparisons;
