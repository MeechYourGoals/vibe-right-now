
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const PreferencesTab = () => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Flatten the preference categories for easier handling
  const allPreferences = [
    'Cozy', 'Trendy', 'Upscale', 'Casual', 'Romantic', 'Lively', 'Intimate',
    'Family Friendly', 'NightOwl', 'Chill', 'Energetic', 'Sophisticated'
  ];

  const allInterests = [
    'Live Music', 'Sports', 'Outdoors', 'Business', 'Arts', 'Food', 'Drinks',
    'Dancing', 'Gaming', 'Shopping', 'Photography', 'Technology'
  ];

  const handlePreferenceToggle = (preference: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    // Save preferences logic here
    toast.success('Preferences saved successfully!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vibe Preferences</CardTitle>
          <CardDescription>
            Select the vibes that match your style
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {allPreferences.map((preference) => (
              <Badge
                key={preference}
                variant={selectedPreferences.includes(preference) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handlePreferenceToggle(preference)}
              >
                {preference}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interests</CardTitle>
          <CardDescription>
            Choose your interests to get better recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => (
              <Badge
                key={interest}
                variant={selectedInterests.includes(interest) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleInterestToggle(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Preferences
      </Button>
    </div>
  );
};

export default PreferencesTab;
