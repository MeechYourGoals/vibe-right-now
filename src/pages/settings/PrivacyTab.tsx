
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface PrivacyTabProps {
  onSave: () => void;
  isVenueMode?: boolean;
}

const PrivacyTab = ({ onSave, isVenueMode = false }: PrivacyTabProps) => {
  const [locationTracking, setLocationTracking] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [dataSharing, setDataSharing] = useState(true);
  const [activityTracking, setActivityTracking] = useState(true);
  
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Location Privacy</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="location-tracking">Location Tracking</Label>
                <div className="text-xs text-muted-foreground">
                  Allow app to track your location in the background
                </div>
              </div>
              <Switch
                id="location-tracking"
                checked={locationTracking}
                onCheckedChange={setLocationTracking}
              />
            </div>
            
            {isVenueMode ? (
              <div className="space-y-2">
                <Label htmlFor="venue-address-visibility">Venue Address Visibility</Label>
                <Select defaultValue="full">
                  <SelectTrigger id="venue-address-visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Show Full Address</SelectItem>
                    <SelectItem value="partial">Show City & State Only</SelectItem>
                    <SelectItem value="hidden">Hide Address (Map Only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="precise-location">Precise Location</Label>
                  <div className="text-xs text-muted-foreground">
                    Use precise location for better recommendations
                  </div>
                </div>
                <Switch
                  id="precise-location"
                  defaultChecked={true}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Profile Privacy</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                <SelectTrigger id="profile-visibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Anyone can see</SelectItem>
                  <SelectItem value="followers">Followers Only</SelectItem>
                  <SelectItem value="private">Private - By invitation only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="post-history">Post History Visibility</Label>
                <div className="text-xs text-muted-foreground">
                  Allow others to see your past posts
                </div>
              </div>
              <Switch
                id="post-history"
                defaultChecked={true}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Sharing & Analytics</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-sharing">Data Sharing for Improvements</Label>
                <div className="text-xs text-muted-foreground">
                  Share anonymized data to improve the app
                </div>
              </div>
              <Switch
                id="data-sharing"
                checked={dataSharing}
                onCheckedChange={setDataSharing}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activity-tracking">Activity Tracking</Label>
                <div className="text-xs text-muted-foreground">
                  Allow {isVenueMode ? "customer" : "venue"} activity tracking for better recommendations
                </div>
              </div>
              <Switch
                id="activity-tracking"
                checked={activityTracking}
                onCheckedChange={setActivityTracking}
              />
            </div>
          </div>
        </div>
        
        {isVenueMode && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Venue Privacy Controls</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="employee-data">Employee Data Visibility</Label>
                  <div className="text-xs text-muted-foreground">
                    Control what employee data is visible to customers
                  </div>
                </div>
                <Switch
                  id="employee-data"
                  defaultChecked={false}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review-moderation">Review Moderation</Label>
                <Select defaultValue="approve">
                  <SelectTrigger id="review-moderation">
                    <SelectValue placeholder="Select moderation level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Show All Reviews</SelectItem>
                    <SelectItem value="approve">Approve Reviews First</SelectItem>
                    <SelectItem value="disable">Disable Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        <Button onClick={onSave} className="w-full">Save Privacy Settings</Button>
      </div>
    </div>
  );
};

export default PrivacyTab;
