
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Tag, Shield, Car, Ticket, User } from "lucide-react";

import PreferencesTab from "./settings/PreferencesTab";
import PrivacyTab from "./settings/PrivacyTab";
import TransportationTab from "./settings/TransportationTab";
import TicketingTab from "./settings/TicketingTab";
import AccountTab from "./settings/AccountTab";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("preferences");

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

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid grid-cols-3 md:grid-cols-5 gap-2">
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="hidden md:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="transportation" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              <span className="hidden md:inline">Transportation</span>
            </TabsTrigger>
            <TabsTrigger value="ticketing" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              <span className="hidden md:inline">Ticketing</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Account</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences" className="space-y-6">
            <PreferencesTab onSave={handleSaveSettings} />
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <PrivacyTab onSave={handleSaveSettings} />
          </TabsContent>
          
          <TabsContent value="transportation" className="space-y-6">
            <TransportationTab onSave={handleSaveSettings} />
          </TabsContent>
          
          <TabsContent value="ticketing" className="space-y-6">
            <TicketingTab onConnectPlatform={handleConnectPlatform} />
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <AccountTab onSave={handleSaveSettings} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
