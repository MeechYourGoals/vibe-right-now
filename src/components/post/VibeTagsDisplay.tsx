
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface VibeTagsDisplayProps {
  tags: string[];
  className?: string;
}

const VibeTagsDisplay: React.FC<VibeTagsDisplayProps> = ({ tags, className = "" }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-1.5 mb-2 ${className}`}>
      {tags.map((tag, index) => (
        <Badge 
          key={index}
          variant="secondary" 
          className="text-xs px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default VibeTagsDisplay;
