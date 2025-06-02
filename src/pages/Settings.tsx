
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUserSubscription } from "@/hooks/useUserSubscription";

import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsTabs from "@/components/settings/SettingsTabs";
import SubscriptionTab from "@/components/settings/SubscriptionTab";
import PreferencesTab from "./settings/PreferencesTab";
import PrivacyTab from "./settings/PrivacyTab";
import TransportationTab from "./settings/TransportationTab";
import TicketingTab from "./settings/TicketingTab";
import AccountTab from "./settings/AccountTab";
import VenueManagementTab from "./settings/VenueManagementTab";
import MarketingTab from "./settings/MarketingTab";
import PaymentsTab from "./settings/PaymentsTab";
import VenueSubmissionTab from "@/components/settings/VenueSubmissionTab";

const Settings = () => {
  const { toast } = useToast();
  const { subscription, upgradeTo } = useUserSubscription();
  const [activeTab, setActiveTab] = useState("preferences");
  const [isVenueMode, setIsVenueMode] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleConnectPlatform = (platformId: string) => {
    toast({
      title: "Connecting to platform",
      description: `Initiating connection to ${platformId === 'other' ? "custom platform" : platformId}...`,
    });
  };

  const toggleMode = () => {
    setIsVenueMode(!isVenueMode);
    toast({
      title: `Switched to ${!isVenueMode ? "Venue" : "User"} Mode`,
      description: `Settings are now configured for ${!isVenueMode ? "venue management" : "regular user"}.`,
    });
  };

  const handleTierChange = (tier: 'free' | 'plus' | 'premium' | 'pro') => {
    upgradeTo(tier);
    toast({
      title: `Upgraded to ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
      description: `Your subscription has been upgraded to ${tier}.`,
    });
  };

  return (
    <Layout>
      <div className="container py-8">
        <SettingsHeader 
          isVenueMode={isVenueMode}
          onModeToggle={toggleMode}
          subscriptionTier={!isVenueMode ? subscription.tier : undefined}
          onTierChange={!isVenueMode ? handleTierChange : undefined}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <SettingsTabs activeTab={activeTab} isVenueMode={isVenueMode} />
          
          <TabsContent value="preferences" className="space-y-6">
            <PreferencesTab 
              onSave={handleSaveSettings} 
              isVenueMode={isVenueMode} 
              subscriptionTier={subscription.tier}
            />
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <PrivacyTab onSave={handleSaveSettings} isVenueMode={isVenueMode} />
          </TabsContent>

          {!isVenueMode && (
            <TabsContent value="subscription" className="space-y-6">
              <SubscriptionTab />
            </TabsContent>
          )}
          
          {isVenueMode ? (
            <>
              <TabsContent value="management" className="space-y-6">
                <VenueManagementTab 
                  onSave={handleSaveSettings} 
                  isVenueMode={isVenueMode} 
                  subscriptionTier="standard"
                />
              </TabsContent>
              
              <TabsContent value="marketing" className="space-y-6">
                <MarketingTab subscriptionTier="standard" />
              </TabsContent>
              
              <TabsContent value="submission" className="space-y-6">
                <VenueSubmissionTab onSave={handleSaveSettings} />
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="transportation" className="space-y-6">
                <TransportationTab onSave={handleSaveSettings} />
              </TabsContent>
              
              <TabsContent value="ticketing" className="space-y-6">
                <TicketingTab onConnectPlatform={handleConnectPlatform} />
              </TabsContent>
            </>
          )}
          
          <TabsContent value="payments" className="space-y-6">
            <PaymentsTab isVenueMode={isVenueMode} />
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <AccountTab onSave={handleSaveSettings} isVenueMode={isVenueMode} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
