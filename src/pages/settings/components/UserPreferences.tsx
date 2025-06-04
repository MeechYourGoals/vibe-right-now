
import { Label } from "@/components/ui/label";
import SelectedTagsList from "./SelectedTagsList";
import CustomTagInput from "./CustomTagInput";
import CategoryTagSection from "./CategoryTagSection";
import PreferenceTagSelection from "./PreferenceTagSelection";
import FavoritesSection from "./FavoritesSection";

interface UserPreferencesProps {
  selectedTags: string[];
  favorites: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onAddCustomTag: (tag: string) => void;
  onAddFavorite: (favorite: string) => void;
  onRemoveFavorite: (favorite: string) => void;
  preferenceCategories: {
    name: string;
    icon: React.ElementType;
    id: string;
  }[];
  preferenceTags: string[];
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
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">My Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Select tags that match your personal vibe preferences. These will help us recommend venues that match your style.
        </p>
        
        <SelectedTagsList
          selectedTags={selectedTags}
          onTagRemove={onTagRemove}
        />
        
        <CustomTagInput
          onAddTag={onAddCustomTag}
        />
        
        <FavoritesSection
          favorites={favorites}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
        />
        
        <CategoryTagSection
          categories={preferenceCategories}
          tags={preferenceTags}
          selectedTags={selectedTags}
          onTagSelect={onTagSelect}
        />
        
        <PreferenceTagSelection
          selectedTags={selectedTags}
          availableTags={preferenceTags}
          onTagSelect={onTagSelect}
          onTagRemove={onTagRemove}
        />
      </div>
    </div>
  );
};

export default UserPreferences;
