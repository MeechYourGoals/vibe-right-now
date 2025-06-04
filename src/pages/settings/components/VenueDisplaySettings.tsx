
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VenueDisplaySettings = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Venue Display Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="featured-posts">Featured Posts</Label>
            <div className="text-xs text-muted-foreground">
              Show featured posts at the top of your profile
            </div>
          </div>
          <Switch
            id="featured-posts"
            defaultChecked={true}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="business-category">Business Category</Label>
          <Select defaultValue="restaurant">
            <SelectTrigger id="business-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restaurant">Restaurant</SelectItem>
              <SelectItem value="bar">Bar/Nightlife</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="service">Service</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default VenueDisplaySettings;
