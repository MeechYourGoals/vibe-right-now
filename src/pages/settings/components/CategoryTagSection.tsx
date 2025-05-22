
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface CategoryTagSectionProps {
  categories: {
    name: string;
    icon: React.ElementType;
    id: string;
  }[];
  tags: any;
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const CategoryTagSection = ({
  categories,
  tags,
  selectedTags,
  onTagSelect
}: CategoryTagSectionProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  
  // Helper function to get tags for a specific category
  const getCategoryTags = (categoryName: string): string[] => {
    if (!tags) return [];
    
    // If tags is an object with category keys
    if (typeof tags === 'object' && !Array.isArray(tags)) {
      return Array.isArray(tags[categoryName]) ? tags[categoryName] : [];
    }
    
    // If tags is a flat array
    if (Array.isArray(tags)) {
      return tags;
    }
    
    return [];
  };
  
  return (
    <div className="mt-6">
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="w-full overflow-x-auto flex-nowrap">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-4">
            <div className="flex flex-wrap gap-2">
              {getCategoryTags(category.name).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`cursor-pointer hover:bg-primary/10 ${
                    selectedTags.includes(tag) ? "bg-primary/20 border-primary" : ""
                  }`}
                  onClick={() => onTagSelect(tag)}
                >
                  {tag}
                </Badge>
              ))}
              
              {getCategoryTags(category.name).length === 0 && (
                <div className="text-muted-foreground text-sm">No tags available for this category</div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryTagSection;
