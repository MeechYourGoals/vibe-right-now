
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContentPreferencesProps {
  autoplayVideos: boolean;
  setAutoplayVideos: (value: boolean) => void;
  isVenueMode: boolean;
}

const ContentPreferences = ({
  autoplayVideos,
  setAutoplayVideos,
  isVenueMode
}: ContentPreferencesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Content Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="autoplay">Autoplay Videos</Label>
            <div className="text-xs text-muted-foreground">
              Automatically play videos in feed
            </div>
          </div>
          <Switch
            id="autoplay"
            checked={autoplayVideos}
            onCheckedChange={setAutoplayVideos}
          />
        </div>
        
        {isVenueMode ? (
          <div className="space-y-2">
            <Label htmlFor="default-post-view">Default Post View</Label>
            <Select defaultValue="grid">
              <SelectTrigger id="default-post-view">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="list">List</SelectItem>
                <SelectItem value="map">Map</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="content-language">Content Language</Label>
            <Select defaultValue="en">
              <SelectTrigger id="content-language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentPreferences;
