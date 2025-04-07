
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MapPin } from "lucide-react";

interface PrivacyTabProps {
  onSave: () => void;
}

const PrivacyTab = ({ onSave }: PrivacyTabProps) => {
  const [profileVisibility, setProfileVisibility] = useState<boolean>(true);
  const [showVisitedPlaces, setShowVisitedPlaces] = useState<boolean>(true);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>
          Control who can see your profile and activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="profile-visibility" className="flex items-center">
              {profileVisibility ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              Profile Visibility
            </Label>
            <p className="text-sm text-muted-foreground">
              {profileVisibility ? "Your profile is public" : "Your profile is private"}
            </p>
          </div>
          <Switch
            id="profile-visibility"
            checked={profileVisibility}
            onCheckedChange={setProfileVisibility}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="visited-places" className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Show Visited Places
            </Label>
            <p className="text-sm text-muted-foreground">
              {showVisitedPlaces ? "Others can see places you've visited" : "Your visited places are hidden"}
            </p>
          </div>
          <Switch
            id="visited-places"
            checked={showVisitedPlaces}
            onCheckedChange={setShowVisitedPlaces}
          />
        </div>
        
        <Button onClick={onSave}>Save Privacy Settings</Button>
      </CardContent>
    </Card>
  );
};

export default PrivacyTab;
