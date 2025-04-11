
import { useState } from "react";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SelectedTagsList from "./SelectedTagsList";

interface FavoritesSectionProps {
  favorites: string[];
  onAddFavorite: (favorite: string) => void;
  onRemoveFavorite: (favorite: string) => void;
}

const FavoritesSection = ({
  favorites,
  onAddFavorite,
  onRemoveFavorite
}: FavoritesSectionProps) => {
  const [newFavorite, setNewFavorite] = useState("");
  const { toast } = useToast();
  
  const handleAddFavorite = () => {
    if (newFavorite.trim() && !favorites.includes(newFavorite.trim())) {
      if (favorites.length < 10) {
        onAddFavorite(newFavorite.trim());
        setNewFavorite("");
      } else {
        // Show a message indicating the limit has been reached
        toast({
          title: "Favorites limit reached",
          description: "You can only add up to 10 favorites. Remove one to add another.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="space-y-2 mt-6">
      <h4 className="text-md font-medium flex items-center">
        <Star className="h-4 w-4 mr-2 text-amber-500" />
        My Favorite Teams, Artists & Events
      </h4>
      <p className="text-sm text-muted-foreground">
        Add your favorites to get notifications when they're in your area (up to 10).
      </p>
      
      <SelectedTagsList
        selectedTags={favorites}
        onTagRemove={onRemoveFavorite}
        label="My Favorites"
        emptyMessage="No favorites added yet"
      />
      
      <div className="flex gap-2">
        <Input 
          value={newFavorite}
          onChange={(e) => setNewFavorite(e.target.value)}
          placeholder="Add team, artist or event (e.g. Lakers, Beyoncé, Pride Festival)"
          className="flex-1"
        />
        <Button 
          onClick={handleAddFavorite}
          disabled={!newFavorite.trim() || favorites.length >= 10}
          size="icon"
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
        {favorites.length}/10 favorites added
      </div>
    </div>
  );
};

export default FavoritesSection;
