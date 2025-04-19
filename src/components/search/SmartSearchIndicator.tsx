
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface SmartSearchIndicatorProps {
  isActive: boolean;
  isAnalyzing: boolean;
  entities?: any[];
}

const SmartSearchIndicator: React.FC<SmartSearchIndicatorProps> = ({
  isActive,
  isAnalyzing,
  entities = []
}) => {
  if (!isActive) return null;
  
  return (
    <div className="mb-2 p-3 bg-primary/10 rounded-md">
      <h3 className="text-sm font-medium flex items-center">
        <Sparkles className="h-4 w-4 mr-2 text-primary" />
        {isAnalyzing ? "Analyzing with Google Cloud Natural Language API..." : "Smart Search"}
      </h3>
      <p className="text-xs text-muted-foreground">
        {isAnalyzing 
          ? "Identifying key entities and categories in your query..."
          : "Showing diverse results for your natural language search"}
      </p>
      {entities && entities.length > 0 && (
        <div className="mt-1">
          <div className="flex flex-wrap gap-1 mt-1">
            {entities.slice(0, 5).map((entity: any, index: number) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-primary/5 text-primary/70 border-primary/20 text-xs"
              >
                {entity.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearchIndicator;
