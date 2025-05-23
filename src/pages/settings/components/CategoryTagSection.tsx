
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
  // Create a map of category-specific tags to avoid repetition
  const categorySpecificTags = {
    lgbtq: ["LGBTQ+ Friendly", "Pride", "Inclusive"],
    groups: ["Good for Groups", "Family Style", "Sharing Plates"],
    tourist: ["Tourist Attraction", "Landmark", "Must-See"],
    business: ["Business Appropriate", "Corporate", "Formal"],
    "after-hours": ["After Hours", "Late Night", "Nightlife"]
  };
  
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
              {/* Use category-specific tags instead of the same tags for each category */}
              {categorySpecificTags[category.id as keyof typeof categorySpecificTags]?.map(tag => (
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
