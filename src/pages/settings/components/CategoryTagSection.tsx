
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";

interface CategoryTagSectionProps {
  categories: {
    name: string;
    icon: React.ElementType;
    id: string;
  }[];
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const CategoryTagSection = ({
  categories,
  tags,
  selectedTags,
  onTagSelect
}: CategoryTagSectionProps) => {
  return (
    <div className="space-y-4 mt-4">
      <Label>Popular Preferences</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(category => (
          <div key={category.id} className="space-y-2">
            <h4 className="text-sm font-medium flex items-center">
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 5).map(tag => (
                <Badge 
                  key={`${category.id}-${tag}`} 
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
        ))}
      </div>
    </div>
  );
};

export default CategoryTagSection;
