
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface VibeTagsProps {
  tags: string[];
  selectedTags?: string[];
  onTagClick?: (tag: string) => void;
  size?: "sm" | "md" | "lg"; 
}

const VibeTags = ({ tags, selectedTags = [], onTagClick, size = "md" }: VibeTagsProps) => {
  if (!tags || tags.length === 0) return null;
  
  const getTagSize = () => {
    switch (size) {
      case "sm": return "text-xs";
      case "lg": return "text-base";
      default: return "text-sm";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm": return "h-3 w-3 mr-1";
      case "lg": return "h-5 w-5 mr-1";
      default: return "h-4 w-4 mr-1";
    }
  };
  
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {tags.map((tag, index) => (
        <Badge 
          key={index} 
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          className={`${
            selectedTags.includes(tag) 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-primary/10 text-primary hover:bg-primary/20'
          } ${getTagSize()} ${onTagClick ? 'cursor-pointer' : ''}`}
          onClick={() => onTagClick && onTagClick(tag)}
        >
          <Sparkles className={getIconSize()} />
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default VibeTags;
