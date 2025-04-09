
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface AccountTabProps {
  onSave: () => void;
  isVenueMode?: boolean;
}

const AccountTab = ({ onSave, isVenueMode = false }: AccountTabProps) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Profile</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" defaultValue="Jane Smith" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="jane.smith@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="janesmith" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Security</h3>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-factor Authentication</Label>
                <div className="text-xs text-muted-foreground">
                  Add an extra layer of security to your account
                </div>
              </div>
              <Switch
                id="two-factor"
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notifications</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <div className="text-xs text-muted-foreground">
                Receive email notifications for {isVenueMode ? "venue" : "account"} activity
              </div>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </div>
        
        {isVenueMode && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Venue Account Details</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" defaultValue="My Awesome Venue" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business-email">Business Email</Label>
                <Input id="business-email" type="email" defaultValue="contact@awesomevenue.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="business-phone">Business Phone</Label>
                <Input id="business-phone" type="tel" defaultValue="(555) 123-4567" />
              </div>
            </div>
          </div>
        )}
        
        <Button onClick={onSave} className="w-full">Save Changes</Button>
      </div>
    </div>
  );
};

export default AccountTab;
