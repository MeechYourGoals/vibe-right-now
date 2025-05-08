
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

interface PreferencesTabProps {
  onSave: () => void;
  isVenueMode: boolean;
  subscriptionTier: string;
}

const PreferencesTab: React.FC<PreferencesTabProps> = ({ 
  onSave, 
  isVenueMode, 
  subscriptionTier 
}) => {
  // User preferences
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    autoLocation: true,
    aiPersonalization: false, // AI personalization flag
    defaultView: "explore",
    language: "english",
  });
  
  // Food preferences
  const [foodPreferences, setFoodPreferences] = useState<string[]>([
    "Italian",
    "Mexican"
  ]);
  
  // Activity preferences
  const [activityPreferences, setActivityPreferences] = useState<string[]>([
    "Live Music",
    "Sports"
  ]);
  
  // Available food options
  const foodOptions = [
    "Italian", "Mexican", "Chinese", "Japanese", "Thai", 
    "Indian", "French", "Mediterranean", "American", 
    "Vegetarian", "Vegan", "Gluten-Free", "Seafood",
    "BBQ", "Desserts", "Coffee", "Fast Food"
  ];
  
  // Available activity options
  const activityOptions = [
    "Live Music", "Sports", "Theater", "Museums", 
    "Nightlife", "Family-Friendly", "Outdoor", "Shopping", 
    "Art Galleries", "Hiking", "Beach", "Amusement Parks",
    "Comedy", "Dancing", "Wine Tasting", "Festivals"
  ];
  
  const handleToggleChange = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSelectChange = (key: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const toggleFoodPreference = (pref: string) => {
    if (foodPreferences.includes(pref)) {
      setFoodPreferences(prev => prev.filter(p => p !== pref));
    } else {
      setFoodPreferences(prev => [...prev, pref]);
    }
  };
  
  const toggleActivityPreference = (pref: string) => {
    if (activityPreferences.includes(pref)) {
      setActivityPreferences(prev => prev.filter(p => p !== pref));
    } else {
      setActivityPreferences(prev => [...prev, pref]);
    }
  };
  
  const handleSave = () => {
    // In a real app, we would save preferences to state/API
    console.log('Saving preferences:', {
      ...preferences,
      foodPreferences,
      activityPreferences
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize your experience and set preferences for content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-location">Auto Location Detection</Label>
              <div className="text-sm text-muted-foreground">
                Automatically detect your location for better venue recommendations
              </div>
            </div>
            <Switch
              id="auto-location"
              checked={preferences.autoLocation}
              onCheckedChange={() => handleToggleChange('autoLocation')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="ai-personalization">AI Personalization</Label>
              <div className="text-sm text-muted-foreground">
                Filter and personalize explore results based on your preferences
              </div>
            </div>
            <Switch
              id="ai-personalization"
              checked={preferences.aiPersonalization}
              onCheckedChange={() => handleToggleChange('aiPersonalization')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="default-view">Default View</Label>
              <div className="text-sm text-muted-foreground">
                Choose which screen to show when you first open the app
              </div>
            </div>
            <Select 
              value={preferences.defaultView}
              onValueChange={(value) => handleSelectChange('defaultView', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Default View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="explore">Explore</SelectItem>
                <SelectItem value="map">Map</SelectItem>
                <SelectItem value="feed">Feed</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="language">Language</Label>
              <div className="text-sm text-muted-foreground">
                Choose your preferred language
              </div>
            </div>
            <Select 
              value={preferences.language}
              onValueChange={(value) => handleSelectChange('language', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="korean">Korean</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Food Preferences</CardTitle>
          <CardDescription>
            Select the types of cuisine you prefer to get better recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72">
            <div className="grid grid-cols-2 gap-3">
              {foodOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`food-${option}`} 
                    checked={foodPreferences.includes(option)}
                    onCheckedChange={() => toggleFoodPreference(option)}
                  />
                  <Label htmlFor={`food-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Preferences</CardTitle>
          <CardDescription>
            Select activities you enjoy to get better venue and event recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72">
            <div className="grid grid-cols-2 gap-3">
              {activityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`activity-${option}`} 
                    checked={activityPreferences.includes(option)}
                    onCheckedChange={() => toggleActivityPreference(option)}
                  />
                  <Label htmlFor={`activity-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
};

export default PreferencesTab;
