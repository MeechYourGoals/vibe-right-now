
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserPreferences from "./components/UserPreferences";
import VenueDisplaySettings from "./components/VenueDisplaySettings";
import { UserSubscriptionTier } from "@/types/subscription";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import FeatureGate from "@/components/ui/feature-gate";

interface PreferencesTabProps {
  onSave: () => void;
  isVenueMode: boolean;
  subscriptionTier?: UserSubscriptionTier;
}

const PreferencesTab = ({ onSave, isVenueMode, subscriptionTier = 'free' }: PreferencesTabProps) => {
  const { hasFeatureAccess, upgradeTo } = useUserSubscription();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Preferences</CardTitle>
          <CardDescription>
            Customize your experience and notification settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isVenueMode ? (
            <VenueDisplaySettings />
          ) : (
            <UserPreferences />
          )}
        </CardContent>
      </Card>

      {!isVenueMode && (
        <>
          {/* Enhanced Preferences for Plus and above */}
          {hasFeatureAccess('preferences') ? (
            <Card>
              <CardHeader>
                <CardTitle>Enhanced Preferences</CardTitle>
                <CardDescription>
                  Save your favorite artists, teams, and genres for personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Favorite Artists</label>
                  <p className="text-sm text-muted-foreground mb-2">Get notified when your favorite artists have events</p>
                  <input
                    type="text"
                    placeholder="Add artists (comma separated)"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Favorite Teams</label>
                  <p className="text-sm text-muted-foreground mb-2">Stay updated on your teams' games and events</p>
                  <input
                    type="text"
                    placeholder="Add teams (comma separated)"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Favorite Genres</label>
                  <p className="text-sm text-muted-foreground mb-2">Discover events in your preferred genres</p>
                  <input
                    type="text"
                    placeholder="Add genres (comma separated)"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <FeatureGate
              requiredTier="plus"
              currentTier={subscriptionTier}
              featureName="Enhanced Preferences"
              onUpgrade={upgradeTo}
              upgradeMessage="Save your favorite artists, teams, and genres with Plus"
            >
              <div />
            </FeatureGate>
          )}

          {/* Premium Transportation Features */}
          {hasFeatureAccess('transportationOptions') ? (
            <Card>
              <CardHeader>
                <CardTitle>Default Transportation</CardTitle>
                <CardDescription>
                  Set your preferred transportation options for event planning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Preferred Service</label>
                  <select className="w-full p-2 border rounded-md mt-1">
                    <option>Uber</option>
                    <option>Lyft</option>
                    <option>Public Transit</option>
                    <option>Walking</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Maximum Travel Time</label>
                  <select className="w-full p-2 border rounded-md mt-1">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>1 hour</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          ) : (
            <FeatureGate
              requiredTier="premium"
              currentTier={subscriptionTier}
              featureName="Transportation Preferences"
              onUpgrade={upgradeTo}
              upgradeMessage="Set default transportation options with Premium"
            >
              <div />
            </FeatureGate>
          )}
        </>
      )}
    </div>
  );
};

export default PreferencesTab;
