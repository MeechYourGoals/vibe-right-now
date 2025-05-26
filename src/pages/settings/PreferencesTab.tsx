
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ContentPreferences from "./components/ContentPreferences";
import LocationSettings from "./components/LocationSettings"; 
import CategoryTagSection from "./components/CategoryTagSection";
import FavoritesSection from "./components/FavoritesSection";
import VenueDisplaySettings from "./components/VenueDisplaySettings";
import { defaultCategories } from "./constants";

const PreferencesTab = () => {
  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>({
    Vibe: [],
    Interests: [],
    Crowd: [],
    Values: [],
    Experience: []
  });

  const handleTagsChange = (category: string, tags: string[]) => {
    setSelectedTags(prev => ({
      ...prev,
      [category]: tags
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <ContentPreferences />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <LocationSettings />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interest Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(defaultCategories).map(([category, tags]) => (
            <div key={category}>
              <CategoryTagSection
                title={category}
                availableTags={tags}
                selectedTags={selectedTags[category] || []}
                onTagsChange={(tags) => handleTagsChange(category, tags)}
              />
              <Separator className="mt-6" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Favorites & Bookmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <FavoritesSection />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Venue Display Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <VenueDisplaySettings />
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesTab;
