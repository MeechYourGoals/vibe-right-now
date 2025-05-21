
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import PreferenceTagSelection from "./PreferenceTagSelection";
import SelectedTagsList from "./SelectedTagsList";
import CustomTagInput from "./CustomTagInput";
import FavoritesSection from "./FavoritesSection";
import CategoryTagSection from "./CategoryTagSection";

interface PreferenceCategory {
  name: string;
  icon: React.ComponentType<any>;
  id: string;
}

interface UserPreferencesProps {
  selectedTags: string[];
  favorites: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onAddCustomTag: (tag: string) => void;
  onAddFavorite: (favorite: string) => void;
  onRemoveFavorite: (favorite: string) => void;
  preferenceCategories: PreferenceCategory[];
  preferenceTags: any;
}

const UserPreferences = ({
  selectedTags,
  favorites,
  onTagSelect,
  onTagRemove,
  onAddCustomTag,
  onAddFavorite,
  onRemoveFavorite,
  preferenceCategories,
  preferenceTags
}: UserPreferencesProps) => {
  const [activeCategory, setActiveCategory] = useState("Vibe");
  const [newTag, setNewTag] = useState("");
  
  // Make sure we're working with valid objects/arrays
  const currentCategoryTags = Array.isArray(preferenceTags[activeCategory]) ? 
    preferenceTags[activeCategory] : 
    [];

  // Handle custom tag submission
  const handleSubmitCustomTag = () => {
    if (newTag.trim()) {
      onAddCustomTag(newTag);
      setNewTag("");
    }
  };
  
  // Get all tags across all categories
  const getAllTags = () => {
    let allTags: string[] = [];
    if (preferenceTags && typeof preferenceTags === 'object') {
      Object.values(preferenceTags).forEach((categoryTags: any) => {
        if (Array.isArray(categoryTags)) {
          allTags = [...allTags, ...categoryTags];
        }
      });
    }
    return allTags;
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">My Preferences</h3>
      
      <div>
        <h4 className="text-md font-medium mb-2">My Selected Vibe Tags</h4>
        <SelectedTagsList 
          selectedTags={selectedTags} 
          onRemove={onTagRemove} 
        />
      </div>
      
      <CustomTagInput 
        value={newTag}
        onChange={setNewTag}
        onSubmit={handleSubmitCustomTag}
        placeholder="Add custom tag..."
      />
      
      <Separator />
      
      <Tabs defaultValue="by-category" className="w-full">
        <TabsList>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="all-tags">All Tags</TabsTrigger>
        </TabsList>
        
        <TabsContent value="by-category">
          <div className="space-y-4">
            <ScrollArea className="h-14">
              <div className="flex space-x-2 pb-2">
                {preferenceCategories && Array.isArray(preferenceCategories) && preferenceCategories.map(category => {
                  const Icon = category.icon;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.name}
                      onClick={() => setActiveCategory(category.name)}
                      className={`flex items-center px-3 py-1 rounded-full ${
                        activeCategory === category.name 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4 mr-1" />}
                      {category.name}
                    </TabsTrigger>
                  );
                })}
              </div>
            </ScrollArea>
            
            <CategoryTagSection
              categoryName={activeCategory}
              tags={currentCategoryTags}
              selectedTags={selectedTags}
              onTagSelect={onTagSelect}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="all-tags">
          <PreferenceTagSelection
            selectedTags={selectedTags}
            availableTags={getAllTags()}
            onTagSelect={onTagSelect}
            onTagRemove={onTagRemove}
          />
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <FavoritesSection
        favorites={favorites}
        onAdd={onAddFavorite}
        onRemove={onRemoveFavorite}
      />
    </div>
  );
};

export default UserPreferences;
