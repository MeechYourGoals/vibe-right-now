
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

export interface AccountTabProps {
  onSave: () => void;
  isVenueMode?: boolean;
  subscriptionTier?: 'standard' | 'plus' | 'premium' | 'pro';
}

const AccountTab = ({ 
  onSave, 
  isVenueMode = false, 
  subscriptionTier = 'standard' 
}: AccountTabProps) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  const renderSubscriptionBadge = () => {
    if (!isVenueMode || subscriptionTier === 'standard') return null;
    
    const badgeProps = {
      plus: { className: "bg-blue-600/20 text-blue-500 border-blue-300", text: "Plus" },
      premium: { className: "bg-purple-600/20 text-purple-500 border-purple-300", text: "Premium" },
      pro: { className: "bg-amber-600/20 text-amber-500 border-amber-300", text: "Pro" }
    };
    
    const badge = badgeProps[subscriptionTier as keyof typeof badgeProps];
    if (!badge) return null;
    
    return (
      <Badge variant="outline" className={badge.className}>
        <Crown className="h-3 w-3 mr-1" /> {badge.text}
      </Badge>
    );
  };
  
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        {renderSubscriptionBadge()}
      </div>
      
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
          <>
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
            
            {subscriptionTier !== 'standard' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Subscription</h3>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Current Plan</h4>
                    {renderSubscriptionBadge()}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {subscriptionTier === 'plus' && "Enjoy enhanced venue tagging and custom tag creation."}
                    {subscriptionTier === 'premium' && "Access to AI-powered tag suggestions and marketing tools."}
                    {subscriptionTier === 'pro' && "Full access to all features, including competitor analysis and advanced insights."}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">Manage Subscription</Button>
                    <Button size="sm">Upgrade Plan</Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        
        <Button onClick={onSave} className="w-full">Save Changes</Button>
      </div>
    </div>
  );
};

export default AccountTab;
