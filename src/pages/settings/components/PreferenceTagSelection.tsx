
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface PreferenceTagSelectionProps {
  selectedTags: string[];
  availableTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

const PreferenceTagSelection = ({
  selectedTags,
  availableTags,
  onTagSelect,
  onTagRemove
}: PreferenceTagSelectionProps) => {
  return (
    <div className="space-y-2 mt-4">
      <Label>All Available Preferences</Label>
      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border rounded-md bg-background">
        {availableTags.sort((a, b) => a.localeCompare(b)).map(tag => (
          <Badge 
            key={tag} 
            variant="outline" 
            className={`cursor-pointer hover:bg-primary/10 ${
              selectedTags.includes(tag) ? "bg-primary/20 border-primary" : ""
            }`}
            onClick={() => onTagSelect(tag)}
          >
            {selectedTags.includes(tag) && (
              <Check className="h-3 w-3 mr-1" />
            )}
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PreferenceTagSelection;
