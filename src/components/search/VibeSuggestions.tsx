
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface VibeSuggestionsProps {
  showSuggestions: boolean;
  vibeSuggestions: string[];
  onVibeSelect: (vibe: string) => void;
}

const VibeSuggestions: React.FC<VibeSuggestionsProps> = ({
  showSuggestions,
  vibeSuggestions,
  onVibeSelect,
}) => {
  return (
    <Collapsible open={showSuggestions} className="w-full">
      <CollapsibleContent className="overflow-hidden">
        <Card className="mt-1 w-full p-2 shadow-md border border-border">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground px-2 py-1">Popular Vibes</p>
            <div className="flex flex-wrap gap-2 p-2">
              {vibeSuggestions.map((vibe, index) => (
                <Badge 
                  key={index} 
                  className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer flex items-center"
                  onClick={() => onVibeSelect(vibe)}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {vibe}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default VibeSuggestions;
