
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

interface CustomTagInputProps {
  onAddTag: (tag: string) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

const CustomTagInput = ({
  onAddTag,
  disabled = false,
  label = "Add Custom Preference",
  placeholder = "Enter a custom preference"
}: CustomTagInputProps) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="new-tag">{label}</Label>
      <div className="flex gap-2">
        <Input 
          id="new-tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
          disabled={disabled}
        />
        <Button 
          onClick={handleAddTag}
          disabled={!newTag.trim() || disabled}
          size="icon"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CustomTagInput;
