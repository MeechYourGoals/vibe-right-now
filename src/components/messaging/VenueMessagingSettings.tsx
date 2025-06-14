
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Venue Messaging</h4>
              <p className="text-sm text-muted-foreground">
                Allow venues to send you direct messages
              </p>
            </div>
            <Switch
              checked={settings.enableVenueMessaging}
              onCheckedChange={(value) => updateSetting('enableVenueMessaging', value)}
            />
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
              disabled={!settings.enableVenueMessaging}
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
              disabled={!settings.enableVenueMessaging}
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
              disabled={!settings.enableVenueMessaging}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
