
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UserPreferences = () => {
  const [notifications, setNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Enable Notifications</Label>
        <Switch
          id="notifications"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="location">Location Tracking</Label>
        <Switch
          id="location"
          checked={locationTracking}
          onCheckedChange={setLocationTracking}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="dark-mode">Dark Mode</Label>
        <Switch
          id="dark-mode"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
      </div>

      <Button className="w-full mt-4">
        Save Preferences
      </Button>
    </div>
  );
};

export default UserPreferences;
