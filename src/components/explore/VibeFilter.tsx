
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VibeFilterProps {
  vibeFilter: string;
  onClearVibeFilter: () => void;
}

const VibeFilter: React.FC<VibeFilterProps> = ({ vibeFilter, onClearVibeFilter }) => {
  if (!vibeFilter) return null;
  
  return (
    <div className="flex justify-center mb-4">
      <Badge className="bg-indigo-800 dark:bg-indigo-900 text-white px-3 py-1 text-sm flex items-center">
        <Sparkles className="h-4 w-4 mr-1 text-amber-300" />
        Filtering by vibe: {vibeFilter}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 ml-2 rounded-full text-white hover:bg-indigo-700" 
          onClick={onClearVibeFilter}
        >
          <X className="h-3 w-3" />
        </Button>
      </Badge>
    </div>
  );
};

export default VibeFilter;
