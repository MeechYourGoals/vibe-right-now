
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Location } from "@/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import {
  getPriceComparisons,
  isEligibleForPriceComparison,
  PriceComparison
} from "@/utils/venue/travelIntegrationUtils";

interface TravelSiteComparisonProps {
  venue: Location;
}

const TravelSiteComparison: React.FC<TravelSiteComparisonProps> = ({ venue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comparisons, setComparisons] = useState<PriceComparison[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if the venue is eligible for price comparisons
  const isEligible = isEligibleForPriceComparison(venue);

  if (!isEligible) {
    return null;
  }

  const handleCompare = () => {
    setIsOpen(!isOpen);
    
    // Load comparisons on first open
    if (!isOpen && comparisons.length === 0) {
      setIsLoading(true);
      
      // Simulate API call with a slight delay
      setTimeout(() => {
        setComparisons(getPriceComparisons(venue));
        setIsLoading(false);
      }, 500);
    }
  };

  // Format price with dollar sign
  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  // Capitalize first letter of site name
  const formatSiteName = (site: string) => {
    return site.charAt(0).toUpperCase() + site.slice(1);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full border rounded-md overflow-hidden mb-2"
    >
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleCompare} 
          className="w-full justify-between"
        >
          <span>Compare Prices on Travel Sites</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-3 space-y-3">
          {isLoading ? (
            <div className="py-4 text-center text-muted-foreground">
              Loading price comparisons...
            </div>
          ) : (
            <div className="space-y-2">
              {comparisons.map((comparison, index) => (
                <a 
                  key={comparison.site} 
                  href={comparison.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">
                      {formatSiteName(comparison.site)}
                    </div>
                    {comparison.discount && (
                      <Badge className="bg-green-500 text-xs">
                        {comparison.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      {formatPrice(comparison.price)}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                </a>
              ))}
              
              {comparisons.length > 0 && (
                <div className="text-xs text-center text-muted-foreground pt-2">
                  Prices may vary. Always check official sites for final rates.
                </div>
              )}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TravelSiteComparison;
