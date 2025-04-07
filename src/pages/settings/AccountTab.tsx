
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellRing, Bell, UserCheck, Store, Lock } from "lucide-react";

interface AccountTabProps {
  onSave: () => void;
}

const AccountTab = ({ onSave }: AccountTabProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" placeholder="Your display name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Notification Preferences</Label>
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BellRing className="h-4 w-4" />
                  <Label htmlFor="notifications-all">All Notifications</Label>
                </div>
                <Switch id="notifications-all" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <Label htmlFor="notifications-events">Event Updates</Label>
                </div>
                <Switch id="notifications-events" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4" />
                  <Label htmlFor="notifications-follows">New Followers</Label>
                </div>
                <Switch id="notifications-follows" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Store className="h-4 w-4" />
                  <Label htmlFor="notifications-venue-follows">Venue Follows</Label>
                </div>
                <Switch id="notifications-venue-follows" defaultChecked />
              </div>
            </div>
          </div>
          
          <Button onClick={onSave}>Save Account Settings</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Actions here cannot be undone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="confirm-deletion" className="flex items-center text-destructive">
              <Lock className="h-4 w-4 mr-2" />
              Delete Account
            </Label>
            <div className="pt-2 flex gap-2">
              <Input 
                id="confirm-deletion" 
                placeholder="Type 'delete' to confirm" 
                className="max-w-xs"
              />
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AccountTab;
