
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PreferencesState {
  [key: string]: string[];
}

interface PreferencesTabProps {
  onSave?: () => void;
  isVenueMode?: boolean;
  subscriptionTier?: "standard" | "plus" | "premium" | "pro";
}

const PreferencesTab = ({ onSave, isVenueMode, subscriptionTier }: PreferencesTabProps) => {
  const { toast } = useToast();
  const [selectedPreferences, setSelectedPreferences] = useState<PreferencesState>({});

  useEffect(() => {
    const storedPreferences = localStorage.getItem('userPreferences');
    if (storedPreferences) {
      setSelectedPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  const preferenceCategories = {
    Vibe: ["Energetic", "Chill", "Sophisticated", "Casual", "Trendy", "Classic"],
    Interests: ["Music", "Food", "Sports", "Art", "Technology", "Travel"],
    Crowd: ["Young Professional", "Students", "Families", "Tourists", "Locals"],
    Values: ["Sustainability", "Community", "Innovation", "Tradition", "Diversity"],
    Experience: ["First Timer", "Regular", "Explorer", "Connoisseur", "Socializer"]
  };

  const handlePreferenceToggle = (category: string, preference: string) => {
    setSelectedPreferences(prev => {
      const categoryPrefs = prev[category] || [];
      const isSelected = categoryPrefs.includes(preference);
      
      return {
        ...prev,
        [category]: isSelected 
          ? categoryPrefs.filter(p => p !== preference)
          : [...categoryPrefs, preference]
      };
    });
  };

  const handleSavePreferences = () => {
    localStorage.setItem('userPreferences', JSON.stringify(selectedPreferences));
    
    toast({
      title: "Preferences saved",
      description: "Your preferences have been saved successfully.",
    });

    if (onSave) {
      onSave();
    }
  };

  const handleResetPreferences = () => {
    const emptyPreferences: PreferencesState = {};
    Object.keys(preferenceCategories).forEach(key => {
      emptyPreferences[key] = [];
    });
    
    setSelectedPreferences(emptyPreferences);
    localStorage.removeItem('userPreferences');
    
    toast({
      title: "Preferences reset",
      description: "All preferences have been reset to default.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(preferenceCategories).map(([category, preferences]) => (
          <div key={category} className="space-y-2">
            <Label>{category}</Label>
            <div className="flex flex-wrap gap-2">
              {preferences.map(preference => (
                <Button
                  key={preference}
                  variant={selectedPreferences[category]?.includes(preference) ? "default" : "outline"}
                  onClick={() => handlePreferenceToggle(category, preference)}
                >
                  {preference}
                </Button>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={handleResetPreferences}>Reset</Button>
          <Button onClick={handleSavePreferences}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesTab;
