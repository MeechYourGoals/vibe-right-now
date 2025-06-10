
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plus } from "lucide-react";

interface TripIdeasSectionProps {
  tripId: string;
}

const TripIdeasSection: React.FC<TripIdeasSectionProps> = ({ tripId }) => {
  const ideas = [
    "Visit the local farmer's market on Saturday morning",
    "Try the sunset rooftop bar downtown",
    "Take a walking food tour in the historic district",
    "Check out the new art gallery opening next week"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Trip Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {ideas.map((idea, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm">{idea}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Add Your Idea
        </Button>
      </CardContent>
    </Card>
  );
};

export default TripIdeasSection;
