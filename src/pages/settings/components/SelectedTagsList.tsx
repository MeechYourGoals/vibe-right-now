
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface SelectedTagsListProps {
  selectedTags: string[];
  onTagRemove: (tag: string) => void;
  label?: string;
  emptyMessage?: string;
}

const SelectedTagsList = ({
  selectedTags,
  onTagRemove,
  label = "Selected Preferences",
  emptyMessage = "No preferences selected"
}: SelectedTagsListProps) => {
  return (
    <div className="space-y-2">
      <Label>{label} {selectedTags.length > 0 && `(${selectedTags.length})`}</Label>
      <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md bg-background">
        {selectedTags.length === 0 ? (
          <span className="text-sm text-muted-foreground">{emptyMessage}</span>
        ) : (
          selectedTags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onTagRemove(tag)}
              />
            </Badge>
          ))
        )}
      </div>
    </div>
  );
};

export default SelectedTagsList;
