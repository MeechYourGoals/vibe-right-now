
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const VenueDisplaySettings = () => {
  const [showHours, setShowHours] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showPhotos, setShowPhotos] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="show-hours">Display Business Hours</Label>
        <Switch
          id="show-hours"
          checked={showHours}
          onCheckedChange={setShowHours}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="show-rating">Show Ratings</Label>
        <Switch
          id="show-rating"
          checked={showRating}
          onCheckedChange={setShowRating}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="show-photos">Display Photos</Label>
        <Switch
          id="show-photos"
          checked={showPhotos}
          onCheckedChange={setShowPhotos}
        />
      </div>

      <Button className="w-full mt-4">
        Save Display Settings
      </Button>
    </div>
  );
};

export default VenueDisplaySettings;
