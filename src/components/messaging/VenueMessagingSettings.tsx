
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserSubscription } from '@/hooks/useUserSubscription';

const VenueMessagingSettings: React.FC = () => {
  const { hasFeature } = useUserSubscription();
  const [settings, setSettings] = useState({
    enableVenueMessaging: true,
    allowPromotionalMessages: true,
    allowReservationMessages: true,
    allowGeneralInquiries: true,
    notificationSound: true,
    emailNotifications: false
  });

  const [venueMessagingPreference, setVenueMessagingPreference] = useState<'opt-in' | 'opt-out'>('opt-in');
  const [notificationSettings, setNotificationSettings] = useState<'all' | 'important-only' | 'none'>('all');

  const canUseVenueMessaging = hasFeature('venueMessaging');

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!canUseVenueMessaging) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <h3 className="text-lg font-semibold mb-2">Venue Messaging Settings</h3>
          <p className="text-muted-foreground mb-4">
            Upgrade to Plus or higher to access venue messaging features
          </p>
          <Badge variant="outline">Plus Feature</Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Venue Messaging Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Venue Messages</label>
            <Select
              value={venueMessagingPreference}
              onValueChange={(value: 'opt-in' | 'opt-out') => setVenueMessagingPreference(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opt-in">Opt in to venue messages</SelectItem>
                <SelectItem value="opt-out">Opt out of venue messages</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose whether venues can send you direct messages
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Promotional Messages</h4>
              <p className="text-sm text-muted-foreground">
                Receive deals, discounts, and special offers
              </p>
            </div>
            <Switch
              checked={settings.allowPromotionalMessages}
              onCheckedChange={(value) => updateSetting('allowPromotionalMessages', value)}
              disabled={venueMessagingPreference === 'opt-out'}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Reservation Messages</h4>
              <p className="text-sm text-muted-foreground">
                Allow venues to contact you about reservations
              </p>
            </div>
            <Switch
              checked={settings.allowReservationMessages}
              onCheckedChange={(value) => updateSetting('allowReservationMessages', value)}
              disabled={venueMessagingPreference === 'opt-out'}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">General Inquiries</h4>
              <p className="text-sm text-muted-foreground">
                Allow general questions and support messages
              </p>
            </div>
            <Switch
              checked={settings.allowGeneralInquiries}
              onCheckedChange={(value) => updateSetting('allowGeneralInquiries', value)}
              disabled={venueMessagingPreference === 'opt-out'}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Enable notifications for messages</label>
            <Select
              value={notificationSettings}
              onValueChange={(value: 'all' | 'important-only' | 'none') => setNotificationSettings(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All messages</SelectItem>
                <SelectItem value="important-only">Important messages only</SelectItem>
                <SelectItem value="none">No notifications</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose when you want to be notified about new messages
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Sound Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Play sound when you receive a new message
              </p>
            </div>
            <Switch
              checked={settings.notificationSound}
              onCheckedChange={(value) => updateSetting('notificationSound', value)}
              disabled={notificationSettings === 'none'}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Send email notifications for new messages
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(value) => updateSetting('emailNotifications', value)}
              disabled={notificationSettings === 'none'}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  );
};

export default VenueMessagingSettings;
