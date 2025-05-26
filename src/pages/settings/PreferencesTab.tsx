
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Music, MapPin, Heart, Star } from "lucide-react";
import UserPreferences from "./components/UserPreferences";

interface PreferencesTabProps {
  onSave: () => void;
  isVenueMode: boolean;
  subscriptionTier: 'standard' | 'plus' | 'premium' | 'pro';
}

const PreferencesTab = ({ onSave, isVenueMode, subscriptionTier }: PreferencesTabProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Trendy", "Foodie", "Artsy", "LiveMusic"
  ]);
  
  const [favorites, setFavorites] = useState<string[]>([
    "Coffee Shops", "Art Galleries", "Live Music Venues"
  ]);

  // Define preference categories and their tags
  const preferenceCategories = [
    {
      name: "Vibe",
      icon: Star,
      id: "vibe"
    },
    {
      name: "Interests", 
      icon: Heart,
      id: "interests"
    },
    {
      name: "Crowd",
      icon: MapPin,
      id: "crowd"
    },
    {
      name: "Values",
      icon: Coffee,
      id: "values"
    },
    {
      name: "Experience",
      icon: Music,
      id: "experience"
    }
  ];

  // Organize preference tags by category
  const preferenceTags = {
    Vibe: [
      "Chill", "Lively", "Upscale", "Casual", "Romantic", "Trendy", 
      "Historic", "Artsy", "Quiet", "Bustling", "Intimate", "Scenic"
    ],
    Interests: [
      "Foodie", "NightOwl", "EarlyBird", "LiveMusic", "Sporty", 
      "Outdoorsy", "Hipster", "Retro", "Local", "Touristy"
    ],
    Crowd: [
      "Family-Friendly", "Pet-Friendly", "StudentHangout", 
      "BusinessCasual", "LGBTQ-Friendly"
    ],
    Values: [
      "Sustainable", "Local-Owned", "Community-Focused", "Inclusive"
    ],
    Experience: [
      "Interactive", "Educational", "Relaxing", "Adventurous", "Cultural"
    ]
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleAddCustomTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddFavorite = (favorite: string) => {
    if (!favorites.includes(favorite)) {
      setFavorites([...favorites, favorite]);
    }
  };

  const handleRemoveFavorite = (favorite: string) => {
    setFavorites(favorites.filter(f => f !== favorite));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isVenueMode ? "Venue Preferences" : "Personal Preferences"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UserPreferences
            selectedTags={selectedTags}
            favorites={favorites}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
            onAddCustomTag={handleAddCustomTag}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            preferenceCategories={preferenceCategories}
            preferenceTags={preferenceTags}
          />
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={onSave} className="bg-primary hover:bg-primary/90">
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default PreferencesTab;
