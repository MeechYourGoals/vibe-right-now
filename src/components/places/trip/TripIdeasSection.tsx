
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Plus } from 'lucide-react';

export interface TripIdeasSectionProps {
  tripId: string;
  collaborators?: { id: string; name: string; avatar: string; }[];
  userColors?: { id: string; color: string; }[];
}

const TripIdeasSection = ({ tripId, collaborators, userColors }: TripIdeasSectionProps) => {
  const mockIdeas = [
    { id: '1', text: 'Visit the local food market for authentic cuisine', author: 'Sarah' },
    { id: '2', text: 'Take a sunset photo at the viewpoint', author: 'Mike' },
    { id: '3', text: 'Try the famous ice cream shop downtown', author: 'Emma' }
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
          {mockIdeas.map((idea) => (
            <div key={idea.id} className="p-3 bg-muted/50 rounded-lg">
              <p className="text-sm">{idea.text}</p>
              <p className="text-xs text-muted-foreground mt-1">Suggested by {idea.author}</p>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Idea
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripIdeasSection;
