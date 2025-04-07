
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PREFERENCE_TAGS, PREFERENCE_CATEGORIES } from "./constants";

interface PreferencesTabProps {
  onSave: () => void;
}

const PreferencesTab = ({ onSave }: PreferencesTabProps) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [categoryPreferences, setCategoryPreferences] = useState<Record<string, boolean>>({
    lgbtq: false,
    groups: false,
    tourist: false,
    business: false,
    'after-hours': false
  });

  const handlePreferenceToggle = (value: string[]) => {
    setSelectedPreferences(value);
  };

  const handleCategoryToggle = (category: string) => {
    setCategoryPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Preferences</CardTitle>
        <CardDescription>
          Select categories that interest you for personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-medium mb-3">Your Interests</h3>
          <ToggleGroup 
            type="multiple" 
            variant="outline"
            className="flex flex-wrap gap-2"
            value={selectedPreferences}
            onValueChange={handlePreferenceToggle}
          >
            {PREFERENCE_TAGS.map(tag => (
              <ToggleGroupItem 
                key={tag.toLowerCase().replace(/\s+/g, '-')} 
                value={tag.toLowerCase().replace(/\s+/g, '-')}
                className="rounded-full"
                aria-label={tag}
              >
                {tag}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium mb-3">Venue Categories</h3>
          <div className="space-y-3">
            {PREFERENCE_CATEGORIES.map(category => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <category.icon className="h-4 w-4 mr-2" />
                  <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                </div>
                <Switch 
                  id={`category-${category.id}`}
                  checked={categoryPreferences[category.id]}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
              </div>
            ))}
          </div>
        </div>
        
        <Button onClick={onSave}>Save Preferences</Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesTab;
