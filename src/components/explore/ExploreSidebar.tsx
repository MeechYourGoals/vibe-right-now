
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import NearbyVibesMap from "@/components/NearbyVibesMap";
import { Location } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface ExploreSidebarProps {
  filteredLocations: Location[];
  hasRealData: boolean;
  realDataResults: Location[];
  isAIPersonalized?: boolean;
}

const ExploreSidebar: React.FC<ExploreSidebarProps> = ({
  filteredLocations,
  hasRealData,
  realDataResults,
  isAIPersonalized = false,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Nearby Map</h3>
          <NearbyVibesMap 
            height={250} 
            locations={filteredLocations.slice(0, 10)}
            isRealData={hasRealData && realDataResults.length > 0}
          />
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Quick Filters</h4>
            <div className="flex flex-wrap gap-2">
              {["Trending", "Popular", "Local Favorite", "New Opening"].map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => {
                    toast({
                      title: `${tag} Filter Applied`,
                      description: "Showing venues with this tag",
                      duration: 2000,
                    });
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Data Sources</h4>
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">Using data from:</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">TripAdvisor</Badge>
                {realDataResults.length > 0 ? (
                  <Badge variant="success" className="text-xs bg-green-100 text-green-800">{realDataResults.length} Real Venues</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">Mock Data</Badge>
                )}
              </div>
            </div>
          </div>
          
          {isAIPersonalized && (
            <div className="mt-4 text-xs text-muted-foreground border-t pt-2">
              <p>Results are personalized based on your preferences</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            navigate("/map");
          }}
        >
          <MapPin className="h-4 w-4 mr-2" /> View Full Map
        </Button>
      </div>
    </div>
  );
};

export default ExploreSidebar;
