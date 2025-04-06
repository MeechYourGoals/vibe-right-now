
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/types";
import { getRecommendedLocations } from "@/mock/cityLocations";

const RecommendedForYou = () => {
  const [recommendations, setRecommendations] = useState<Location[]>([]);
  
  useEffect(() => {
    // Get recommendations from our city data
    const recs = getRecommendedLocations();
    setRecommendations(recs);
  }, []);
  
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          <span>Recommended For You</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((location) => (
            <div 
              key={location.id} 
              className="p-3 border rounded-lg flex justify-between items-center hover:bg-accent/10 transition-colors"
            >
              <div>
                <div className="font-medium">{location.name}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{location.city}, {location.state || location.country}</span>
                  <Badge variant="outline" className="text-xs">
                    {location.type}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8" asChild>
                <a href={`/venue/${location.id}`}>
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

export default RecommendedForYou;
