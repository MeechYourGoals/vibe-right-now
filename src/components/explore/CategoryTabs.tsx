
import React from 'react';
import { Button } from "@/components/ui/button";

interface CategoryTabsProps {
  categories: { id: string; label: string; }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className="rounded-full"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryTabs;
