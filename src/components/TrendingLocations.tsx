
import { mockLocations } from "@/mock/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrendingLocations = () => {
  // In a real implementation, this would be calculated based on post activity
  const trendingLocations = mockLocations.slice(2, 5);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          <span>Trending Now</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingLocations.map((location) => (
            <div 
              key={location.id} 
              className="p-3 border rounded-lg flex justify-between items-center hover:bg-accent/10 transition-colors"
            >
              <div>
                <div className="font-medium">{location.name}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{location.city}, {location.state}</span>
                  <Badge variant="outline" className="text-xs">
                    {location.type}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8" asChild>
                <a href={`/location/${location.id}`}>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingLocations;
