
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface CompetitorTagsProps {
  competitorVenues: Array<{
    id: number;
    name: string;
    tags: string[];
  }>;
  onTagSelect: (tag: string) => void;
}

const CompetitorTags = ({ competitorVenues, onTagSelect }: CompetitorTagsProps) => {
  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
      <h4 className="text-sm font-medium flex items-center">
        <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
        Similar Venue Tags for Inspiration
      </h4>
      
      <div className="space-y-3">
        {competitorVenues.map(venue => (
          <div key={venue.id} className="text-xs">
            <p className="font-medium mb-1">{venue.name}</p>
            <div className="flex flex-wrap gap-1">
              {venue.tags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/10 text-xs py-0 px-2"
                  onClick={() => onTagSelect(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorTags;
