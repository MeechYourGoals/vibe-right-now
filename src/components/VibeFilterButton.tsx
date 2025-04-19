
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { vibeTags } from "@/hooks/useVibeFilters";
import VibeTags from "./VibeTags";

interface VibeFilterButtonProps {
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearTags: () => void;
}

const VibeFilterButton = ({ selectedTags, toggleTag, clearTags }: VibeFilterButtonProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant={selectedTags.length > 0 ? "default" : "outline"} 
            size="sm" 
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Vibe Filters {selectedTags.length > 0 && `(${selectedTags.length})`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Filter by Vibe</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Select vibes to filter your feed
            </p>
            <div className="grid grid-cols-2 gap-1 min-w-[280px]">
              {vibeTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`${
                    selectedTags.includes(tag) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  } text-xs cursor-pointer flex items-center justify-start`}
                  onClick={() => toggleTag(tag)}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <Button 
                variant="link" 
                size="sm" 
                className="mt-2 text-muted-foreground" 
                onClick={clearTags}
              >
                Clear all filters
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 items-center">
          {selectedTags.map(tag => (
            <Badge 
              key={tag}
              variant="default"
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default VibeFilterButton;
