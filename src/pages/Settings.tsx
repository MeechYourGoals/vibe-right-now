
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsTabs from "@/components/settings/SettingsTabs";
import PreferencesTab from "./settings/PreferencesTab";
import PrivacyTab from "./settings/PrivacyTab";
import TransportationTab from "./settings/TransportationTab";
import TicketingTab from "./settings/TicketingTab";
import AccountTab from "./settings/AccountTab";
import VenueManagementTab from "./settings/VenueManagementTab";
import MarketingTab from "./settings/MarketingTab";
import PaymentsTab from "./settings/PaymentsTab";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("preferences");
  const [isVenueMode, setIsVenueMode] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'standard' | 'plus' | 'premium' | 'pro'>('standard');

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
    // In a real app, this would trigger an OAuth flow or similar
  };

  const toggleMode = () => {
    setIsVenueMode(!isVenueMode);
    toast({
      title: `Switched to ${!isVenueMode ? "Venue" : "User"} Mode`,
      description: `Settings are now configured for ${!isVenueMode ? "venue management" : "regular user"}.`,
    });
  };

  // Helper function to upgrade subscription tier
  const upgradeTier = (tier: 'standard' | 'plus' | 'premium' | 'pro') => {
    setSubscriptionTier(tier);
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
          subscriptionTier={subscriptionTier}
          onTierChange={upgradeTier}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <SettingsTabs activeTab={activeTab} isVenueMode={isVenueMode} />
          
          <TabsContent value="preferences" className="space-y-6">
            <PreferencesTab 
              onSave={handleSaveSettings} 
              isVenueMode={isVenueMode} 
              subscriptionTier={subscriptionTier}
            />
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <PrivacyTab onSave={handleSaveSettings} isVenueMode={isVenueMode} />
          </TabsContent>
          
          {isVenueMode ? (
            <>
              <TabsContent value="management" className="space-y-6">
                <VenueManagementTab 
                  onSave={handleSaveSettings} 
                  isVenueMode={isVenueMode} 
                  subscriptionTier={subscriptionTier} 
                />
              </TabsContent>
              
              <TabsContent value="marketing" className="space-y-6">
                <MarketingTab subscriptionTier={subscriptionTier} />
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
