
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PREFERENCE_TAGS, PREFERENCE_CATEGORIES } from "./constants";
import { useToast } from "@/hooks/use-toast";
import { Coffee, Music, Users, Heart, Star } from "lucide-react";

// Import components
import UserPreferences from "./components/UserPreferences";
import VenueTaggingSection from "./components/VenueTaggingSection";
import LocationSettings from "./components/LocationSettings";
import ContentPreferences from "./components/ContentPreferences";
import VenueDisplaySettings from "./components/VenueDisplaySettings";
import CompetitorTags from "./components/CompetitorTags";

export interface PreferencesTabProps {
  onSave: () => void;
  isVenueMode?: boolean;
  subscriptionTier?: 'standard' | 'plus' | 'premium' | 'pro';
}

const PreferencesTab = ({ 
  onSave, 
  isVenueMode = false, 
  subscriptionTier = 'standard' 
}: PreferencesTabProps) => {
  const [distanceUnit, setDistanceUnit] = useState("miles");
  const [searchRadius, setSearchRadius] = useState([10]);
  const [showNearbyLocations, setShowNearbyLocations] = useState(true);
  const [autoplayVideos, setAutoplayVideos] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const { toast } = useToast();
  const [competitorVenues, setCompetitorVenues] = useState([
    { id: 1, name: "The Corner Bar", tags: ["Cozy", "Lounges", "Date Night"] },
    { id: 2, name: "Downtown Café", tags: ["Cozy", "Locally Owned", "Budget Friendly"] },
    { id: 3, name: "The Luxury Lounge", tags: ["High Energy", "Luxury", "Night Owls"] },
    { id: 4, name: "Family Fun Center", tags: ["Family Friendly", "Budget Friendly", "Physical Adventure"] }
  ]);
  
  // Ensure we're working with arrays by defining them properly
  // Map preference categories to the expected format with icons and IDs
  const preferenceCategories = Array.isArray(PREFERENCE_CATEGORIES) ? 
    PREFERENCE_CATEGORIES.map((cat, index) => ({
      name: cat.name,
      icon: getCategoryIcon(cat.name),
      id: `category-${index}`
    })) : [];

  // Helper function to get icon based on category name
  function getCategoryIcon(categoryName: string) {
    switch (categoryName) {
      case "Vibe":
        return Star;
      case "Interests":
        return Music;
      case "Crowd":
        return Users;
      case "Values":
        return Heart;
      case "Experience":
      default:
        return Coffee;
    }
  }
  
  // Generate AI suggested tags based on venue type for premium/pro users
  useEffect(() => {
    if (isVenueMode && (subscriptionTier === 'premium' || subscriptionTier === 'pro')) {
      // These would normally be AI-generated based on venue data
      setSuggestedTags([
        "Cozy", 
        "Locally Owned", 
        "Night Owls", 
        "Live Music", 
        "Good for Groups", 
        "Date Night"
      ]);
    }
  }, [isVenueMode, subscriptionTier]);
  
  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  const handleAddCustomTag = (tag: string) => {
    if (tag.trim() && !selectedTags.includes(tag.trim())) {
      setSelectedTags([...selectedTags, tag.trim()]);
    }
  };
  
  const handleAddFavorite = (favorite: string) => {
    if (favorite.trim() && !favorites.includes(favorite.trim())) {
      if (favorites.length < 10) {
        setFavorites([...favorites, favorite.trim()]);
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
  
  const handleRemoveFavorite = (favorite: string) => {
    setFavorites(favorites.filter(f => f !== favorite));
  };
  
  const renderCompetitorTags = () => {
    return (
      <CompetitorTags 
        competitorVenues={competitorVenues}
        onTagSelect={handleTagSelect}
      />
    );
  };
  
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Preferences</h2>
      
      <div className="space-y-6">
        {/* User Preferences Section - Always shown when not in venue mode */}
        {!isVenueMode && (
          <UserPreferences
            selectedTags={selectedTags}
            favorites={favorites}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
            onAddCustomTag={handleAddCustomTag}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            preferenceCategories={preferenceCategories}
            preferenceTags={Array.isArray(PREFERENCE_TAGS) ? PREFERENCE_TAGS : []}
          />
        )}
        
        {/* Venue Tagging Section - Only shown in venue mode */}
        {isVenueMode && (
          <VenueTaggingSection
            subscriptionTier={subscriptionTier}
            selectedTags={selectedTags}
            suggestedTags={suggestedTags}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
            onAddCustomTag={handleAddCustomTag}
            preferenceCategories={preferenceCategories}
            preferenceTags={Array.isArray(PREFERENCE_TAGS) ? PREFERENCE_TAGS : []}
            renderCompetitorTags={renderCompetitorTags}
          />
        )}
        
        {/* Location Settings - Always shown */}
        <LocationSettings
          searchRadius={searchRadius}
          setSearchRadius={setSearchRadius}
          distanceUnit={distanceUnit}
          setDistanceUnit={setDistanceUnit}
          showNearbyLocations={showNearbyLocations}
          setShowNearbyLocations={setShowNearbyLocations}
        />
        
        {/* Content Preferences - Always shown */}
        <ContentPreferences
          autoplayVideos={autoplayVideos}
          setAutoplayVideos={setAutoplayVideos}
          isVenueMode={isVenueMode}
        />
        
        {/* Venue Display Settings - Only shown in venue mode */}
        {isVenueMode && (
          <VenueDisplaySettings />
        )}
        
        <Button onClick={onSave} className="w-full">Save Preferences</Button>
      </div>
    </div>
  );
};

export default PreferencesTab;
